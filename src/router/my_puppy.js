import express from 'express';
import create from "../controller/my_puppy/puppy_create.js";
import profile from "../controller/my_puppy/puppy_profile.js";
import update from "../controller/my_puppy/puppy_update.js";
import delete_data from "../controller/my_puppy/puppy_delete.js";
import { authJWT } from '../middlewares/auth.js';
import storage from "../utils/storage.js";
import multer from "multer";

const router = express.Router();

//강아지 프로필
//GET: /api/my-puppy/
router.get('/', authJWT, profile);

//강아지 추가
//POST: /api/my-puppy/create
const upload = multer({storage: storage}); //multer 객체 생성
router.post('/create', authJWT, upload.single('profile'), create);

//강아지 정보 수정
//PUT /api/my-puppy/update
router.put('/update/:itemNumber', authJWT, update);

//강아지 정보 삭제
//DELETE: /api/my-puppy/delete
router.delete('/delete/:itemNumber', authJWT, delete_data);

export default router;