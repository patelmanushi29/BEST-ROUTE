
import { GoogleGenAI, Type } from "@google/genai";
import { RouteResponse, Preferences } from "../types";

// Always use the process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function findBestRoutes(
  start: string,
  destination: string,
  stops: string[],
  prefs: Preferences
): Promise<RouteResponse> {
  const prefString = Object.entries(prefs)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(", ");

  const prompt = `Act as an expert travel and transit consultant. Find the best route from "${start}" to "${destination}"${stops.length > 0 ? ` with extra stops at: ${stops.join(", ")}` : ""}. 
  The user has specific preferences: ${prefString || 'None'}. 
  
  Provide a primary "bestRoute" based on preferences, and at least 2 alternative options. 
  Include estimated duration, distance, approximate cost (if applicable), and a concise description of why it fits the criteria.
  Also include "emissions" for the eco-friendly context if relevant.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bestRoute: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              duration: { type: Type.STRING },
              distance: { type: Type.STRING },
              cost: { type: Type.STRING },
              description: { type: Type.STRING },
              advantages: { type: Type.ARRAY, items: { type: Type.STRING } },
              emissions: { type: Type.STRING },
            },
            required: ["type", "duration", "distance", "cost", "description", "advantages"],
          },
          alternatives: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                duration: { type: Type.STRING },
                distance: { type: Type.STRING },
                cost: { type: Type.STRING },
                description: { type: Type.STRING },
                advantages: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["type", "duration", "distance", "cost", "description", "advantages"],
            }
          }
        },
        required: ["bestRoute", "alternatives"],
      },
    },
  });

  try {
    // response.text is a property, not a method.
    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Could not calculate routes. Please try again.");
  }
}
