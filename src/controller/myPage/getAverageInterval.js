import { getAverageInterval } from "../../dao/myPage/myPageDao.js"
import pool from "../../config/database.js";
import getAveragePostInterval from "../../utils/getInterval.js"

export const getInterval = async (req, res) => {

    //params
    const conn = await pool.getConnection();
    const userId = req.id;

    //DB
    const interval = await getAverageInterval(conn, userId);

    conn.release();

    res.status(200).json(getAveragePostInterval(interval[0]));
};

export default getInterval;
