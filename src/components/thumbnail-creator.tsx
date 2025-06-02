"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Dropzone from "./dropzone";
import Style from "./style";
import { removeBackground } from "@imgly/background-removal";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
import { inter, domine } from "@/app/fonts";
import { generate, refresh } from "@/app/actions/generate";
import { ArrowLeft } from "lucide-react";

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

  // New control states
  const [positionX, setPositionX] = useState(50); // Percentage of canvas width
  const [positionY, setPositionY] = useState(50); // Percentage of canvas height
  const [textOpacity, setTextOpacity] = useState(100); // 0-100
  const [letterSpacing, setLetterSpacing] = useState(0); // -10 to 50
  const [fontWeight, setFontWeight] = useState(700); // 100-900
  const [rotation, setRotation] = useState(0); // -180 to 180
  const [backgroundOpacity, setBackgroundOpacity] = useState(100); // 0-100

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
      canvas.width = bgImg.width;
      canvas.height = bgImg.height;

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
      link.download = "image.png";
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
  };

  return (
    <>
      {imageSrc ? (
        <>
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-dashed border-gray-800"></div>
            </div>
          ) : (
            <div className="flex  items-baseline gap-5">
              {/* image section */}
              <div className="my-2 flex w-full flex-col items-center gap-3">
                <button
                  onClick={async () => {
                    setImageSrc(null);
                    setProcessedImageSrc(null);
                    setCanvasReady(false);
                    resetControls();
                    await refresh();
                  }}
                  className="flex items-center gap-2 self-start"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <p className="leading-7">Go back</p>
                </button>
                <canvas
                  ref={canvasRef}
                  className="max-h-lg h-auto w-full rounded-lg"
                ></canvas>
              </div>

              {/* edit section */}
              <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
                {/* Text Controls */}
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Text Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full items-center gap-3">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="text">Text</Label>
                        <Input
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          id="text"
                          placeholder="Text in thumbnail"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="font">Font</Label>
                        <Select
                          value={font}
                          onValueChange={(value) => setFont(value)}
                        >
                          <SelectTrigger id="font">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="arial">Arial</SelectItem>
                            <SelectItem value="inter">Inter</SelectItem>
                            <SelectItem value="domine">Domine</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Advanced Controls */}
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Advanced Controls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full items-center gap-6">
                      {/* Position Controls */}
                      <div className="flex flex-col gap-3">
                        <Label>Position X: {positionX}%</Label>
                        <Slider
                          value={[positionX]}
                          onValueChange={(value: number[]) =>
                            setPositionX(value[0] ?? 50)
                          }
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <Label>Position Y: {positionY}%</Label>
                        <Slider
                          value={[positionY]}
                          onValueChange={(value: number[]) =>
                            setPositionY(value[0] ?? 50)
                          }
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Text Opacity */}
                      <div className="flex flex-col gap-3">
                        <Label>Text Opacity: {textOpacity}%</Label>
                        <Slider
                          value={[textOpacity]}
                          onValueChange={(value: number[]) =>
                            setTextOpacity(value[0] ?? 100)
                          }
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Letter Spacing */}
                      <div className="flex flex-col gap-3">
                        <Label>Letter Spacing: {letterSpacing}px</Label>
                        <Slider
                          value={[letterSpacing]}
                          onValueChange={(value: number[]) =>
                            setLetterSpacing(value[0] ?? 0)
                          }
                          max={50}
                          min={-10}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Font Weight */}
                      <div className="flex flex-col gap-3">
                        <Label>Font Weight: {fontWeight}</Label>
                        <Slider
                          value={[fontWeight]}
                          onValueChange={(value: number[]) =>
                            setFontWeight(value[0] ?? 700)
                          }
                          max={900}
                          min={100}
                          step={100}
                          className="w-full"
                        />
                      </div>

                      {/* Rotation */}
                      <div className="flex flex-col gap-3">
                        <Label>Rotation: {rotation}°</Label>
                        <Slider
                          value={[rotation]}
                          onValueChange={(value: number[]) =>
                            setRotation(value[0] ?? 0)
                          }
                          max={180}
                          min={-180}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Background Opacity */}
                      <div className="flex flex-col gap-3">
                        <Label>Background Opacity: {backgroundOpacity}%</Label>
                        <Slider
                          value={[backgroundOpacity]}
                          onValueChange={(value: number[]) =>
                            setBackgroundOpacity(value[0] ?? 50)
                          }
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap justify-between gap-2">
                    <Button variant="outline" onClick={resetControls}>
                      Reset
                    </Button>
                    <div className="flex gap-2">
                      <Button onClick={() => handleDownload()}>Download</Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col">
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
    </>
  );
};

export default ThumbnailCreator;
