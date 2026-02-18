
import { GoogleGenAI, Type } from "@google/genai";
import { ManzaiScript } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const MANZAI_SYSTEM_INSTRUCTION = `
あなたはプロの漫才作家であり、同時にベテランの漫才師です。
ユーザーから与えられたテーマに基づいて、オリジナルの漫才台本を生成することがあなたのタスクです。

漫才の構成は以下のルールに厳格に従ってください：
1. 登場人物はボケとツッコミの二人組です。
2. ボケとツッコミが交互に会話を繰り広げます。
3. 会話の合計は最低でも20行（ボケ10回、ツッコミ10回）以上で構成してください。
4. 漫才の冒頭と最後に、一般的な漫才の挨拶（例: 「どうもー！〇〇でーす！」「お願いしまーす！」、最後は「もうええわ！ありがとうございましたー！」）を必ず含めてください。
5. 漫才のオチは、その場の雰囲気を最高潮に盛り上げ、記憶に残るようなパンチラインで締めくくってください。
6. 日本の一般的なお笑いの文脈（M-1グランプリのようなスピード感と構成）に沿った、老若男女にウケる面白さを目指してください。

出力は必ず指定されたJSON形式で行ってください。
`;

export const generateManzaiScript = async (theme: string): Promise<ManzaiScript> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `テーマ：「${theme}」で漫才台本を書いてください。`,
    config: {
      systemInstruction: MANZAI_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "漫才のタイトル" },
          lines: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING, enum: ["ボケ", "ツッコミ"] },
                text: { type: Type.STRING }
              },
              required: ["role", "text"]
            }
          }
        },
        required: ["title", "lines"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("台本の生成に失敗しました。");
  return JSON.parse(text) as ManzaiScript;
};
