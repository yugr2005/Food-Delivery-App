const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function payment(req,res){

    try{
        const {amount} = req.body;
        if(amount <= 0 || !amount){
            res.status(411).json({
                msg : "Not a valid amount"
            })
            return;
        }

        const clearPayment = await stripe.paymentIntents.create({
            amount : amount,
            currency : 'usd',
        })

        console.log(clearPayment);

        res.json({
            msg : "Payemnt successful",
            clientKey : clearPayment.client_secret
        })


    }
    catch(err){
        res.status(411).json({
            msg : "Error in Payement",
            err : err,
        })
    }
}

module.exports = payment;