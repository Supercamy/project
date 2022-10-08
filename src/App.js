import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Projects from './pages/Projects'
import Charts from './pages/Charts'
import Sign from './pages/Sign'
import Signup from './pages/Signup'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Projects />} />
          <Route path='/charts' element={<PrivateRoute />}>
            <Route path='/charts' element={<Charts />} />
          </Route>

          <Route path='/sign' element={<Sign />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
      <ToastContainer position='top-center' />
    </>
  )
}

export default App
