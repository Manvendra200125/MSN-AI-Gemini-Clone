import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyACgpouP1sTmIHfZ1Be0_G1X1Dd8ZxFGk4"; // Your API key here
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        console.log("Result:", result.response); // Log the response for debugging
        return result.response.text(); // Ensure you return the correct text
    } catch (error) {
        console.error("Error in run function:", error);
        throw error; // Propagate the error to the caller
    }
}

export default run;
