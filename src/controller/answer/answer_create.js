import { insert_answer } from "../../dao/answer/answerDao.js";
import pool from "../../config/database.js";
import getDate from "../../utils/getDate.js";
import getIndex from "../../utils/getIndex.js";

export const create = async (req, res) => {

    const {content} = req.body;

    const user_id = req.id;
    const regdate = getDate()
    const question_id = getIndex()

    const params = [content, regdate, question_id, user_id];

    const conn = await pool.getConnection();

    //DB
    const [newQuestion] = await insert_answer(conn, params);

    conn.release();
    
    res.status(200).send({
        success: true,
        msg: "답변 추가 완료",
    });
};

export default create;
