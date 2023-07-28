import express from "express";
import authRouter from "../router/auth.js"

const router = express.Router();

//auth 
router.use('/api/user', authRouter);

//my-puppy
// app.use('/my-puppy', myPuppyRoute);    // 라우트를 추가하고 기본 경로로 /my-puppy 사용


export default router;