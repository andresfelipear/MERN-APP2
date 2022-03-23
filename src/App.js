import SignUpPage from './pages/SignUpPage';
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <>Hola Mundo</>
      <Routes>
        <Route path='/signup' element={<SignUpPage/>} />
      </Routes>
    </div>
  );
}

export default App;
