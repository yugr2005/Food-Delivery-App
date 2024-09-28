import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home';
import { Signuppage } from './Pages/Signuppage';
import { Loginpage } from './Pages/Loginpage';
import { Dashboard } from './Pages/Dashboard';
import { RestroMenu } from './Pages/RestroMenu';
import { CartProvider } from './Components/Addtocart';
import { CartPage } from './Pages/CartPage';
import { RestroSignupPage } from './Pages/RestroSignupPage';
import { RestroLoginPage } from './Pages/RestroLoginPage';
import { AddMenu } from './Pages/AddMenu';
import { AdminSignupPage } from './Pages/AdminSignupPage';
import { AdminLoginPage } from './Pages/AdminLoginPage';
import { AdminStatusChange } from './Pages/AdminStatusChange';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { HistoryPage } from './Pages/HistoryPage';

const stripePromise = loadStripe('pk_test_51Q3UsjACG9jWgjbPZLIjc3eocHTwQFkuupub5GvrKujzt89QsYTAM2h12fpWJiJcpJZty2ZCUXju4Moo1AlfCmDc00Dc76X3XR');

function App() {


  return (
    <>
    <Elements stripe={stripePromise}>
    <CartProvider>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signup' element={<Signuppage />} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/dashboard/:id' element={<RestroMenu/>}/>
          <Route path='/cart/:name/:id' element={<CartPage/>}/>
          <Route path='/restrosignup' element={<RestroSignupPage/>}/>
          <Route path='/restrologin' element={<RestroLoginPage/>}/>
          <Route path='/restroaddmenu' element={<AddMenu/>}/>

          <Route path='/adminsignup' element={<AdminSignupPage/>}/>
          <Route path='/adminlogin' element={<AdminLoginPage/>}/>

          <Route path='/pendingorder' element={<AdminStatusChange/>}/>
          <Route path='/orderhistory' element={<HistoryPage/>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </Elements>
      
    </>
  );
}

export default App;

