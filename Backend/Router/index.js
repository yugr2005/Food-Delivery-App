const express = require("express");
const signup = require("../Functions/User/signup");
const login = require("../Functions/User/login");
const register = require("../Functions/Restaurant/register");
const additem = require("../Functions/Restaurant/additem");
const auth = require("../Functions/Middlewares/auth");
const {getRestro} = require("../Functions/User/getRestro");
const singleRestro = require("../Functions/User/singleRestro");
const createorder = require("../Functions/User/createoerder");
const getMenu = require("../Functions/User/getMenu");
const history = require("../Functions/User/history");
const adminSignup = require("../Functions/Admin/adminSignup");
const adminLogin = require("../Functions/Admin/adminLogin");
const orderHistory = require("../Functions/Admin/orderHistory");
const orderStatus = require("../Functions/Admin/orderStatus");
const {cityRestro} = require("../Functions/User/getRestro");
const payment = require("../Functions/User/payment");
const reslogin = require("../Functions/Restaurant/resLogin");


const router = express.Router();

//User Routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/getRestro', auth, getRestro);
router.get('/singleRestro/:id', auth, singleRestro);
router.post('/cityRestro', auth, cityRestro);
router.post('/createorder/restaurant/:id', auth, createorder);
router.get('/getMenu/restaurant/:id', auth, getMenu);
router.get('/history', auth, history);
router.post('/payment' , auth, payment);

//Admin Routes
router.post('/admin/adminSignup', adminSignup);
router.post('/admin/adminLogin', adminLogin);
router.get('/admin/orderHistory', auth, orderHistory);
router.post('/admin/orderStatus', auth, orderStatus);

//Restaurants Routes
router.post('/register', register);
router.post('/reslogin',reslogin);
router.post('/additem', auth, additem)

module.exports = router;