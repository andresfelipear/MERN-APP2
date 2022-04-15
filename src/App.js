
//Routes
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Foot from './components/footer/Foot';
import Header from './components/header/Header';
import ContactPage from './pages/ContactPage';
import DeliveryPolicy from './pages/DeliveryPolicy';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import BreakfastsPage from './pages/BreakfastsPage';
import DetailsBreakfastPage from './pages/detailsBreakfastPage/DetailsBreakfastPage';

import { UserContext } from './context/UserContext'
import { useContext, useEffect, useCallback, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ShoppingCart from './pages/ShoppingCart';





function App() {

  const [userContext, setUserContext] = useContext(UserContext)
  const [attempts, setAttempts] = useState(5)
  const [getCart, setGetCart] = useState(true)

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/user/refreshToken", {
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

  const getCartId = useCallback(async() => {
    await setGetCart(false)
    if (userContext.details || attempts < -100) {
      const userId = userContext.details ? userContext.details._id : undefined
      //fetch cart
      fetch(process.env.REACT_APP_API_ENDPOINT + `api/user/getCart/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          if (data.cart !== null) {
            setUserContext(prev => ({ ...prev, cartId: data.cart._id, cart:data.cart }))
          } else {
            setUserContext(prev => ({ ...prev, cartId: null }))
          }

        }
        else {
          setUserContext(prev => ({ ...prev, cartId: null }))
        }
      }).catch(err => { console.log(err) });
    }else{
      await setGetCart(true)
    }
  }, [getCart])

  const decressAttempts = async () => {
    const newAttempts = attempts - 1;
    await setAttempts(newAttempts);
    return newAttempts;
  }

  useEffect(() => {
    if (!userContext.cartId || userContext.details) {
      decressAttempts()
      getCartId()
    }
  }, [getCartId, userContext.details, getCart, setGetCart])

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
        <Route path='/breakfasts' element={<BreakfastsPage />} />
        <Route path='/breakfast' element={<DetailsBreakfastPage />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
      </Routes>
      <Foot />
    </div>
  );
}

export default App;
