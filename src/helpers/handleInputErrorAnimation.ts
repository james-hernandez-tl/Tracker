import { MutableRefObject } from "react";

export default function handleInputErrorAnimation(
  ref: MutableRefObject<HTMLElement | null>
) {
  if (ref !== null) {
    ref.current?.classList.add("animate-inputError");
  }

  setTimeout(() => {
    if (ref !== null) {
      ref.current?.classList.remove("animate-inputError");
    }
  }, 1000);
}
