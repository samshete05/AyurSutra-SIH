
// import './App.css'
// import { BrowserRouter } from 'react-router-dom'
// import { AppRoutes } from './router/approutes'

// function App() {
//   return   <div className='h-screen w-full overflow-y-none'>
//     <BrowserRouter>
//     <AppRoutes/>
//     </BrowserRouter>
   
//   </div>

// }

import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router/approutes'
import { useState, useEffect } from 'react'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script')
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      document.body.appendChild(script)
    }
    
    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { 
          pageLanguage: "en",
          includedLanguages: "en,es,fr,de,zh,hi,ta,te,mr,bn",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        "google_translate_element"
      )
    }

    addScript()

    return () => {
      delete window.googleTranslateElementInit
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <div className='h-screen w-full overflow-y-none'>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App

