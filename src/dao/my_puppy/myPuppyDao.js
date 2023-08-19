export const puppy_profile = async (conn, params) => {
    const puppyList = `select * from MyPuppy WHERE user_id = ?`;

    const [puppy] = await conn.query(puppyList, params);

    return [puppy];
};

export const insert_puppy = async (conn, params) => {
    const puppyInsert = `INSERT INTO MyPuppy (dog_image, dog_name, dog_birth, dog_family, dog_breed, dog_sex, dog_ability, dog_char,
        dog_game, dog_snack, dog_illness, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

    const [newPuppy] = await conn.query(puppyInsert, params);

    return [newPuppy];
};

export const update_puppy = async (conn, params) => {
    
    const puppyUpdate = `
        UPDATE MyPuppy
        SET dog_name = ?, dog_birth = ?, dog_family = ?, dog_breed = ?, dog_sex = ?,
            dog_ability = ?, dog_char = ?, dog_game = ?, dog_snack = ?, dog_illness = ?
        WHERE dog_id = ?;
    `;

    const [updatedPuppy] = await conn.query(puppyUpdate, params);

    return [updatedPuppy];
};

export const delete_puppy = async (conn, params) => {
    
    const puppyDelete = `
        delete from MyPuppy where dog_id=?
    `;

    const result = await conn.query(puppyDelete, params);

    return result;
};
