import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        const finalPrompt = prompt || input;

        try {
            // Add the prompt to prevPrompt
            if (finalPrompt && !prevPrompt.includes(finalPrompt)) {
                setPrevPrompt((prev) => [...prev, finalPrompt]);
            }

            const response = await run(finalPrompt);
            const responseArray = response.split("**");
            let formattedResponse = "";

            for (let i = 0; i < responseArray.length; i++) {
                formattedResponse += i % 2 === 1
                    ? `<b>${responseArray[i]}</b>`
                    : responseArray[i];
            }

            const finalResponse = formattedResponse.split("*").join("<br/>");
            const responseWords = finalResponse.split(" ");

            responseWords.forEach((word, i) => {
                delayPara(i, word + " ");
            });
        } catch (error) {
            console.error("Error in onSent:", error);
            setResultData("An error occurred while processing your request.");
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
