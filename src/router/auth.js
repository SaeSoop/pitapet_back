import express from "express";
import join from "../controller/auth/join.js"
import refresh from "../controller/auth/refresh.js"
import login from "../controller/auth/login.js"
import kakao from "../controller/auth/kakao.js"

export const router = express.Router();


//POST /api/user/login
router.post('/login', login);

//POST /api/user/join
router.post('/join',join);

//GET /api/user/refresh
router.get('/refresh',refresh);

//POST /api/user/kakao
router.post('/kakao',kakao);

export default router;