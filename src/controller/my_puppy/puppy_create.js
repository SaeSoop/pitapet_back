import { insert_puppy } from "../../dao/my_puppy/myPuppyDao.js";
import pool from "../../config/database.js";

export const create = async (req, res) => {

    const { name, birth, family, breed, sex, ability, char, game, snack, illness } = req.body;
    const user_id = req.id;
    const params = [ name, birth, family, breed, sex, ability, char, game, snack, illness, user_id];

    //params
    const conn = await pool.getConnection();

    //DB
    const [myPuppy] = await insert_puppy(conn, params);

    conn.release();
    
    res.status(200).send({
        success: true,
        msg: "강아지 추가 완료",
    });
    //res.status(400).send('Bad Request');
};

export default create;