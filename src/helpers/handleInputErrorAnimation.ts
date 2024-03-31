import { MutableRefObject } from "react";

export default function handleInputErrorAnimation(
  ref: MutableRefObject<HTMLElement | null>
) {
  if (ref.current !== null) {
    ref.current.classList.add("animate-inputError");
  }

  setTimeout(() => {
    if (ref.current !== null) {
      ref.current.classList.remove("animate-inputError");
    }
  }, 1000);
}
