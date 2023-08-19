import { read_question } from "../../dao/question/questionDao.js";
import getIndex from "../../utils/getIndex.js";
import pool from "../../config/database.js";

export const read = async(req, res) => {

    const diffDay = getIndex();

    //params
    const conn = await pool.getConnection();

    //DB
    const [question] = await read_question(conn, Number(diffDay + 1));
    console.log(question);

    conn.release();

    //질문 목록
    res.status(200).json(question);
    //res.status(400).send('Bad Request');
}

export default read;
