import { postLike } from "../../dao/diary/diaryDao.js";
import { isLiked } from "../../dao/diary/diaryDao.js";
import { postLikeCancel } from "../../dao/diary/diaryDao.js";
import pool from "../../config/database.js";

export const diary_like = async (req, res) => {

    const diary_id = req.params.diary_id;
    const user_id = req.id;

    //params
    const params = [user_id, diary_id];

    // DB
    const conn = await pool.getConnection();

    console.log("diary_id", diary_id);
    console.log("user_id", user_id);

    //좋아요가 눌러져 있는지 체크
    const checkLiked = await isLiked(conn, params);

    //눌러져 있으면 취소
    if(checkLiked == true){

        console.log("cancel");
        const result = await postLikeCancel(conn, params);

        conn.release();
    
        res.status(200).send({
            ok: true,
            msg: "좋아요 취소 성공"
        });

    }else{  //안 눌러져 있으면 좋아요
        
        console.log("like!");
        const result = await postLike(conn, params);

        conn.release();
    
        res.status(200).send({
            ok: true,
            msg: "좋아요 성공"
        });
    }

    
};

export default diary_like;