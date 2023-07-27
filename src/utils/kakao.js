import axios from "axios";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";
import { check_user, kakao_insert_user } from "../dao/auth/signDao.js";
import dotenv from 'dotenv';
dotenv.config();

export const signInKakao = async (kakaoToken) => {

    const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
        }
    });

    const { data } = result;
    const email = data.kakao_account.email;

    //카카오에서 돈이 안들어올 경우
    if (!email) throw new error("KEY_ERROR", 400);

    //DB 사용자가 있는지 확인
    const conn = await pool.getConnection();
    const [user] = await check_user(conn, email);

    //DB 회원가입 & 사용자가 없을 경우
    if (!user[0]) {
        const [user] = await kakao_insert_user(conn, email);
        return [jwt.sign({ user_id: user[0].user_id }, process.env.JWT_SECRET)];
    } else {
        //이메일이 중복된 경우
        return [false];
    }

};

export default signInKakao;
