import React from "react";

export default function Selectors({
  text,
  image,
}: {
  text: string;
  image: string;
}) {
  return (
    <div>
      <div>{text}</div>
      {image && <img src={image} className="max-w-sm" />}
    </div>
  );
}
