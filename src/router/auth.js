import express from "express";
import join from "../controller/auth/join.js"

export const router = express.Router();


//POST /api/user/login
router.post('/login', (req,res)=>{
    res.status(200).send({
        ok:true
    })
});

//POST /api/user/join
router.post('/join',join);

export default router;