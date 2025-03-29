import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Route from './routes/userRoutes.js';
import Razorpay from 'razorpay';
import session from 'express-session';

dotenv.config();

const app = express();

// CORS - Allow both local and live frontend
app.use(cors({
    origin: ['http://localhost:5173', 'https://e-commerce-react-project.onrender.com'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "ddddd",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

// Debugging - Check if environment variables are loaded
console.log("MongoDB URL:", MONGOURL);

// Connect to MongoDB Atlas
mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log("MongoDB URI:", process.env.MONGO_URI);

    });
}).catch((error) => {
    console.error('❌ MongoDB Connection Error:', error);
});

// Razorpay API Integration
app.post('/api/product/orders', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const options = req.body;
        const orders = await razorpay.orders.create(options); 
        if (!orders){
            return res.status(500).json({ message: "No Orders" });
        }
        return res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error in Razorpay" });
    }
});

app.get("/", (req, res) => {
    res.send("Server is running");
  });
// API Routes
app.use("/api/product", Route);
