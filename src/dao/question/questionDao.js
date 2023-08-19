export const read_question = async (conn, params) => {
    const questionList = `select * from Question WHERE question_id=?`;

    const [question] = await conn.query(questionList, params);

    return [question];
};

export const insert_question = async (conn, params) => {
    
    const questionInsert = `
        INSERT INTO Question (content)
        VALUES (?);
    `;

    const [newQuestion] = await conn.query(questionInsert, params);

    return [newQuestion];
};

export const update_question = async (conn, params) => {
    
    const questionUpdate = `
        UPDATE Question
        SET content = ?
        WHERE question_id = ?;
    `;

    const [updatedQuestion] = await conn.query(questionUpdate, params);

    return [updatedQuestion];
};