import express from "express";
import db from "../../../db.js";
 const router = express.Router()

 router.get("/", async (req, res )=>{
    try{
const snippets = await db("snippets").select("*");
res.status(200).json(snippets);
    }catch (error){res.status(500).json({ error: "Internal Server Error"});}
 });

 export default router;