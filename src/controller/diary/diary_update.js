import { update_diary } from "../../dao/diary/diaryDao.js";
import pool from "../../config/database.js";

export const update = async (req, res) => {

    const diary_id = req.params.itemNumber;

    const path = req.file.path;
    const diary_image = path.replace(/\\/g, "/"); 

    // params
    const { diary_title, diary_content, diary_mood, diary_isPrivate } = req.body;
    const conn = await pool.getConnection();
    const params = [ diary_image, diary_title, diary_content, diary_mood, diary_isPrivate, diary_id];

    // DB
    const result = await update_diary(conn, params);

    conn.release();

    res.status(200).send({
        ok: true,
        msg: "일기 수정 완료"
    });
};

export default update;