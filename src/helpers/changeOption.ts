import { useOptions } from "@/providers/optionContext";
export default function (op: string) {
  const { option, setOption } = useOptions();
  setOption(op);
}
