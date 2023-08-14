import { delete_puppy } from "../../dao/my_puppy/myPuppyDao.js";
import pool from "../../config/database.js";

export const delete_data = async(req, res) => {
    
    const dog_id = req.params.itemNumber;
    const user_id = req.id;

    //params
    const conn = await pool.getConnection();

    //DB
    const result = await delete_puppy(conn, dog_id);

    conn.release();
    res.status(200).send({
        success: true,
        msg: "강아지 삭제 완료",
    });

}

export default delete_data;