import './App.css'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import { Header } from './components/fragments/Header'
import Footer from './components/fragments/Footer'
import DetailProductPage from './pages/DetailProductPage'
import LoginPage from './pages/LoginPage'

function App() {
  

  return (
    <>
       <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<DetailProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="*" element={<h1 className='text-6xl flex justify-center items-center min-h-screen'>404 Not Found</h1>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
