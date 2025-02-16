import mongoose from 'mongoose';

const productSchema= new mongoose.Schema({
    images:{
        type:[String],
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
})
 const UserDataSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})
const OrderSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true,
    
    },
    orderItems:[
        {
            title:{type:String,required:true},
            qty:{type:Number,required:true},
            price:{type:Number,required:true},
            images:[{type:String,required:true}],
            product:{type:String,required:true},
            orderStatus:{type:String,required:true,enum:["placed","dispatched","delivered","cancelled"]}
        
        }
    ],

    shippingAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true}
    },

    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
   
  
   
},{timestamps:true})

const User=mongoose.model("User",UserDataSchema)
const Productdata=mongoose.model("Productdata",productSchema)
const Order=mongoose.model("Orderdata",OrderSchema)

export {Productdata,User,Order};

