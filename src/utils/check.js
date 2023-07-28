import { check_user } from "../dao/auth/signDao.js";

export const isExist = async (conn,email) => {

    //이미 있는 사용자인지 확인
    const [alreadyUser] = await check_user(conn, email);

    //이미 있는 사용자일 경우
    if (alreadyUser.length > 0) {
        if (alreadyUser[0].pwd == 'kakao') {
            return ['kakao'];
        } else if (alreadyUser[0].pwd == 'naver') {
            return ['naver'];
        } else {
            return ['common'];
        }
    }else{
        return [false];
    }
}