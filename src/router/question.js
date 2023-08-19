import express from 'express';
import create from "../controller/question/question_create.js";
import read from "../controller/question/question_read.js";
import update from "../controller/question/question_update.js";
import { authJWT } from '../middlewares/auth.js';

const router = express.Router();

//질문 읽어오기
//GET: /api/my-puppy/
router.get('/read', read);


//질문 추가
//POST: /api/question/create
router.post('/create', create);

//질문 수정
//PUT /api/question/update
router.put('/update/:itemNumber', update);

//강아지 정보 삭제
//DELETE: /api/my-puppy/delete
//router.delete('/delete/:itemNumber', authJWT, delete_data);

export default router;