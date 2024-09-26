const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Db connected")
})
.catch((error) => {
    console.log(error);
})

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }
})

const resSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    
    menu : [{
        type : String,
        ref : 'food'
    }]
})

const foodSchema = mongoose.Schema({
    restaurant : {
        type : String,
    },
    restroname : {
        type : String
    },
    nameitem : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    }

})

const userOrderSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        ref : 'user'
    },
    order : [{
        restaurant : {
            type : String,
            required : true
        },
        items : [{
            fooditem : {
                type : String,
            },
            quantity : {
                type : Number,
                required : true
            }
        }],
        price : {
            type : Number,
            required : true
        },
        status : {
            type : String,
            default : "Pending"
        }
    }]
})

const adminSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})
 
const user = mongoose.model('users', userSchema);
const restaurant = mongoose.model('restaurants', resSchema);
const food = mongoose.model('foods', foodSchema);
const userOrder = mongoose.model('userOrder', userOrderSchema)
const admin = mongoose.model('admin', adminSchema)

module.exports = {
    user : user,
    restaurant : restaurant,
    food : food,
    userOrder : userOrder,
    admin : admin
}
