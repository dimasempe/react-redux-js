import './App.css'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import { Header } from './components/fragments/Header'
import Footer from './components/fragments/Footer'
import DetailProductPage from './pages/DetailProductPage'

function App() {
  

  return (
    <>
       <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<DetailProductPage />} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
