import { read_question } from "../../dao/question/questionDao.js";
import pool from "../../config/database.js";


export const read = async(req, res) => {

    //params
    const conn = await pool.getConnection();
    //const user_id = req.id;

    //DB
    const [question] = await read_question(conn);
    console.log(question);

    conn.release();

    //강아지 목록
    res.status(200).json(question);
    //res.status(400).send('Bad Request');

}

export default read;
