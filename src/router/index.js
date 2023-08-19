import express from "express";
import authRouter from "../router/auth.js"
import questionRouter from "../router/question.js"
import myPuppyRouter from "../router/my_puppy.js"

const router = express.Router();

//auth 
router.use('/api/user', authRouter);

//my-puppy
router.use('/api/my-puppy', myPuppyRouter);    // 라우트를 추가하고 기본 경로로 /my-puppy 사용

//question
router.use('/api/question', questionRouter);    // 라우트를 추가하고 기본 경로로 /my-puppy 사용

export default router;