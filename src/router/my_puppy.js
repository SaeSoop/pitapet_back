import express from 'express';
import query from "../mysql/index.js";
import sql from "../mysql/sql.js";

const router = express.Router();

//강아지 프로필을 띄우기 위한 라우트
//app.js에서 기본 경로에 /my-puppy를 사용하기 떄문에 /my-puppy 라우트 경로를 가짐
router.get('/', async(req, res) => {
    //res.send('내 강아지 메인 페이지');
    const puppy = await query('puppyList');
    console.log(puppy);
})

//강아지 추가를 위한 라우트
//app.js에서 기본 경로에 /my-puppy를 사용하기 떄문에 /my-puppy/insert 라우트 경로를 가짐
router.post('/create', async(req, res) => {

    // console.log(req.body.dog_id);
    // console.log(req.body.dog_image);
    // console.log(req.body.dog_name);
    // console.log(req.body.dog_birth);
    // console.log(req.body.dog_family);
    // console.log(req.body.dog_breed);
    // console.log(req.body.dog_sex);
    // console.log(req.body.dog_ability);
    // console.log(req.body.dog_char);
    // console.log(req.body.dog_game);
    // console.log(req.body.dog_snack);
    // console.log(req.body.dog_illness);
    console.log(req.body);

    const param = {
        dog_id: req.body.dog_id,
        dog_image: req.body.dog_image,
        dog_name: req.body.dog_name,
        dog_birth: req.body.dog_birth,
        dog_family: req.body.dog_family,
        dog_breed: req.body.dog_breed,
        dog_sex: req.body.dog_sex,
        dog_ability: req.body.dog_ability,
        dog_char: req.body.dog_char,
        dog_game: req.body.dog_game,
        dog_snack: req.body.dog_snack,
        dog_illness: req.body.dog_illness
    };

    console.log(param);

    const result = await query('puppyInsert', param);
    res.send(result);
});

//강아지 정보 수정을 위한 라우트
//app.js에서 기본 경로에 /my-puppy를 사용하기 떄문에 /my-puppy/update-profile 라우트 경로를 가짐
router.put('/update', function(req, res) {
    res.send('/my-puppy/update-profile 라우트');
    
});

//강아지 정보 삭제를 위한 라우트
//app.js에서 기본 경로에 /my-puppy를 사용하기 떄문에 /my-puppy/delete 라우트 경로를 가짐
// router.delete('/delete', function(req, res) {
//     res.send('/my-puppy/delete 라우트');
// });

//데이터 베이스 읽어오기
router.get('/api/my_puppy', async(req, res) => {
    const puppy = await query('puppyList');
    console.log(puppy);
    res.send('/api/my_puppy 라우트');
});

//module.exports = router;
export default router;