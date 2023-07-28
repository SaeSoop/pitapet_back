import jwt from "jsonwebtoken";
import pool from "../config/database.js";
import { social_insert_user, social_select_user, insert_user } from "../dao/auth/signDao.js";
import { isExist } from "./check.js";
import dotenv from 'dotenv';
dotenv.config();

export const SignInSocial = async (which, params) => {

    //외부 API에서 이메일이 안들어올 경우
    if (!params) throw new error("KEY_ERROR", 400);

    //DB 사용자가 있는지 확인
    const conn = await pool.getConnection();

    const [alreadyUser] = await isExist(conn, params[0]);

    if (alreadyUser) {
        return [alreadyUser];
    } else {
        //DB 회원가입 & 사용자가 없을 경우
        if (which === 'kakao') {
            await social_insert_user(conn, [params[0], 'kakao']);
        } else if (which === 'naver') {
            await insert_user(conn, params);
        }

        const [user] = await social_select_user(conn, params[0]);
        return [jwt.sign({ user_id: user[0].user_id }, process.env.JWT_SECRET)];

    };
}
export default SignInSocial;
