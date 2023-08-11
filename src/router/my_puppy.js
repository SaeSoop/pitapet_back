import express from 'express';
import create from "../controller/my_puppy/puppy_create.js";
import profile from "../controller/my_puppy/puppy_profile.js";
import update from "../controller/my_puppy/puppy_update.js";
import { authJWT } from '../middlewares/auth.js';

const router = express.Router();

//강아지 프로필
//GET: /api/my-puppy/
router.get('/', authJWT, profile);

//강아지 추가
//POST: /api/my-puppy/create
router.post('/create', authJWT, create);

//강아지 정보 수정
//PUT /api/my-puppy/update
router.put('/update/:itemNumber', authJWT, update);

//강아지 정보 삭제
//DELETE: /api/my-puppy/delete
// router.delete('/delete', function(req, res) {
//     res.send('/my-puppy/delete 라우트');
// });

export default router;