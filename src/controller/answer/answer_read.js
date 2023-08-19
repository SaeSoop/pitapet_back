import { read_answer } from "../../dao/answer/answerDao.js";
import getIndex from "../../utils/getIndex.js";
import pool from "../../config/database.js";

export const read = async(req, res) => {

    const diffDay = getIndex();

    //params
    const conn = await pool.getConnection();

    //DB
    const [answer] = await read_answer(conn, diffDay);
    console.log(answer);

    conn.release();

    //답변 목록 목록
    res.status(200).json(answer);
    //res.status(400).send('Bad Request');
}

export default read;
