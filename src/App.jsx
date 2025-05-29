import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import CreerEtudiant from './components/CreerEtudiant'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import NonProtectedRoute from './components/NonProtectedRoute'

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/ajout-etudiant/:id?' element={<CreerEtudiant />} />
        <Route element={<NonProtectedRoute />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route path='/' element={<Home />} />
          <Route path='/liste-departement' element={<div>Hello protection</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
