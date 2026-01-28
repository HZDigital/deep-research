import { useState } from "react";
import { streamText, smoothStream } from "ai";
import { toast } from "sonner";
import { useSettingStore } from "@/store/setting";
import useModelProvider from "@/hooks/useAiProvider";
import { getSafeTemperatureOptions } from "@/utils/model";
import {
  AIWritePrompt,
  changeLanguagePrompt,
  changeReadingLevelPrompt,
  adjustLengthPrompt,
  continuationPrompt,
  addEmojisPrompt,
} from "@/utils/artifact";
import { parseError } from "@/utils/error";

type ArtifactProps = {
  value: string;
  onChange: (value: string) => void;
};

function smoothTextStream(type: "character" | "word" | "line") {
  return smoothStream({
    chunking: type === "character" ? /./ : type,
    delayInMs: 0,
  });
}

function handleError(error: unknown) {
  const errorMessage = parseError(error);
  toast.error(errorMessage);
}

function useArtifact({ value, onChange }: ArtifactProps) {
  const { smoothTextStreamType } = useSettingStore();
  const { createModelProvider, getModel } = useModelProvider();
  const [loadingAction, setLoadingAction] = useState<string>("");

  async function AIWrite(prompt: string, systemInstruction?: string) {
    const { thinkingModel } = getModel();
    setLoadingAction("aiWrite");
    const modelProvider = await createModelProvider(thinkingModel);
    const result = streamText({
      model: modelProvider,
      prompt: AIWritePrompt(value, prompt, systemInstruction),
      ...getSafeTemperatureOptions((modelProvider as any).modelId),
      experimental_transform: smoothTextStream(smoothTextStreamType),
      onError: handleError,
    });
    let text = "";
    for await (const textPart of result.textStream) {
      text += textPart;
      onChange(text);
    }
    text = "";
    setLoadingAction("");
  }

  async function translate(lang: string, systemInstruction?: string) {
    const { thinkingModel } = getModel();
    setLoadingAction("translate");
    const modelProvider = await createModelProvider(thinkingModel);
    const result = streamText({
      model: modelProvider,
      prompt: changeLanguagePrompt(value, lang, systemInstruction),
      ...getSafeTemperatureOptions((modelProvider as any).modelId),
      experimental_transform: smoothTextStream(smoothTextStreamType),
      onError: handleError,
    });
    let text = "";
    for await (const textPart of result.textStream) {
      text += textPart;
      onChange(text);
    }
    text = "";
    setLoadingAction("");
  }

  async function changeReadingLevel(level: string, systemInstruction?: string) {
    const { thinkingModel } = getModel();
    setLoadingAction("readingLevel");
    const modelProvider = await createModelProvider(thinkingModel);
    const result = streamText({
      model: modelProvider,
      prompt: changeReadingLevelPrompt(value, level, systemInstruction),
      ...getSafeTemperatureOptions((modelProvider as any).modelId),
      experimental_transform: smoothTextStream(smoothTextStreamType),
      onError: handleError,
    });
    let text = "";
    for await (const textPart of result.textStream) {
      text += textPart;
      onChange(text);
    }
    text = "";
    setLoadingAction("");
  }

  async function adjustLength(length: string, systemInstruction?: string) {
    const { thinkingModel } = getModel();
    setLoadingAction("adjustLength");
    const modelProvider = await createModelProvider(thinkingModel);
    const result = streamText({
      model: modelProvider,
      prompt: adjustLengthPrompt(value, length, systemInstruction),
      ...getSafeTemperatureOptions((modelProvider as any).modelId),
      experimental_transform: smoothTextStream(smoothTextStreamType),
      onError: handleError,
    });
    let text = "";
    for await (const textPart of result.textStream) {
      text += textPart;
      onChange(text);
    }
    text = "";
    setLoadingAction("");
  }

  async function continuation(systemInstruction?: string) {
    const { thinkingModel } = getModel();
    setLoadingAction("continuation");
    const modelProvider = await createModelProvider(thinkingModel);
    const result = streamText({
      model: modelProvider,
      prompt: continuationPrompt(value, systemInstruction),
      ...getSafeTemperatureOptions((modelProvider as any).modelId),
      experimental_transform: smoothTextStream(smoothTextStreamType),
      onError: handleError,
    });
    let text = value + "\n";
    for await (const textPart of result.textStream) {
      text += textPart;
      onChange(text);
    }
    text = "";
    setLoadingAction("");
  }

  async function addEmojis(systemInstruction?: string) {
    const { thinkingModel } = getModel();
    setLoadingAction("addEmojis");
    const modelProvider = await createModelProvider(thinkingModel);
    const result = streamText({
      model: modelProvider,
      prompt: addEmojisPrompt(value, systemInstruction),
      ...getSafeTemperatureOptions((modelProvider as any).modelId),
      experimental_transform: smoothTextStream(smoothTextStreamType),
      onError: handleError,
    });
    let text = "";
    for await (const textPart of result.textStream) {
      text += textPart;
      onChange(text);
    }
    text = "";
    setLoadingAction("");
  }

  return {
    loadingAction,
    AIWrite,
    translate,
    changeReadingLevel,
    adjustLength,
    continuation,
    addEmojis,
  };
}

export default useArtifact;
