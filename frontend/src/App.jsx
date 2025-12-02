
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

// export default App

import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router/approutes'
import { useState, useEffect } from 'react'
import Loader from './components/Loader'   // ⬅️ Add this

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Loader disappears after 1 second
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Show loader while loading = true
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
