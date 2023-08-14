import { insert_puppy } from "../../dao/my_puppy/myPuppyDao.js";
import pool from "../../config/database.js";
import getPropertyPath from "../../utils/getPropertyPath.js";
import multer from "multer";
import path from "path";
import storage from "../../utils/storage.js";


const upload = multer({storage: storage}); //multer 객체 생성


export const create = async (req, res) => {

    const path = req.file.path;
    const dog_image = path.replace(/\\/g, "/");    
    const { dog_name, dog_birth, dog_family, dog_breed, dog_sex, dog_ability, dog_char, dog_game, dog_snack, dog_illness } = req.body;
    const user_id = req.id;
    const params = [ dog_image, dog_name, dog_birth, dog_family, dog_breed, dog_sex, dog_ability, dog_char, dog_game, dog_snack, dog_illness, user_id];

    //params
    const conn = await pool.getConnection();

    //DB
    const [myPuppy] = await insert_puppy(conn, params);

    conn.release();
    
    res.status(200).send({
        success: true,
        msg: "강아지 추가 완료",
    });
};

export default create;
