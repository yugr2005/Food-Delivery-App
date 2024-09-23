import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home';
import { Signuppage } from './Pages/Signuppage';
import { Loginpage } from './Pages/Loginpage';
import { Dashboard } from './Pages/Dashboard';
import { RestroMenu } from './Pages/RestroMenu';
import { CartProvider } from './Components/Addtocart';
import { CartPage } from './Pages/CartPage';

function App() {
  return (
    <>
    <CartProvider>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signup' element={<Signuppage />} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/dashboard/:id' element={<RestroMenu/>}/>
          <Route path='/cart/:name/:id' element={<CartPage/>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
      
    </>
  );
}

export default App;

