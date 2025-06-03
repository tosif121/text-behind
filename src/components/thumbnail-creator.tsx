"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Dropzone from "./dropzone";
import Style from "./style";
import { removeBackground } from "@imgly/background-removal";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AspectRatio } from "./ui/aspect-ratio";
import { Separator } from "./ui/separator";
import { inter, domine } from "@/app/fonts";
import { generate, refresh } from "@/app/actions/generate";
import {
  ArrowLeft,
  Download,
  RotateCcw,
  Type,
  Image as ImageIcon,
  Settings,
  Move,
  RotateCw,
  Loader2,
} from "lucide-react";
import { SkeletonCard } from "./SkeletonCard";

const presets = {
  style1: {
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 1)",
    opacity: 1,
  },
  style2: {
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 1)",
    opacity: 1,
  },
  style3: {
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.8)",
    opacity: 0.8,
  },
};

const ThumbnailCreator = () => {
  const [selectedStyle, setSelectedStyle] = useState("style1");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(
    null
  );
  const [canvasReady, setCanvasReady] = useState(false);
  const [text, setText] = useState("POV");
  const [font, setFont] = useState("arial");

  // Control states
  const [positionX, setPositionX] = useState(50);
  const [positionY, setPositionY] = useState(50);
  const [textOpacity, setTextOpacity] = useState(100);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontWeight, setFontWeight] = useState(700);
  const [rotation, setRotation] = useState(0);
  const [backgroundOpacity, setBackgroundOpacity] = useState(100);

  const setSelectedImage = async (file?: File) => {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const src = e.target?.result as string;
        setImageSrc(src);

        const blob = await removeBackground(src);
        const processedUrl = URL.createObjectURL(blob);
        setProcessedImageSrc(processedUrl);
        setCanvasReady(true);
        setLoading(false);
      };
      reader.readAsDataURL(file);
      await generate();
    }
  };

  const drawCompositeImage = useCallback(() => {
    if (!canvasRef.current || !canvasReady || !imageSrc || !processedImageSrc)
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new Image();

    bgImg.onload = () => {
      // Set fixed canvas dimensions for consistent layout
      const maxWidth = 800;
      const maxHeight = 600;
      const aspectRatio = bgImg.width / bgImg.height;

      let canvasWidth = maxWidth;
      let canvasHeight = maxWidth / aspectRatio;

      if (canvasHeight > maxHeight) {
        canvasHeight = maxHeight;
        canvasWidth = maxHeight * aspectRatio;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background image with opacity
      ctx.globalAlpha = backgroundOpacity / 100;
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      let preset = presets.style1;
      switch (selectedStyle) {
        case "style2":
          preset = presets.style2;
          break;
        case "style3":
          preset = presets.style3;
          break;
      }

      ctx.save();

      // Calculate font size to fill image 90% of the canvas
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let fontSize = 100;
      let selectFont = "arial";
      switch (font) {
        case "inter":
          selectFont = inter.style.fontFamily;
          break;
        case "domine":
          selectFont = domine.style.fontFamily;
          break;
      }

      // Apply font weight and letter spacing
      ctx.font = `${fontWeight} ${fontSize}px ${selectFont}`;
      if ("letterSpacing" in ctx) {
        ctx.letterSpacing = `${letterSpacing}px`;
      }

      const textWidth = ctx.measureText(text).width;
      const targetWidth = canvas.width * 0.9;

      fontSize *= targetWidth / textWidth;
      ctx.font = `${fontWeight} ${fontSize}px ${selectFont}`;
      if ("letterSpacing" in ctx) {
        ctx.letterSpacing = `${letterSpacing}px`;
      }

      ctx.fillStyle = preset.color;
      ctx.globalAlpha = textOpacity / 100;

      // Calculate position based on percentage
      const x = canvas.width * (positionX / 100);
      const y = canvas.height * (positionY / 100);

      ctx.translate(x, y);

      // Apply rotation
      ctx.rotate((rotation * Math.PI) / 180);

      ctx.fillText(text, 0, 0);
      ctx.restore();

      const fgImg = new Image();
      fgImg.onload = () => {
        ctx.drawImage(fgImg, 0, 0, canvas.width, canvas.height);
      };

      fgImg.src = processedImageSrc;
    };

    bgImg.src = imageSrc;
  }, [
    canvasReady,
    imageSrc,
    processedImageSrc,
    selectedStyle,
    font,
    fontWeight,
    letterSpacing,
    textOpacity,
    positionX,
    positionY,
    rotation,
    backgroundOpacity,
    text,
  ]);

  useEffect(() => {
    if (canvasReady) {
      drawCompositeImage();
    }
  }, [canvasReady, drawCompositeImage]);

  const handleDownload = async () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "thumbnail.png";
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const resetControls = () => {
    setPositionX(50);
    setPositionY(50);
    setTextOpacity(100);
    setLetterSpacing(0);
    setFontWeight(700);
    setRotation(0);
    setBackgroundOpacity(100);
    setText("POV");
  };

  return (
    <div className="min-h-screen ">
      {imageSrc ? (
        <>
          {loading ? (
            <div className="flex flex-col justify-center h-3/4 mt-10">
              <SkeletonCard />
              <div className="flex flex-row justify-center items-center mt-2">
                <Loader2 className="animate-spin h-4 w-4 text-gray-500 mr-2" />
                <p className="text-muted-foreground"> {" "}
                  Processing your image ...
                </p>
              </div>
            </div>
          ) : (
            <div className=" p-2 space-y-6">
              {/* Header */}

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={async () => {
                    setImageSrc(null);
                    setProcessedImageSrc(null);
                    setCanvasReady(false);
                    resetControls();
                    await refresh();
                  }}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go back
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={resetControls}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {/* Canvas Section */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent>
                      <div className="flex justify-center">
                        <AspectRatio ratio={4 / 3} className="w-full max-w-3xl">
                          <canvas
                            ref={canvasRef}
                            className="w-full h-full object-contain rounded-lg border"
                          />
                        </AspectRatio>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Controls Section */}
                <div className="space-y-4">
                  <Tabs defaultValue="text" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger
                        value="text"
                        className="flex items-center gap-2"
                      >
                        <Type className="h-4 w-4" />
                        Text
                      </TabsTrigger>
                      <TabsTrigger
                        value="image"
                        className="flex items-center gap-2"
                      >
                        <ImageIcon className="h-4 w-4" />
                        Image
                      </TabsTrigger>
                      <TabsTrigger
                        value="settings"
                        className="flex items-center gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </TabsTrigger>
                    </TabsList>

                    {/* Text Tab */}
                    <TabsContent value="text" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Type className="h-5 w-5" />
                            Text Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="text">Text Content</Label>
                            <Input
                              id="text"
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder="Enter your text"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="font">Font Family</Label>
                            <Select value={font} onValueChange={setFont}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="arial">Arial</SelectItem>
                                <SelectItem value="inter">Inter</SelectItem>
                                <SelectItem value="domine">Domine</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            <Label className="flex items-center justify-between">
                              Font Weight
                              <span className="text-sm text-muted-foreground">
                                {fontWeight}
                              </span>
                            </Label>
                            <Slider
                              value={[fontWeight]}
                              onValueChange={(value) =>
                                setFontWeight(value[0] ?? 700)
                              }
                              max={900}
                              min={100}
                              step={100}
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="flex items-center justify-between">
                              Letter Spacing
                              <span className="text-sm text-muted-foreground">
                                {letterSpacing}px
                              </span>
                            </Label>
                            <Slider
                              value={[letterSpacing]}
                              onValueChange={(value) =>
                                setLetterSpacing(value[0] ?? 0)
                              }
                              max={50}
                              min={-10}
                              step={1}
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="flex items-center justify-between">
                              Text Opacity
                              <span className="text-sm text-muted-foreground">
                                {textOpacity}%
                              </span>
                            </Label>
                            <Slider
                              value={[textOpacity]}
                              onValueChange={(value) =>
                                setTextOpacity(value[0] ?? 100)
                              }
                              max={100}
                              min={0}
                              step={1}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Image Tab */}
                    <TabsContent value="image" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <ImageIcon className="h-5 w-5" />
                            Image Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <Label className="flex items-center justify-between">
                              Background Opacity
                              <span className="text-sm text-muted-foreground">
                                {backgroundOpacity}%
                              </span>
                            </Label>
                            <Slider
                              value={[backgroundOpacity]}
                              onValueChange={(value) =>
                                setBackgroundOpacity(value[0] ?? 100)
                              }
                              max={100}
                              min={0}
                              step={1}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Move className="h-5 w-5" />
                            Position & Transform
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <Label className="flex items-center justify-between">
                              Horizontal Position
                              <span className="text-sm text-muted-foreground">
                                {positionX}%
                              </span>
                            </Label>
                            <Slider
                              value={[positionX]}
                              onValueChange={(value) =>
                                setPositionX(value[0] ?? 50)
                              }
                              max={100}
                              min={0}
                              step={1}
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="flex items-center justify-between">
                              Vertical Position
                              <span className="text-sm text-muted-foreground">
                                {positionY}%
                              </span>
                            </Label>
                            <Slider
                              value={[positionY]}
                              onValueChange={(value) =>
                                setPositionY(value[0] ?? 50)
                              }
                              max={100}
                              min={0}
                              step={1}
                            />
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            <Label className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <RotateCw className="h-4 w-4" />
                                Rotation
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {rotation}°
                              </span>
                            </Label>
                            <Slider
                              value={[rotation]}
                              onValueChange={(value) =>
                                setRotation(value[0] ?? 0)
                              }
                              max={180}
                              min={-180}
                              step={1}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col mt-20">
          <div className=" flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
            <Style
              image="/style1.png"
              selectStyle={() => setSelectedStyle("style1")}
              isSelected={selectedStyle === "style1"}
            />
            <Style
              image="/style2.png"
              selectStyle={() => setSelectedStyle("style2")}
              isSelected={selectedStyle === "style2"}
            />
            <Style
              image="/style3.png"
              selectStyle={() => setSelectedStyle("style3")}
              isSelected={selectedStyle === "style3"}
            />
          </div>
          <Dropzone setSelectedImage={setSelectedImage} />
        </div>
      )}
    </div>
  );
};

export default ThumbnailCreator;
