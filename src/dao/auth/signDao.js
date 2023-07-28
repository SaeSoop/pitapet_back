//유저 이메일 중복 확인 
export const check_user = async (conn, email) => {
    const checkUser_query = `SELECT email,pwd FROM User WHERE email=?;`;

    const [alreadyUser] = await conn.query(checkUser_query, [email]);

    return [alreadyUser];
};

//유저 생성 
export const insert_user = async (conn, params) => {
    const insertUser_query = `INSERT INTO User (email, pwd, pnumber, name, sex, birth) VALUES (?,?,?,?,?,?);`;
    const selectUserID_query = `SELECT user_id FROM User WHERE email = ?`

    await conn.query(insertUser_query, params);
    const [newUser] = await conn.query(selectUserID_query, params[0]);

    return [newUser];
}

//유저 인증 
export const auth_user = async (conn, email) => {
    const checkUser_query = `SELECT user_id,email,pwd FROM User WHERE email=?;`;

    const [user] = await conn.query(checkUser_query, [email]);

    return [user];
};

//소셜 로그인 유저 생성
export const social_insert_user = async (conn, params) => {
    const insertUser_query = `INSERT INTO User (email,pwd) VALUES (?,?);`;

    await conn.query(insertUser_query, params);

    return;
}

//소셜 로그인 유저 아이디 가져오기
export const social_select_user = async (conn, params) => {
    const selectUserID_query = `SELECT user_id FROM User WHERE email = ?`;
    const [user] = await conn.query(selectUserID_query, params);

    return [user];
}