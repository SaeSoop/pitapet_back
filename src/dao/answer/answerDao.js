export const read_answer = async (conn, params) => {
    const answerList = `select * from Answer WHERE question_id=?`;

    const [answers] = await conn.query(answerList, params);

    return [answers];
};

export const insert_answer = async (conn, params) => {
    
    const answerInsert = 
        `INSERT INTO Answer (content, regdate, question_id, user_id) 
        VALUES (?,?,?,?)`;

    //await conn.query(puppyList_query, params);
    const [newAnswer] = await conn.query(answerInsert, params);

    return [newAnswer];
};