import express from 'express';
import getInterval from "../controller/myPage/getAverageInterval.js";
import read from "../controller/myPage/getDiaryCount.js";
import { authJWT } from '../middlewares/auth.js';

const router = express.Router();

// 일기 작성 개수 갖고오기
router.get('/read', authJWT, read);

// 일기 작성 주기 갖고 오기
router.get('/interval', authJWT, getInterval);

export default router;