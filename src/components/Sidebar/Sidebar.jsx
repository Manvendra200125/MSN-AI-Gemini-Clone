import React, { useState, useContext, useEffect } from "react";
import { TfiMenu, TfiPlus } from "react-icons/tfi";
import { RiMessage3Line, RiQuestionMark, RiSettings2Fill, RiTimeFill, RiSunLine, RiMoonLine } from "react-icons/ri";
import "./Sidebar.css";
import { Context } from "../../context/Context";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    return (
        <div className={`sidebar ${darkMode ? 'dark' : 'light'}`}>
            <div className="top">
                <TfiMenu onClick={() => setExtended((prev) => !prev)} className="menu img" />
                <div 
                    onClick={() => {
                        setRecentPrompt(""); 
                        newChat(); 
                    }} 
                    className="new-chat"
                >
                    <TfiPlus className="img" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompt.map((item, index) => (
                            <div
                                key={index}
                                className="recent-entry"
                                onClick={() => loadPrompt(item)}
                            >
                                <RiMessage3Line className="img" />
                                <p>{item.slice(0, 15)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <RiQuestionMark className="img" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <RiTimeFill className="img" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <RiSettings2Fill className="img" />
                    {extended ? <p>Settings</p> : null}
                </div>
                <div className="bottom-item recent-entry" onClick={toggleDarkMode}>
                    {darkMode ? <RiSunLine className="img" /> : <RiMoonLine className="img" />}
                    {extended ? <p>{darkMode ? 'Light Mode' : 'Dark Mode'}</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

