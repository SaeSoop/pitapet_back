import express from "express";
import create from "../controller/diary/diary_create.js";
import read from "../controller/diary/diary_read.js";
import update from "../controller/diary/diary_update.js";
import open from "../controller/diary/diary_open.js";
import like from "../controller/diary/diary_like.js";
import { authJWT } from '../middlewares/auth.js';
import storage from "../utils/storage.js";
import multer from "multer";
const router = express.Router();

//읽기 전체 읽어오기
router.get('/read', read);

// 일기 등록하기
// POST: /api/diary/create
const upload = multer({storage: storage}); 
router.post('/create', authJWT, upload.single('photo'), create);

// 일기 수정하기
// PUT /api/diary/update
router.put('/update/:itemNumber', authJWT, upload.single('photo'), update);

// 날짜별 일기 조회하기 
// GET /api/diary/open
router.get('/open/:diary_date', authJWT, open);

// 좋아요 누르기
// GET /api/diary/open
router.post('/:diary_id/likes', authJWT, like);

export default router;