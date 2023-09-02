import express from "express";
import authRouter from "../router/auth.js"
import questionRouter from "../router/question.js"
import myPuppyRouter from "../router/my_puppy.js"
import diaryRouter from "../router/diary.js"
import answerRouter from "../router/answer.js"
import myPageRouter from "../router/myPage.js"

const router = express.Router();

//auth 
router.use('/api/user', authRouter);

//my-puppy
router.use('/api/my-puppy', myPuppyRouter);    // 라우트를 추가하고 기본 경로로 /my-puppy 사용

//diary
router.use('/api/diary', diaryRouter);

//question
router.use('/api/question', questionRouter); 

//answer
router.use('/api/answer', answerRouter);    

//mypage
router.use('/api/my-page', myPageRouter);    

export default router;