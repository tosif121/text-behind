/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Dropzone from "./dropzone";
import { removeBackground } from "@imgly/background-removal";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AspectRatio } from "./ui/aspect-ratio";
import { Separator } from "./ui/separator";
import { generate, refresh } from "@/app/actions/generate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Download,
  RotateCcw,
  Type,
  ImageIcon,
  Loader2,
  PlusCircle,
  Trash2,
  Copy,
} from "lucide-react";
import { SkeletonCard } from "./SkeletonCard";
import FontFamilyPicker from "./font-picker";
import { Switch } from "./ui/switch";

interface TextElement {
  id: string;
  content: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  opacity: number;
  rotation: number;
  positionX: number;
  positionY: number;
  letterSpacing: number;
  hasShadow: boolean;
  isForeground: boolean;
}

const initialTextElement: Omit<TextElement, "id"> = {
  content: "POV",
  fontFamily: "Roboto",
  fontSize: 200,
  fontWeight: 700,
  color: "rgba(255, 255, 255, 1)",
  opacity: 100,
  rotation: 0,
  positionX: 50,
  positionY: 50,
  letterSpacing: 0,
  hasShadow: true,
  isForeground: false, 
};

const ThumbnailCreator = () => {
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [backgroundOpacity, setBackgroundOpacity] = useState(100);
  const [imageBrightness, setImageBrightness] = useState(100);
  const [imageContrast, setImageContrast] = useState(100);

  useEffect(() => {
    const fonts = textElements
      .map(el => el.fontFamily)
      .filter((f, i, self) => self.indexOf(f) === i);

    if (fonts.length > 0 && typeof window !== 'undefined') {
      import('webfontloader').then(WebFont => {
        WebFont.load({
          google: {
            families: fonts,
          },
          active: () => {
            drawCompositeImage();
          },
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textElements.map(el => el.fontFamily).join(',')]);

  const setSelectedImage = async (file?: File) => {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const src = e.target?.result as string;
        setImageSrc(src);
        try {
          const blob = await removeBackground(src);
          const processedUrl = URL.createObjectURL(blob);
          setProcessedImageSrc(processedUrl);
        } catch (error) {
          console.error("Error removing background:", error);
          setProcessedImageSrc(null);
        }
        setCanvasReady(true);
        if (textElements.length === 0) {
          addNewText();
        }
        setLoading(false);
        await generate();
      };
      reader.readAsDataURL(file);
      await generate();
    }
  };

  const addNewText = () => {
    setTextElements((prev) => [
      ...prev,
      { ...initialTextElement, id: Date.now().toString() + Math.random().toString(36).substring(2, 15) },
    ]);
  };

  const updateTextElement = (id: string, newProps: Partial<TextElement>) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...newProps } : el))
    );
  };

  const handleAttributeChange = (id: string, attribute: string, value: string | number | boolean) => {
    updateTextElement(id, { [attribute]: value });
  };

  const deleteTextElement = (id: string) => {
    setTextElements((prev) => prev.filter((el) => el.id !== id));
  };

  const duplicateTextElement = (id: string) => {
    const originalElement = textElements.find(el => el.id === id);
    if (originalElement) {
      const newElement = {
        ...originalElement,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
        positionX: Math.min(100, originalElement.positionX + 5),
        positionY: Math.min(100, originalElement.positionY + 5),
      };
      setTextElements(prev => [...prev, newElement]);
    }
  };

  const drawCompositeImage = useCallback(() => {
    if (!canvasRef.current || !canvasReady || !imageSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loadOriginalImage = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(new Error(`Failed to load original image: ${String(err)}`));
      img.src = imageSrc;
    });

    const loadProcessedImage = new Promise<HTMLImageElement | null>((resolve, reject) => {
      if (!processedImageSrc) {
        resolve(null);
        return;
      }
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(new Error(`Failed to load processed image: ${String(err)}`));
      img.src = processedImageSrc;
    });

    Promise.all([loadOriginalImage, loadProcessedImage])
      .then(([originalImg, processedImg]) => {
        const maxWidth = 800;
        const maxHeight = 600;
        const aspectRatio = originalImg.width / originalImg.height;

        let canvasWidth = originalImg.width;
        let canvasHeight = originalImg.height;

        if (canvasWidth > maxWidth) {
          canvasWidth = maxWidth;
          canvasHeight = canvasWidth / aspectRatio;
        }
        if (canvasHeight > maxHeight) {
          canvasHeight = maxHeight;
          canvasWidth = canvasHeight * aspectRatio;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Draw background image
        ctx.filter = `brightness(${imageBrightness}%) contrast(${imageContrast}%)`;
        ctx.globalAlpha = backgroundOpacity / 100;
        ctx.drawImage(originalImg, 0, 0, canvas.width, canvas.height);
        ctx.filter = 'none';
        ctx.globalAlpha = 1;

        // Separate text elements into foreground and background layers
        const foregroundTextElements = textElements.filter(el => el.isForeground);
        const backgroundTextElements = textElements.filter(el => !el.isForeground);

        // Function to draw a list of text elements
        const drawTextElements = (elementsToDraw: TextElement[]) => {
          elementsToDraw.forEach((textEl) => {
            ctx.save();
            const x = canvas.width * (textEl.positionX / 100);
            const y = canvas.height * (textEl.positionY / 100);

            ctx.translate(x, y);
            ctx.rotate((textEl.rotation * Math.PI) / 180);

            ctx.font = `${textEl.fontWeight} ${textEl.fontSize}px "${textEl.fontFamily}"`;
            if ("letterSpacing" in ctx && typeof (ctx as any).letterSpacing === 'string') {
              (ctx as any).letterSpacing = `${textEl.letterSpacing}px`;
            }

            // Apply shadow if enabled with darker, more pronounced settings
            if (textEl.hasShadow) {
              ctx.shadowColor = 'rgba(0, 0, 0, 1)';
              ctx.shadowBlur = 8; 
              ctx.shadowOffsetX = 5;
              ctx.shadowOffsetY = 5; 
            } else {
              ctx.shadowColor = 'transparent'; // No shadow
              ctx.shadowBlur = 0;
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 0;
            }

            ctx.fillStyle = textEl.color;
            ctx.globalAlpha = textEl.opacity / 100;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(textEl.content, 0, 0);
            ctx.restore();
          });
        };

        // 2. Draw text elements that are *behind* the processed image
        drawTextElements(backgroundTextElements);

        // 3. Draw processed image (foreground image without background)
        if (processedImg) {
          ctx.globalAlpha = 1;
          ctx.drawImage(processedImg, 0, 0, canvas.width, canvas.height);
        }

        // 4. Draw text elements that are *above* the processed image
        drawTextElements(foregroundTextElements);

      })
      .catch(error => {
        console.error("Error during canvas drawing:", error);
        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "rgba(200,0,0,0.1)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "red";
          ctx.font = "bold 16px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const errorMessage = error instanceof Error ? error.message : "Image loading/drawing error.";
          const lines = errorMessage.split(': ');
          lines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, canvas.height / 2 + (index * 20) - (lines.length - 1) * 10);
          });
        }
      });
  }, [
    canvasReady, imageSrc, processedImageSrc, textElements,
    backgroundOpacity, imageBrightness, imageContrast
  ]);

  useEffect(() => {
    if (canvasReady && imageSrc) {
      drawCompositeImage();
    }
  }, [canvasReady, imageSrc, drawCompositeImage]);

  const handleDownload = async () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "thumbnail.png";
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    }
  };

  const resetAllControls = () => {
    setTextElements([{ ...initialTextElement, id: Date.now().toString() + Math.random().toString(36).substring(2, 15) }]);
    setBackgroundOpacity(100);
    setImageBrightness(100);
    setImageContrast(100);
  };

  const resetImageAndCanvas = async () => {
    setImageSrc(null);
    setProcessedImageSrc(null);
    setCanvasReady(false);
    setTextElements([]);
    resetAllControls();
    await refresh();
  }

  return (
    <div className="min-h-screen w-full">
      {imageSrc ? (
        <>
          {loading ? (
            <div className="flex flex-col justify-center items-center h-3/4 mt-10">
              <SkeletonCard />
              <div className="flex flex-row justify-center items-center mt-2">
                <Loader2 className="animate-spin h-4 w-4 text-gray-500 mr-2" />
                <p className="text-muted-foreground">Processing image...</p>
              </div>
            </div>
          ) : (
            <div className="p-2 md:p-2 space-y-2 md:space-y-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                <Button
                  variant="ghost"
                  onClick={resetImageAndCanvas}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Leave Editor
                </Button>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Button variant="outline" onClick={resetAllControls} className="flex-grow sm:flex-grow-0">
                    <RotateCcw className="h-3 w-3 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={handleDownload} className="flex-grow sm:flex-grow-0">
                    <Download className="h-3 w-3 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-3">
                <div className="lg:col-span-8">
                  <Card className="overflow-hidden">
                    <CardContent className="p-1">
                      <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-md">
                        <AspectRatio ratio={16 / 9} className="w-full">
                          <canvas
                            ref={canvasRef}
                            className="w-full h-full object-contain rounded-md"
                          />
                        </AspectRatio>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-4 min-w-0">
                  <ScrollArea className="h-120 lg:h-[calc(100vh-250px)] rounded-md ">
                    <div className="p-3 space-y-4 w-full max-w-full overflow-x-hidden">
                      <Tabs defaultValue="text" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 gap-1">
                          <TabsTrigger value="text" className="flex items-center gap-2">
                            <Type className="h-7 w-7" /> Text
                          </TabsTrigger>
                          <TabsTrigger value="image" className="flex items-center gap-2">
                            <ImageIcon className="h-7 w-7" /> Img
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="text" className="mt-4 w-full">
                          <Button onClick={addNewText} className="w-full">
                            <PlusCircle className="h-4 w-4 mr-2" />New Text
                          </Button>
                          <Accordion type="multiple" className="w-full space-y-2 mt-4">
                            {textElements.map((el, index) => (
                              <AccordionItem value={el.id} key={el.id} className="border bg-card p-2 rounded-md">
                                <AccordionTrigger className="text-sm hover:no-underline px-2 py-3">
                                  Text {index + 1}: &quot;{el.content.substring(0, 15)}{el.content.length > 15 ? '...' : ''}&quot;
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4 px-3 pt-3">
                                  <div className="space-y-1">
                                    <Label htmlFor={`text-content-${el.id}`}>Text</Label>
                                    <Input id={`text-content-${el.id}`} value={el.content} onChange={(e) => updateTextElement(el.id, { content: e.target.value })} />
                                  </div>
                                  <div className="space-y-1">
                                    <Label>Font Family</Label>
                                    <FontFamilyPicker
                                      attribute="fontFamily"
                                      currentFont={el.fontFamily}
                                      handleAttributeChange={(attribute, value) => handleAttributeChange(el.id, attribute, value)}
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="flex items-center justify-between">Font Size <span className="text-xs text-muted-foreground">{el.fontSize}px</span></Label>
                                    <Slider value={[el.fontSize]} onValueChange={(v) => updateTextElement(el.id, { fontSize: v[0] })} min={10} max={400} step={1} />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="flex items-center justify-between">Font Weight <span className="text-xs text-muted-foreground">{el.fontWeight}</span></Label>
                                    <Slider value={[el.fontWeight]} onValueChange={(v) => updateTextElement(el.id, { fontWeight: v[0] })} min={100} max={900} step={100} />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="flex items-center justify-between" htmlFor={`text-color-${el.id}`}>Color</Label>
                                    <div className="flex items-center gap-2">
                                      <Input type="color" id={`text-color-${el.id}`} value={el.color.startsWith('rgba') ? '#ffffff' : el.color} onChange={(e) => updateTextElement(el.id, { color: e.target.value })} className="p-0 h-8 w-12" />
                                      <Input value={el.color} onChange={(e) => updateTextElement(el.id, { color: e.target.value })} placeholder="rgba(R,G,B,A) or #hex" />
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="flex items-center justify-between">Opacity <span className="text-xs text-muted-foreground">{el.opacity}%</span></Label>
                                    <Slider value={[el.opacity]} onValueChange={(v) => updateTextElement(el.id, { opacity: v[0] })} min={0} max={150} step={1} />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="flex items-center justify-between">Rotation <span className="text-xs text-muted-foreground">{el.rotation}°</span></Label>
                                    <Slider value={[el.rotation]} onValueChange={(v) => updateTextElement(el.id, { rotation: v[0] })} min={-180} max={180} step={1} />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="flex items-center justify-between">Horizontal Pos. <span className="text-xs text-muted-foreground">{el.positionX}%</span></Label>
                                    <Slider value={[el.positionX]} onValueChange={(v) => updateTextElement(el.id, { positionX: v[0] })} min={0} max={100} step={1} />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="flex items-center justify-between">Vertical Pos. <span className="text-xs text-muted-foreground">{el.positionY}%</span></Label>
                                    <Slider value={[el.positionY]} onValueChange={(v) => updateTextElement(el.id, { positionY: v[0] })} min={0} max={100} step={1} />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="flex items-center justify-between">Letter Spacing <span className="text-xs text-muted-foreground">{el.letterSpacing}px</span></Label>
                                    <Slider value={[el.letterSpacing]} onValueChange={(v) => updateTextElement(el.id, { letterSpacing: v[0] })} min={-20} max={50} step={1} />
                                  </div>
                                  {/* Shadow toggle */}
                                  <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor={`shadow-toggle-${el.id}`}>Black Shadow</Label>
                                    <Switch
                                      id={`shadow-toggle-${el.id}`}
                                      checked={el.hasShadow}
                                      onCheckedChange={(checked) => updateTextElement(el.id, { hasShadow: checked })}
                                    />
                                  </div>
                                  {/* Text foreground/background toggle */}
                                  <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor={`text-foreground-toggle-${el.id}`}>Text above image</Label>
                                    <Switch
                                      id={`text-foreground-toggle-${el.id}`}
                                      checked={el.isForeground}
                                      onCheckedChange={(checked) => updateTextElement(el.id, { isForeground: checked })}
                                    />
                                  </div>
                                  <Separator className="my-3" />
                                  <div className="flex gap-2 justify-end">
                                    <Button variant="outline" size="sm" onClick={() => duplicateTextElement(el.id)}><Copy size={14} className="mr-1" /> Duplicate</Button>
                                    <Button variant="destructive" size="sm" onClick={() => deleteTextElement(el.id)}><Trash2 size={14} className="mr-1" /> Delete</Button>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                            {textElements.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No text elements added. Click &quot;Add New Text&quot; to begin.</p>}
                          </Accordion>
                        </TabsContent>

                        <TabsContent value="image" className="mt-4 w-full">
                          <Card>
                            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><ImageIcon className="h-5 w-5" /> Image Settings</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-1">
                                <Label className="flex items-center justify-between">Brightness <span className="text-xs text-muted-foreground">{imageBrightness}%</span></Label>
                                <Slider value={[imageBrightness]} onValueChange={(v) => setImageBrightness(v[0])} min={0} max={200} step={1} />
                              </div>
                              <div className="space-y-1">
                                <Label className="flex items-center justify-between">Contrast <span className="text-xs text-muted-foreground">{imageContrast}%</span></Label>
                                <Slider value={[imageContrast]} onValueChange={(v) => setImageContrast(v[0])} min={0} max={200} step={1} />
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Your Design</h1>
            <p className="text-muted-foreground ">Start by uploading an high quality image</p>
          </div>
          <div className="w-full max-w-lg">
            <Dropzone setSelectedImage={setSelectedImage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailCreator;