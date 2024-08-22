import { createWorker } from "tesseract.js";

export const converter = async (img: string) => {
  const worker = await createWorker("eng");
  const ret = await worker.recognize(img);
  const text = ret.data.text;

  await worker.terminate();
  return text;
};
