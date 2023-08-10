import pool from "../../config/database.js";
import { check_user } from "../../dao/auth/signDao.js";

export const isExist = async (req, res) => {

    //params
    const { email } = req.body;


    try {
        const conn = await pool.getConnection();

        //이미 있는 사용자인지 확인
        const [alreadyUser] = await check_user(conn, email);

        //사용자가 있을 경우
        if (alreadyUser.length!=0) {
            res.status(200).send({
                ok: true,
                msg: 'Already exists',
            })
        } else {
            //사용자가 없을 경우
            res.status(200).send({
                ok: false,
                msg: 'no user'
            })
        }
        //에러 처리
    } catch (err) {
        res.status(404).send({
            ok: false,
            msg: err.message,

        })
    }


}

export default isExist;