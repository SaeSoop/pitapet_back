export const create_diary = async (conn, params) => {

    const diaryCreate = `INSERT INTO Diary (diary_image, diary_title, diary_content, 
        diary_date, diary_mood, diary_isPrivate, user_id) VALUES (?,?,?,?,?,?,?)`;

    const [todayDiary] = await conn.query(diaryCreate, params);
    return [todayDiary];
};

