import React, { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import './index.css'
import { Main } from './components/Main/Main'

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar setDarkMode={setDarkMode} />
      <Main />
    </div>
  )
}

export default App

