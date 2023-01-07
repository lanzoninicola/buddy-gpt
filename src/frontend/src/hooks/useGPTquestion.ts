import { useCallback, useEffect, useState } from "react";

export default function useGPTQuestion() {
  let gptQuestionTextArea: HTMLTextAreaElement | null = null;
  const [gptQuestionValue, setGptQuestionValue] = useState<string>("");

  const gptQuestionCb = useCallback((event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;

    setGptQuestionValue(value);
  }, []);

  if (document) {
    gptQuestionTextArea = document.querySelector("form textarea");
  }

  useEffect(() => {
    if (gptQuestionTextArea) {
      gptQuestionTextArea.addEventListener("input", gptQuestionCb);
    }

    return () => {
      if (gptQuestionTextArea) {
        gptQuestionTextArea.removeEventListener("input", gptQuestionCb);
      }
    };
  }, []);

  return {
    gptQuestionValue,
    gptQuestionTextArea,
  };
}
