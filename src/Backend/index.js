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

// ✅ Improved CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'https://e-commerce-react-project.onrender.com'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Explicitly handle preflight (OPTIONS) requests
app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
});

// ✅ Middleware
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

// ✅ Debugging - Check if environment variables are loaded
console.log("MongoDB URL:", MONGOURL);

// ✅ Connect to MongoDB Atlas
mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB Atlas:', MONGOURL);
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('❌ MongoDB Connection Error:', error);
});

// ✅ Razorpay API Integration
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
        console.error("❌ Razorpay Error:", error);
        res.status(500).json({ message: "Internal server error in Razorpay" });
    }
});

// ✅ API Routes
app.use("/api/product", Route);

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("Server is running");
});
