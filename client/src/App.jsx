// import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App;
