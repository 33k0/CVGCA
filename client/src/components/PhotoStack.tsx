import React from "react";

interface PhotoWreathProps {
  images: string[];
  radius?: number;
}

const PhotoWreath: React.FC<PhotoWreathProps> = ({ images, radius = 180 }) => {
  const count = images.length;
  const startAngle = -100;
  const endAngle = -80 + 180;

  return (
    <div className="absolute left-1/2 top-[15%] -translate-x-1/2 z-10">
    {images.map((src: string, i: number) => {
      const angle = startAngle + (i * (endAngle - startAngle)) / (count - 1);
      const rad = (angle * Math.PI) / 180;
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);

      return (
        <img
          key={i}
          src={src}
          alt=""
          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border-4 border-white shadow-lg"
          style={{
            position: "absolute",
            transform: `translate(${x}px, ${y}px)`,
          }}
        />
      );
    })}
  </div>
);
};

export default PhotoWreath;
