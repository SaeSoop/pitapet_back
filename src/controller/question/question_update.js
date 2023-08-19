import { update_question } from "../../dao/question/questionDao.js";
import pool from "../../config/database.js";

export const update = async(req, res) => {
    
    const question_id = req.params.itemNumber;

    //params
    const {content} = req.body;
    const conn = await pool.getConnection();
    const params = [content, question_id];

    //DB
    const result = await update_question(conn, params);

    conn.release();
    
    res.status(200).send({
        success: true,
        msg: "질문 수정 완료",
    });
}

export default update;