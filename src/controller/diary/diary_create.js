import { create_diary } from "../../dao/diary/diaryDao.js";
import pool from "../../config/database.js";
import multer from "multer";
import storage from "../../utils/storage.js";
const upload = multer({storage: storage});

export const create = async (req, res) => {

    // 사진 경로 request 해결해야 함
    const diary_image = "";
    const { diary_title, diary_content, diary_date, diary_mood, diary_isPrivate } = req.body;
    const user_id = req.id;
    const params = [ diary_image, diary_title, diary_content, diary_date, diary_mood, diary_isPrivate, user_id ];
    
    // params
    const conn = await pool.getConnection();

    // DB
    const [diary] = await create_diary(conn, params);

    conn.release();

    res.status(200).send({
        ok: true,
        msg: "일기 등록 완료"
    });
};

export default create;

