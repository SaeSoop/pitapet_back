import express from "express";
const router = express.Router();

router.post('/api/user', (req,res)=>{
    res.status(200).send({
        ok:true
    })
});

export default router;