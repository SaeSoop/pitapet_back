import pool from "../../config/database.js";
import bcrypt from "bcrypt";
import { redisClient, set } from "../../utils/cache.js"
import { sign, refresh } from "../../utils/authjwt.js";
import { check_user, insert_user } from "../../dao/auth/signDao.js";

export const join = async (req, res) => {
    //params
    const { email, pnumber, name, sex, birth } = req.body;
    let { password } = req.body;
    let params = [];

    try {
        const conn = await pool.getConnection();

        //이미 있는 사용자인지 확인
        const [alreadyUser] = await check_user(conn, email);

        //이미 있는 사용자일 경우
        if (alreadyUser.length > 0) {
            res.status(404).json({
                ok: false,
                msg: ' This E-mail is already taken.'
            })

            //새로운 유저 생성
        } else {
            //비밀번호 암호화
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            password = hashedPassword;

            //유저 정보 DB에 저장
            params = [email, password, pnumber, name, sex, birth];
            const [newUser] = await insert_user(conn, params);

            //토큰 발급
            const AccessToken = sign(newUser[0]);
            const RefreshToken = refresh(newUser);

            //refresh 토큰 redis에 저장
            set(newUser[0].user_id, RefreshToken);

            //respond
            return res.status(200).send({
                ok: true,
                AccessToken: AccessToken,
                RefreshToken: RefreshToken
            })
        }

        //에러 처리
    } catch (err) {
        res.status(404).send({
            ok: false,
            msg: err.message,

        })
    }
};

export default join;