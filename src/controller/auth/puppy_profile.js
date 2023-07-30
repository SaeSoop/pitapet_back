import query from "../../mysql/index.js";
import sql from "../../mysql/sql.js";
import { puppy_profile } from "../../dao/auth/myPuppyDao.js";
import pool from "../../config/database.js";


export const profile = async(req, res) => {
    //res.send('내 강아지 메인 페이지');
    //const puppy = await query('puppyList');

    //params
    const conn = await pool.getConnection();

    //DB
    const [myPuppy] = await puppy_profile(conn);
    console.log(myPuppy);
}

export default profile;
