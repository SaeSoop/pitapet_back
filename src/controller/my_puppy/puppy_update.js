import { update_puppy } from "../../dao/my_puppy/myPuppyDao.js";
import pool from "../../config/database.js";

export const update = async(req, res) => {
    
    const dog_id = req.params.itemNumber;
    //const user_id = req.id;

    //params
    const {dog_name, dog_birth, dog_family, dog_breed, dog_sex, dog_ability, dog_char, dog_game, dog_snack, dog_illness} = req.body;
    const conn = await pool.getConnection();
    const params = [ dog_name, dog_birth, dog_family, dog_breed, dog_sex, dog_ability, dog_char, dog_game, dog_snack, dog_illness, dog_id];

    //DB
    const result = await update_puppy(conn, params);

    conn.release();
    
    res.status(200).send({
        success: true,
        msg: "강아지 정보 수정 완료",
    });
    //res.status(400).send('Bad Request');
}

export default update;