import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development and should be handled by the environment.
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            day: {
                type: Type.INTEGER,
                description: "The day number, from 1 to 21."
            },
            tasks: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING
                },
                description: "An array of 2-3 short, actionable wellness tasks for the day. e.g., ['10-min guided meditation', '5-min stretching']."
            }
        },
        required: ["day", "tasks"]
    }
};


export const generateRoutinePlan = async (freeTime: number): Promise<{ day: number, tasks: string[] }[]> => {
    try {
        const prompt = `
            Create a 21-day wellness routine plan for a user with ${freeTime} minutes of free time per day.
            For each day, provide a list of 2-3 small, actionable tasks.
            The plan should be balanced, incorporating a mix of light physical activity (like walking, stretching), mindfulness (breathing exercises, meditation), and focus-building tasks.
            The tasks should be simple, easy to follow, and require minimal equipment.
            Gradually increase the intensity or duration slightly over the 21 days if possible.
            Ensure the output is a JSON array of objects, where each object has a 'day' (number) and a 'tasks' (array of strings).
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const plan = JSON.parse(jsonText);
        
        // Validate and sort the plan
        if (Array.isArray(plan)) {
            return plan
                .filter(item => typeof item.day === 'number' && Array.isArray(item.tasks))
                .sort((a, b) => a.day - b.day);
        }

        return [];

    } catch (error) {
        console.error("Error generating routine plan:", error);
        // Fallback to a default plan on error
        return [
            { day: 1, tasks: ['5-minute deep breathing exercise.', 'Drink a glass of water.'] },
            { day: 2, tasks: ['10-minute brisk walk outside.', 'Stretch for 5 minutes.'] },
            { day: 3, tasks: ['Error generating plan.', 'Please try again.'] },
        ];
    }
};