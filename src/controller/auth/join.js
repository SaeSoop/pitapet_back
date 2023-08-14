import pool from "../../config/database.js";
import bcrypt from "bcrypt";
import { set } from "../../utils/cache.js"
import { sign, refresh } from "../../utils/authjwt.js";
import { insert_user } from "../../dao/auth/signDao.js";

export const join = async (req, res) => {

    //params
    const { email, pnumber, name, sex, birth } = req.body;
    let { password } = req.body;
    let params = [];

    try {
        const conn = await pool.getConnection();

        //비밀번호 암호화
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        password = hashedPassword;

        //유저 정보 DB에 저장
        params = [email, password, pnumber, name, sex, birth];
        const [newUser] = await insert_user(conn, params);

        conn.release();

        //토큰 발급
        const AccessToken = sign(newUser[0]);
        const RefreshToken = refresh(newUser);

        //refresh 토큰 redis에 저장
        set(newUser[0].user_id, RefreshToken);

        //respond
        res.status(200).send({
            ok: true,
            AccessToken: AccessToken,
            RefreshToken: RefreshToken
        })

    }//에러 처리
    catch (err) {
        res.status(404).send({
            ok: false,
            msg: err.message,

        })
    }
}

export default join;