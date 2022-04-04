
//Routes
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Foot from './components/footer/Foot';
import Header from './components/header/Header';
import ContactPage from './pages/ContactPage';
import DeliveryPolicy from './pages/DeliveryPolicy';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import { UserContext } from './context/UserContext'
import { useContext, useEffect, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'



function App() {

  const [userContext, setUserContext] = useContext(UserContext)

  const verifyUser = useCallback(() => {
    fetch("http://localhost:8000/api/user/refreshToken", {
      method: 'POST',
      credentials: "include",
      header: { "Content-Type": "application/json" }
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(prev => ({ ...prev, token: data.token }))
      } else {
        setUserContext(prev => ({ ...prev, token: null }))
      }

      setTimeout(verifyUser, 5 * 30 * 1000) //call refreshtoken every 5 minutes to renew token
    })
  }, [setUserContext])

  useEffect(() => verifyUser(), [verifyUser])

  const syncLogout = useCallback(event => {
    if (event.key === 'logout') {
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    window.addEventListener("storage", syncLogout)

    return () => {
      window.removeEventListener("storage", syncLogout)
    }
  }, [syncLogout])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/policy' element={<DeliveryPolicy />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
      </Routes>
      <Foot />
    </div>
  );
}

export default App;
