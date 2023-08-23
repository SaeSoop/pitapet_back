// 일기 등록 퀴리
export const create_diary = async (conn, params) => {

    const diaryCreate = `INSERT INTO Diary (diary_image, diary_title, diary_content, 
        diary_date, diary_mood, diary_isPrivate, user_id) VALUES (?,?,?,?,?,?,?)`;

    const [todayDiary] = await conn.query(diaryCreate, params);
    return [todayDiary];
};

// 일기 수정 쿼리
export const update_diary = async (conn, params) => {

    const diaryUpdate = `
        UPDATE Diary 
        SET diary_image = ?, diary_title = ?, 
            diary_content = ?, diary_mood = ?, diary_isPrivate = ? 
        WHERE diary_id = ?;
    `;
    
    const [updatedDiary] = await conn.query(diaryUpdate, params);
    return [updatedDiary];
};

// 일기 조회 쿼리
export const open_diary = async (conn, params) => {

    const diaryOpen = `
        SELECT diary_id FROM Diary WHERE diary_date = ?
    `;

    const [openedDiary] = await conn.query(diaryOpen, params);
    return [openedDiary];
};