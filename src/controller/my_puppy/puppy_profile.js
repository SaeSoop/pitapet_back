import { puppy_profile } from "../../dao/my_puppy/myPuppyDao.js";
import pool from "../../config/database.js";


export const profile = async(req, res) => {

    //params
    const conn = await pool.getConnection();
    const user_id = req.id;

    //DB
    const [myPuppy] = await puppy_profile(conn, user_id);
    console.log(myPuppy);

    res.send(myPuppy);
}

export default profile;
