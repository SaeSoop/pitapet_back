export const read_question = async (conn) => {
    const questionList = `select * from Question`;

    //await conn.query(puppyList_query, params);
    const [question] = await conn.query(questionList);

    return [question];
};

export const insert_question = async (conn, params) => {
    
    const questionInsert = `
        INSERT INTO Question (content)
        VALUES (?);
    `;

    //await conn.query(puppyList_query, params);
    const [newQuestion] = await conn.query(questionInsert, params);

    return [newQuestion];
};

// export const insert_question = async (conn, params) => {

//     const questionInsert = `INSERT INTO Question (content) VALUES (?)`;

//     //await conn.query(puppyList_query, params);
//     const [newQues] = await conn.query(questionInsert,"강아지와 처음 만난 날 어떤 감정을 느꼈나요?");

//     return [newQues];
// };

export const update_question = async (conn, params) => {
    
    const questionUpdate = `
        UPDATE Question
        SET content = ?
        WHERE question_id = ?;
    `;

    //await conn.query(puppyList_query, params);
    const [updatedQuestion] = await conn.query(questionUpdate, params);

    return [updatedQuestion];
};

// export const delete_question = async (conn, params) => {
    
//     const puppyDelete = `
//         delete from MyPuppy where dog_id=?
//     `;

//     //await conn.query(puppyList_query, params);
//     const result = await conn.query(puppyDelete, params);

//     return result;
// };
