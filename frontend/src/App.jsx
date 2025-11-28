
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router/approutes'

function App() {
  return   <div className='h-screen w-full overflow-y-none'>
    <BrowserRouter>
    <AppRoutes/>
    </BrowserRouter>
   
  </div>

}

export default App
