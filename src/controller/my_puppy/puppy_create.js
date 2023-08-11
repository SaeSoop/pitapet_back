import { insert_puppy } from "../../dao/my_puppy/myPuppyDao.js";
import pool from "../../config/database.js";
//import { search_user } from "../../dao/my_puppy/myPuppyDao.js";


export const create = async (req, res) => {

    const { name, birth, family, breed, sex, ability, char, game, snack, illness } = req.body;
    const user_id = req.id;
    const params = [ name, birth, family, breed, sex, ability, char, game, snack, illness, user_id];

    //params
    const conn = await pool.getConnection();

    //DB
    const [myPuppy] = await insert_puppy(conn, params);

    res.status(200).json({
        ok:true
    })

}

export default create;