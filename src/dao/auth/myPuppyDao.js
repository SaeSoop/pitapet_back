export const puppy_profile = async (conn, params) => {
    const puppyList = `select * from MyPuppy`;

    //await conn.query(puppyList_query, params);
    const [puppy] = await conn.query(puppyList, params);

    return [puppy];
}

export const insert_puppy = async (conn, params) => {
    const puppyInsert = `insert into MyPuppy set ?`;

    //await conn.query(puppyList_query, params);
    const [newPuppy] = await conn.query(puppyInsert, params);

    return [newPuppy];
}

export const update_puppy = async (conn, params) => {
    const puppyUpdate =`update MyPuppy set ? where id=?`;

    //await conn.query(puppyList_query, params);
    const [newPuppy] = await conn.query(puppyUpdate, params);

    return [newPuppy];
}
