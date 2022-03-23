import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/footer/Footer'
import Header from './components/header/Header';
import ContactPage from './pages/ContactPage';
import DeliveryPolicy from './pages/DeliveryPolicy';
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/contact' element={<ContactPage/>} />
        <Route path='/policy' element={<DeliveryPolicy/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
