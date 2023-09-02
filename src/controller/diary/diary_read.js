import { read_diary } from "../../dao/diary/diaryDao.js";
import { read_top5 } from "../../dao/diary/diaryDao.js";
import pool from "../../config/database.js";

export const read = async(req, res) => {

    //params
    const conn = await pool.getConnection();

    //DB
    //const [top5] = await read_top5(conn);
    const [totalDiary] = await read_diary(conn);

    //console.log(top5);
    console.log(totalDiary);

    conn.release();

    //질문 목록
    res.status(200).json(totalDiary);
}

export default read;
