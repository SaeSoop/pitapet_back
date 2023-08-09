import express from 'express';
import query from "../../mysql/index.js";
import sql from "../../mysql/sql.js";
import { insert_puppy } from "../../dao/my_puppy/myPuppyDao.js";
import pool from "../../config/database.js";
import { sign, refresh } from "../../utils/authjwt.js";
import bcrypt from "bcrypt";
//import { search_user } from "../../dao/my_puppy/myPuppyDao.js";


export const create = async(req, res) => {

    //params
    const conn = await pool.getConnection();

    //DB
    const [userInfo] = await search_user(conn, email);

    //유저 정보가 있을 경우  -> id 갖고 오기
    const user = userInfo[0];

    // //jwt 토큰 발급
    // const accessToken = sign(user);
    // const refreshToken = refresh();

    // console.log(accessToken);
    // console.log(refreshToken);


    redisClient.set(email, refreshToken, (error, result) => {
        if (error) {
            console.log('Redis set error:', error);
        } else {
            console.log('Redis set result:', result);
        }
    });

    console.log(req.body);

    // const param = {
    //     dog_id: req.body.dog_id,
    //     dog_image: req.body.dog_image,
    //     dog_name: req.body.dog_name,
    //     dog_birth: req.body.dog_birth,
    //     dog_family: req.body.dog_family,
    //     dog_breed: req.body.dog_breed,
    //     dog_sex: req.body.dog_sex,
    //     dog_ability: req.body.dog_ability,
    //     dog_char: req.body.dog_char,
    //     dog_game: req.body.dog_game,
    //     dog_snack: req.body.dog_snack,
    //     dog_illness: req.body.dog_illness
    // };

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
        dog_illness: req.body.dog_illness,
        user_id: req.body.user_id
    };

    console.log(param);

    

    //DB
    const [myPuppy] = await insert_puppy(conn, param);

    //const result = await query('puppyInsert', param);
    res.send(result);
}

export default create;