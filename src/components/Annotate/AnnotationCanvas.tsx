/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import { FaICursor } from "react-icons/fa";
import { FiEdit2, FiTrash2, FiXCircle } from "react-icons/fi";

type Point = { x: number; y: number };
type Polygon = Point[];

type Props = {
  imageSrc: string;
  polygons: Polygon[];
  onChange: (updated: Polygon[]) => void;
};

export default function AnnotationCanvas({
  imageSrc,
  polygons,
  onChange,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Zoom & pan state
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Drawing polygon state
  const [currentPolygon, setCurrentPolygon] = useState<Polygon>([]);

  // Polygon selection state
  const [mode, setMode] = useState<"draw" | "select">("draw");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Panning drag state
  const isPanning = useRef(false);
  const panStart = useRef<{ x: number; y: number } | null>(null);
  const offsetStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Load image and set canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      // Reset zoom and pan on new image load
      setScale(1);
      setOffset({ x: 0, y: 0 });
      setSelectedIndex(null);
      setCurrentPolygon([]);

      draw(ctx, image);
    };
  }, [imageSrc]);

  // Draw function - applies zoom/pan, draws image & polygons
  const draw = (ctx: CanvasRenderingContext2D, image?: HTMLImageElement) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    if (image) {
      ctx.drawImage(image, 0, 0);
    } else {
      const img = new Image();
      img.src = imageSrc;
      ctx.drawImage(img, 0, 0);
    }

    ctx.lineWidth = 2 / scale;

    polygons.forEach((polygon, i) => {
      ctx.beginPath();
      ctx.strokeStyle = i === selectedIndex ? "orange" : "blue";
      if (polygon.length > 0) {
        ctx.moveTo(polygon[0].x, polygon[0].y);
        for (let j = 1; j < polygon.length; j++) {
          ctx.lineTo(polygon[j].x, polygon[j].y);
        }
        ctx.closePath();
        ctx.stroke();
      }
    });

    if (currentPolygon.length > 0 && mode === "draw") {
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(currentPolygon[0].x, currentPolygon[0].y);
      for (let i = 1; i < currentPolygon.length; i++) {
        ctx.lineTo(currentPolygon[i].x, currentPolygon[i].y);
      }
      ctx.stroke();
    }

    ctx.restore();
  };

  // Redraw on relevant state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      draw(ctx, img);
    };
  }, [polygons, currentPolygon, scale, offset, selectedIndex, imageSrc, mode]);

  // Convert screen to image coords
  const toImageCoords = (x: number, y: number) => {
    if (!canvasRef.current) return { x, y };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (x - rect.left - offset.x) / scale,
      y: (y - rect.top - offset.y) / scale,
    };
  };

  // Point in polygon helper (ray casting)
  function pointInPolygon(point: Point, vs: Point[]) {
    const x = point.x,
      y = point.y;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i].x,
        yi = vs[i].y;
      const xj = vs[j].x,
        yj = vs[j].y;
      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // Find polygon index under cursor
  const findPolygonIndex = (x: number, y: number): number | null => {
    for (let i = 0; i < polygons.length; i++) {
      if (pointInPolygon({ x, y }, polygons[i])) return i;
    }
    return null;
  };

  // Handle canvas click
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return; // left click only
    const { x, y } = toImageCoords(e.clientX, e.clientY);

    if (mode === "draw") {
      // Close polygon if near first point
      if (
        currentPolygon.length >= 3 &&
        Math.hypot(x - currentPolygon[0].x, y - currentPolygon[0].y) < 10
      ) {
        onChange([...polygons, currentPolygon]);
        setCurrentPolygon([]);
        return;
      }
      setCurrentPolygon((prev) => [...prev, { x, y }]);
      setSelectedIndex(null);
    } else if (mode === "select") {
      const idx = findPolygonIndex(x, y);
      setSelectedIndex(idx);
      setCurrentPolygon([]);
    }
  };

  // Delete selected polygon
  const deleteSelectedPolygon = () => {
    if (selectedIndex === null) return;
    onChange(polygons.filter((_, i) => i !== selectedIndex));
    setSelectedIndex(null);
  };

  // Clear all polygons
  const clearAllPolygons = () => {
    onChange([]);
    setSelectedIndex(null);
    setCurrentPolygon([]);
  };

  // Panning handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 1 && e.button !== 0) return;
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPanning.current || !panStart.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setOffset({
      x: offsetStart.current.x + dx,
      y: offsetStart.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    isPanning.current = false;
    panStart.current = null;
  };

  // Zoom handler
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x: mouseX, y: mouseY } = toImageCoords(e.clientX, e.clientY);
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.min(Math.max(scale * zoomFactor, 0.1), 10);

    const dx = mouseX * newScale - mouseX * scale;
    const dy = mouseY * newScale - mouseY * scale;

    setScale(newScale);
    setOffset((prev) => ({ x: prev.x - dx, y: prev.y - dy }));
  };

  return (
    <div
      ref={containerRef}
      style={{
        border: "1px solid gray",
        display: "inline-block",
        cursor: isPanning.current
          ? "grabbing"
          : mode === "draw"
          ? "crosshair"
          : "default",
        userSelect: "none",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          marginBottom: 8,
          userSelect: "none",
          display: "flex",
          gap: 12,
        }}
      >
        <button
          onClick={() => {
            setMode("draw");
            setSelectedIndex(null);
            setCurrentPolygon([]);
          }}
          style={{
            fontWeight: mode === "draw" ? "bold" : "normal",
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            background: "transparent",
            border: "none",
          }}
          title="Draw"
          aria-pressed={mode === "draw"}
        >
          <FiEdit2 color={mode === "draw" ? "blue" : "black"} />
          Draw
        </button>

        <button
          onClick={() => {
            setMode("select");
            setCurrentPolygon([]);
          }}
          style={{
            fontWeight: mode === "select" ? "bold" : "normal",
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            background: "transparent",
            border: "none",
          }}
          title="Select"
          aria-pressed={mode === "select"}
        >
          <FaICursor color={mode === "select" ? "blue" : "black"} />
          Select
        </button>

        <button
          onClick={deleteSelectedPolygon}
          disabled={selectedIndex === null}
          style={{
            cursor: selectedIndex === null ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "transparent",
            border: "none",
            color: selectedIndex === null ? "gray" : "red",
          }}
          title="Delete Selected Polygon"
          aria-disabled={selectedIndex === null}
        >
          <FiTrash2 />
          Delete Selected
        </button>

        <button
          onClick={clearAllPolygons}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "transparent",
            border: "none",
            color: "orange",
          }}
          title="Clear All Polygons"
        >
          <FiXCircle />
          Clear All
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ display: "block", maxWidth: "100%" }}
      />

      <div style={{ fontSize: 12, color: "#666", padding: 4 }}>
        <div>
          Left click (Draw mode): add points, close polygon by clicking near
          first point.
        </div>
        <div>
          Left click (Select mode): select polygon (highlighted orange).
        </div>
        <div>Delete Selected: removes the highlighted polygon.</div>
        <div>Clear All: removes all polygons.</div>
        <div>Wheel scroll: zoom in/out.</div>
        <div>Drag mouse: pan.</div>
        <div>Right click is disabled to avoid conflicts.</div>
      </div>
    </div>
  );
}
