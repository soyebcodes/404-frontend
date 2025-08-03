type Props = {
  images: string[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function ImageSlider({
  images,
  currentIndex,
  onPrev,
  onNext,
}: Props) {
  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images to display.</p>;
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Slider Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <p className="text-sm text-gray-600">
          {currentIndex + 1} / {images.length}
        </p>

        <button
          onClick={onNext}
          disabled={currentIndex === images.length - 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Image Display */}
      <div className="w-full max-w-4xl h-[400px] flex items-center justify-center border rounded-md shadow relative bg-white">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-h-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}
