import React from "react";
import selector from "@/types/selector";
import Link from "next/link";

export default function Selectors({ text, image, url }: selector) {
  return (
    <Link href={url}>
      <div>{text}</div>
      {image && <img src={image} className="max-w-sm" />}
    </Link>
  );
}
