//유저 이메일 중복 확인 
export const check_user = async (conn, email) => {
    const checkUser_query = `SELECT email FROM User WHERE email=?;`;

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

//카카오 유저 생성
export const kakao_insert_user = async (conn, params) => {
    const insertUser_query = `INSERT INTO User (email) VALUES (?);`;
    const selectUserID_query = `SELECT user_id FROM User WHERE email = ?`

    await conn.query(insertUser_query, params);
    const [newUser] = await conn.query(selectUserID_query, params);

    return [newUser];
}