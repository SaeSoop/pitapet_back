import express from 'express';
import query from "../../mysql/index.js";
import sql from "../../mysql/sql.js";
import { insert_puppy } from "../../dao/auth/myPuppyDao.js";
import pool from "../../config/database.js";

export const create = async(req, res) => {

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

    //params
    const conn = await pool.getConnection();

    //DB
    const [myPuppy] = await insert_puppy(conn, param);

    //const result = await query('puppyInsert', param);
    res.send(result);
}

export default create;