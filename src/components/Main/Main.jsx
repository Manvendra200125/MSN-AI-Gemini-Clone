import React, { useContext } from 'react'
import './Main.css'
import { RiCodeAiFill, RiCompass2Line, RiLightbulbFlashFill, RiMessage2Line, RiMic2AiLine, RiSendPlane2Fill,  RiUserSearchFill } from 'react-icons/ri'
import { TfiGallery } from 'react-icons/tfi'
import { Context } from '../../context/Context'
import msn from '../../assets/msn.gif'
export const Main = () => {



    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

    return (
        <div className="main">
            <div className="nav">
                <p>MSN</p>
                <img></img>
            </div>
            <div className="main-container">


                {!showResult
                    ?
                    <>

                        <div className="greet">
                            <p><span>Hello, msn</span></p>
                            <p>How can I help you ?</p>
                        </div>

                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <p className='img'><RiCompass2Line /></p>
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <p className='img'><RiLightbulbFlashFill /></p>
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <p className='img'>  <RiMessage2Line /></p>
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <p className='img'><RiCodeAiFill /></p>
                            </div>
                        </div>                 
                    </>
                    :<div className='result'>
                        <div className="result-tital">
                            <div className='img'>
                            <RiUserSearchFill/>
                            </div>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={msn} alt='' />
                            {loading
                                ?<div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                        </div>
                    </div>
                }
                        

                            




                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <p className='img'><TfiGallery /></p>
                        <p className='img'><RiMic2AiLine /></p>
                        {input?<p onClick={() => onSent()} className='img'><RiSendPlane2Fill /></p>:null}
                    </div>
                </div>
                <div className="bottom-info">
                    <p>MSN may display inaccurate info, including about people, so double-check its responses. Your privacy and MSN Apps.</p>
                </div>
            </div>
        </div>

    )
}
