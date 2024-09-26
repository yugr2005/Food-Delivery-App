const zod = require("zod");

const safeUser = zod.object({

    username : zod.string(),
    email : zod.string().email(),
    address : zod.string(),
    password : zod.string().min(8),

})

const safeRes = zod.object({
    name : zod.string().min(3).max(20),
    image : zod.string().url(),
    category : zod.string(),
    address : zod.string().max(50),
    phone : zod.string().min(10).max(10),
    menu : zod.array(zod.string()).optional(),
})

const safeItem = zod.object({
    nameitem : zod.string(),
    price : zod.number(),
    description : zod.string(),
    image : zod.string().url()
})

const safeAdmin = zod.object({

    username : zod.string(),
    email : zod.string().email(),
    password : zod.string().min(8),
})


module.exports = {
    safeUser,
    safeRes,
    safeItem,
    safeAdmin,
}