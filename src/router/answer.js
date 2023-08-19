import express from 'express';
import update from "../controller/my_puppy/puppy_update.js";
import read from "../controller/answer/answer_read.js";
import create from "../controller/answer/answer_create.js";
import { authJWT } from '../middlewares/auth.js';

const router = express.Router();

//답변 읽어오기
//GET: /api/answer/read
router.get('/read', read);

//답변 추가
//POST: /api/answer/create
router.post('/create', authJWT, create);


export default router;