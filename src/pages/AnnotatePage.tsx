import { useState, useEffect } from "react";
import AnnotationCanvas from "../components/Annotate/AnnotationCanvas";

type Point = { x: number; y: number };
type Polygon = Point[];

const IMAGE_COUNT = 5;

// Utility to generate image URLs for a mode
const getImagesForMode = (mode: "axial" | "sagittal" | "coronal") =>
  Array.from(
    { length: IMAGE_COUNT },
    (_, i) => `/images/${mode}/img${i + 1}.jpg`
  );

export default function AnnotatePage() {
  // State for axial view
  const [axialIndex, setAxialIndex] = useState(0);
  const [axialAnnotations, setAxialAnnotations] = useState<Polygon[]>([]);

  // State for sagittal view
  const [sagittalIndex, setSagittalIndex] = useState(0);
  const [sagittalAnnotations, setSagittalAnnotations] = useState<Polygon[]>([]);

  // Load annotations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("annotations");
    if (saved) {
      const parsed: Record<string, Polygon[]> = JSON.parse(saved);
      setAxialAnnotations(parsed["axial-0"] || []);
      setSagittalAnnotations(parsed["sagittal-0"] || []);
    }
  }, []);

  // Save annotations whenever they change
  useEffect(() => {
    const saved = localStorage.getItem("annotations");
    const parsed: Record<string, Polygon[]> = saved ? JSON.parse(saved) : {};
    parsed[`axial-${axialIndex}`] = axialAnnotations;
    parsed[`sagittal-${sagittalIndex}`] = sagittalAnnotations;
    localStorage.setItem("annotations", JSON.stringify(parsed));
  }, [axialAnnotations, sagittalAnnotations, axialIndex, sagittalIndex]);

  const axialImages = getImagesForMode("axial");
  const sagittalImages = getImagesForMode("sagittal");

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        MRI Annotation Tool
      </h1>
      <div className="flex gap-8">
        {/* Axial View */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-center">Axial View</h2>
          <AnnotationCanvas
            imageSrc={axialImages[axialIndex]}
            polygons={axialAnnotations}
            onChange={setAxialAnnotations}
          />
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setAxialIndex((i) => Math.max(i - 1, 0))}
              className="btn btn-primary"
            >
              Prev
            </button>
            <span className="self-center">
              {axialIndex + 1} / {axialImages.length}
            </span>
            <button
              onClick={() =>
                setAxialIndex((i) => Math.min(i + 1, axialImages.length - 1))
              }
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </div>

        {/* Sagittal View */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Sagittal View
          </h2>
          <AnnotationCanvas
            imageSrc={sagittalImages[sagittalIndex]}
            polygons={sagittalAnnotations}
            onChange={setSagittalAnnotations}
          />
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setSagittalIndex((i) => Math.max(i - 1, 0))}
              className="btn btn-primary"
            >
              Prev
            </button>
            <span className="self-center">
              {sagittalIndex + 1} / {sagittalImages.length}
            </span>
            <button
              onClick={() =>
                setSagittalIndex((i) =>
                  Math.min(i + 1, sagittalImages.length - 1)
                )
              }
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
