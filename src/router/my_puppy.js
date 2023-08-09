import express from 'express';
import create from "../controller/my_puppy/puppy_create.js";
import profile from "../controller/my_puppy/puppy_profile.js";
import update from "../controller/my_puppy/puppy_update.js";

const router = express.Router();

//강아지 프로필을 띄우기 위한 라우트
//app.js에서 기본 경로에 /my-puppy를 사용하기 떄문에 /my-puppy 라우트 경로를 가짐
router.get('/', profile);

//강아지 추가를 위한 라우트
//app.js에서 기본 경로에 /my-puppy를 사용하기 떄문에 /my-puppy/insert 라우트 경로를 가짐
router.post('/create', create);

//강아지 정보 수정을 위한 라우트
//app.js에서 기본 경로에 /my-puppy를 사용하기 떄문에 /my-puppy/update-profile 라우트 경로를 가짐
router.put('/update', update);

//강아지 정보 삭제를 위한 라우트
//app.js에서 기본 경로에 /my-puppy를 사용하기 떄문에 /my-puppy/delete 라우트 경로를 가짐
// router.delete('/delete', function(req, res) {
//     res.send('/my-puppy/delete 라우트');
// });

//module.exports = router;
export default router;