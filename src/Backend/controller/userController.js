import {Productdata,User,Order} from '../model/userModel.js';

const create = async (req, res) => {
    try {
        let productData = req.body;

        if (!Array.isArray(productData)) {
            productData = [productData]; // Ensure productData is an array
        }
        // Extract all titles from the products
        const titles = productData.map(product => product.title);

        // Find existing products in one query
        const existingProducts = await Productdata.find({ title: { $in: titles } });

        // Create a set of existing product titles
        const existingTitles = new Set(existingProducts.map(product => product.title));

        // Filter out products that already exist
        const newProducts = productData.filter(product => !existingTitles.has(product.title));

        if (newProducts.length === 0) {
            return res.status(400).json({ message: "All products already exist" });
        }

        // Insert new products and retrieve them
        const insertedProducts = await Productdata.insertMany(newProducts);

        return res.status(200).json(insertedProducts); // Return the inserted product(s)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const Fetch = async (req, res) => {
    try {
        const Products = await Productdata.find();
        if (Products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json({ Products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        if (req.body.images && typeof req.body.images === "string") {
            req.body.images = req.body.images.split(',').map(img => img.trim());
        }
        const updatedProduct = await Productdata.findByIdAndUpdate(id, productData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
 
const Delete = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedProduct = await Productdata.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

 const UserCreate=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({error:"Please provide all required fields"});
        }
        const user=await User.create({
            name,
            email,
            password,
            contact:'',
            address:'',
            gender:'',
            age:''
        })
        return res.status(201).json(user);
        console.log("User Created",user);
    }
    catch(error){
        return res.status(404).json({error:"Internal Server Error"})

    }
}

const UserFetch = async (req, res) => {
    try {
        const Users = await User.find();
        if (Users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json({ Users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }
        if (user.password !== password) {
            return res.status(404).json({ message: "Invalid email or password" });
        }
        const userEmail = user.email;
        req.session.user = userEmail;
        console.log("User logged in:", userEmail);
        console.log("Session data:", req.session.user);
        await req.session.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error in UserLogin" });
    }
}
const OrderCreate = async (req, res) => {
    try {
        const user= req.session.user;
        console.log("🟢 OrderCreate User:", user);
        const {orderItems, shippingAddress, isPaid } = req.body;
        
        // Validate request body
        if (!user || !orderItems || orderItems.length === 0 || !shippingAddress ) {
            return res.status(400).json({ error: "Invalid order data. Please provide all required fields." });
        }

        // Create a new order
        const order = await Order.create({
            user,
            orderItems,
            shippingAddress,
            isPaid: isPaid || false, // Default to false if not provided
             // Default to "Pending" if not provided
        });

        return res.status(201).json(order);
    } catch (error) {
        console.error("Order creation error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const OrderFetchIndividual   = async (req, res) => {
    try {
        // const userEmail = req.params.email;
        const userEmail=req.session.user;
            console.log("🟢 orderfetchindividual:", userEmail);
            if(!userEmail){
                return res.status(404).json({message:"User email not come"});
            }
        const order = await Order.find({user: userEmail});
        if (!order || order.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const UserDetailUpadate= async (req, res) => {
    try {
        const userEmail = req.session.user; // Corrected from req.paras.email
        console.log("🟢 User Email:", userEmail);
        if(!userEmail){
            return res.status(404).json({message:"User email not come"});
        }
        console.log("🟢 User Data:", req.body);
        const userData = await User.findOneAndUpdate(
            { email: userEmail }, // Correct query format
            req.body,
            { new: true }
        );

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(userData);
    } catch (error) {
        console.error("Error in UserDetailUpdate:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const UserDetail=async(req,res)=>{
    try{
        const userEmail=req.session.user;
        console.log("userDey=tail",userEmail)
        const userData=await User.findOne({email:userEmail});
        if(!userData){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(userData);
    }
    catch{
        
        res.status(500).json({error:"catch block error in UserDetail at userController"});
    }
}
const OrderFetchAdmin =async(req,res)=>{
    try{
        const order=await Order.find();
        if(!order || order.length===0){
            return res.status(404).json({message:"Order not found"});
        }
        res.status(200).json(order);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"error ate OrderFetchAdmin in backend userConroller"});

    }
}

const OrderUpdate = async (req, res) => {
    try {
        const { id } = req.params;  // Order ID
        const { orderItemId, orderStatus } = req.body;  // Order Item ID + New Status

        console.log("🟢 Order ID:", id);
        console.log("🟢 Order Item ID:", orderItemId);
        console.log("🟢 New Status:", orderStatus);

        // 🔹 1️⃣ Update only the specific order item inside the array
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: id, "orderItems._id": orderItemId }, 
            { $set: { "orderItems.$.orderStatus": orderStatus } }, 
            { new: true }
        );

        // 🔹 2️⃣ If order or order item is not found, return an error
        if (!updatedOrder) {
            console.log("❌ Order or Order Item Not Found!");
            return res.status(404).json({ message: "Order or order item not found" });
        }

        console.log("✅ Updated Order Item:", updatedOrder);
        res.status(200).json({ message: "Order item status updated successfully", updatedOrder });

    } catch (error) {
        console.error("❌ Internal Server Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const SessionDestroy=async(req,res)=>{
    try{
        req.session.destroy();
        res.clearCookie('sid');
        console.log("Session Destroyed");
        return res.status(200).json({message:"Session Destroyed"});

    }catch(error){
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export { Fetch, create,update,Delete,UserCreate,UserFetch,UserLogin,OrderCreate,OrderFetchIndividual,OrderFetchAdmin,OrderUpdate,UserDetailUpadate,UserDetail,SessionDestroy};
