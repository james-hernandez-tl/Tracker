"use server";
import { revalidatePath } from "next/cache";

export default async function refreshPath(path: string) {
  try {
    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath("/");
      revalidatePath("/[lang]");
    }
  } catch (error) {
    console.error("clearCachesByServerAction=> ", error);
  }
}
