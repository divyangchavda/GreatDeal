import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Route  from './routes/userRoutes.js';
import Razorpay from 'razorpay';

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
dotenv.config();
const PORT =process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;


//razorpay 
app.post('/api/product/orders', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const options = req.body;
        const orders = await razorpay.orders.create(options);
        if (!orders) {
            return res.status(500).json({ message: "No Orders" });
        }
        return res.json(orders);
    } catch (error) {
        res.status(500).json("Internal server error in razorpay index.js");
    }
});

//Coonect with mongodb

mongoose.connect(MONGOURL)
        .then(()=>{
            console.log('Database connected')
            app.listen(PORT,()=>{
                console.log(`Server is running on port ${PORT}`)
            })
        }).catch((error)=>{
            console.log('Error:',error.message)
        })

    app.use("/api/product",Route);