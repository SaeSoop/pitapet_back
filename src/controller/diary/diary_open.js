import { open_diary } from "../../dao/diary/diaryDao.js";
import pool from "../../config/database.js";

export const open = async (req, res) => {

    const { diary_date } = req.params;

    // params
    const params = [diary_date];
    const conn = await pool.getConnection();

    // DB
    const result = await open_diary(conn, params);
    
    conn.release();
    
    res.status(200).send({
        ok: true,
        msg: "일기 조회 성공"
    });
};

export default open;