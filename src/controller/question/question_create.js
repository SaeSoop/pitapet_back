import { insert_question } from "../../dao/question/questionDao.js";
import pool from "../../config/database.js";

export const create = async (req, res) => {

    const { content } = req.body;
    const params = [content];

    const conn = await pool.getConnection();

    //DB
    const [newQuestion] = await insert_question(conn, params);

    conn.release();
    
    res.status(200).send({
        success: true,
        msg: "질문 추가 완료",
    });
};

export default create;
