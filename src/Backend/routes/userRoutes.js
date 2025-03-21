import express from 'express';
import {Fetch,create,update,Delete,UserFetch,UserCreate,UserLogin,OrderCreate,OrderFetchIndividual,OrderFetchAdmin,OrderUpdate,UserDetailUpadate,UserDetail,SessionDestroy} from  '../controller/userController.js'

const Route= express.Router();
Route.put("/update/:id",update);
Route.post("/create",create);
Route.get("/Fetch",Fetch);
Route.delete("/delete/:id",Delete);
Route.post("/UserCreate",UserCreate);
Route.get("/UserFetch",UserFetch);
Route.post("/UserLogin",UserLogin);
Route.post("/OrderData",OrderCreate);
Route.post("/OrderFetchIndividual",OrderFetchIndividual);
Route.get("/OrderFetchAdmin",OrderFetchAdmin);
Route.put("/OrderUpdate/:id",OrderUpdate);
Route.put('/UserDetailUpadate',UserDetailUpadate);
Route.post('/UserDetail',UserDetail);
Route.post('/SessionDestroy',SessionDestroy);
export default Route;
