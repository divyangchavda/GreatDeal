import express from 'express';
import {Fetch,create,update,Delete,UserFetch,UserCreate,UserLogin,OrderCreate,OrderFetchIndividual,OrderFetchAdmin,OrderUpdate } from  '../controller/userController.js'

const Route= express.Router();
Route.put("/update/:id",update);
Route.post("/create",create);
Route.get("/Fetch",Fetch);
Route.delete("/delete/:id",Delete);
Route.post("/UserCreate",UserCreate);
Route.get("/UserFetch",UserFetch);
Route.post("/UserLogin",UserLogin);
Route.post("/OrderData",OrderCreate);
Route.get("/OrderFetchIndividual/:email",OrderFetchIndividual);
Route.get("/OrderFetchAdmin",OrderFetchAdmin);
Route.put("/OrderUpdate/:id",OrderUpdate);
export default  Route;
