import pool from "../../config/database.js";
import { sign, refresh } from "../../utils/authjwt.js";
import bcrypt from "bcrypt";
import { redisClient } from "../../utils/cache.js";
import { auth_user } from "../../dao/auth/signDao.js";


export const login = async (req, res) => {

    //params
    const { email, password } = req.body;
    const conn = await pool.getConnection();

    //DB
    const [userInfo] = await auth_user(conn, email);

    //유저 정보가 없을 경우
    if (userInfo.length === 0) {
        return res.status(401).send({
            ok: false,
            msg: 'user does not exist'
        })
    } else {
        //유저 정보가 있을 경우 
        const user = userInfo[0];
        //비밀번호 확인
        const chk = await bcrypt.compare(password, user.pwd);

        //비밀번호 일치
        if (chk) {
            //jwt 토큰 발급
            const accessToken = sign(user);
            const refreshToken = refresh();


            redisClient.set(email, refreshToken, (error, result) => {
                if (error) {
                    console.log('Redis set error:', error);
                } else {
                    console.log('Redis set result:', result);
                }
            });
            return res.status(200).send({
                ok: true,
                AccessToken:accessToken,
                RefreshToken:refreshToken
            })
        } else {
            //비밀번호 불일치
            res.status(401).send({
                ok: false,
                msg: 'password is incorret. '
            })
        }
    }

}

export default login;