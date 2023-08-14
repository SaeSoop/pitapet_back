import { puppy_profile } from "../../dao/my_puppy/myPuppyDao.js";
import pool from "../../config/database.js";


export const profile = async(req, res) => {

    //params
    const conn = await pool.getConnection();
    const user_id = req.id;

    //DB
    const [myPuppy] = await puppy_profile(conn, user_id);
    console.log(myPuppy);

    conn.release();

    //강아지 목록
    res.status(200).json(myPuppy);
    //res.status(400).send('Bad Request');

}

export default profile;
