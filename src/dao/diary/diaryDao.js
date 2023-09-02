// 일기 전체 조회 (최신순) - 제목, 작성자만
export const read_diary = async (conn) => {
    const readDiaryList = `
        SELECT Diary.diary_title, Diary.diary_date, Diary.like_count, User.name AS username
        FROM Diary 
        JOIN User ON Diary.user_id = User.user_id
        ORDER BY Diary.diary_id DESC;
    `;
    const [totalDiary] = await conn.query(readDiaryList);

    return [totalDiary];
};

// 일기 전체 조회 (최신순) - 제목, 작성자만
export const read_top5 = async (conn) => {
    const getTop5Query = `
        SELECT * FROM Diary 
        ORDER BY like_count DESC LIMIT 5;
    `;
    const [top5] = await conn.query(getTop5Query);

    return [top5];
};

export const diary_count = async (conn, params) => {

    const getDiaryCount  = `
        SELECT COUNT(*) AS diaryCount 
        FROM Diary
        WHERE user_id = ?;
    `;

    const results = await conn.query(getDiaryCount, params);
    
    const diaryCount = results[0][0].diaryCount;
    console.log("diaryCount ", diaryCount);

    return results;
};

// user_id로 작성자 찾기
export const get_nickname = async (conn, params) => {
    const getUserQuery = `
        SELECT name FROM User WHERE user_id = ?;
    `;
    const user = await conn.query(getUserQuery, params);

    return user;
};


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

// 일기 날짜 검색 쿼리
export const open_diary = async (conn, params) => {

    const diaryOpen = `
        SELECT diary_id FROM Diary WHERE diary_date = ?
    `;

    const [openedDiary] = await conn.query(diaryOpen, params);
    return [openedDiary];
};

// 좋아요 누르는 쿼리
export const postLike = async (conn, params) => {

    // // 클라이언트에서 넘어온 데이터
    // const { diary_id, user_id } = req.body;

    //const [diary_id, user_id] = params;

    const getLikeQuery  = `
        SELECT like_sum
        FROM Diary
        WHERE diary_id = ?;
    `;


    // 좋아요 누른 글/ 사용자 정보 쌍으로 저장
    const insertLikeQuery = `INSERT INTO DiaryLike (user_id, diary_id) VALUES (?,?)`;

    // 게시글 좋아요 수 업데이트
    const updateDiaryQuery = `
        UPDATE Diary SET \`like_count\` = \`like_count\` + 1 WHERE diary_id = ?;
    `;

    const [updateResult] = await conn.query(insertLikeQuery, params);

    //const {like_count} = await conn.query(getLikeQuery, diary_id);
    const [increaseResult] = await conn.query(updateDiaryQuery, params[1]);

    if (!updateResult || !increaseResult) {
        //return res.status(200).send("DB 오류");
    }else{
        //res.status(200).send("getResult");
    }
};

// 좋아요 누르는 쿼리
export const isLiked = async (conn, params) => {

    const checkLikeQuery  = `
        SELECT COUNT(*) AS likeCount 
        FROM DiaryLike
        WHERE user_id = ? AND diary_id = ?;
    `;

    const results = await conn.query(checkLikeQuery, params);
    
    const likeCount = results[0][0].likeCount;
    console.log("likeCount ", likeCount);

    if (likeCount === 0) {

        console.log('좋아요 버튼');
        return false;
    } else {
        
        console.log('좋아요 취소 버튼');
        return true;
    }
};

// 좋아요 취소 쿼리
export const postLikeCancel = async (conn, params) => {

    // column에서 삭제
    const deleteLikeQuery = `DELETE FROM DiaryLike WHERE user_id = ? AND diary_id = ?`;

    // 게시글 좋아요 수 -1
    const updateDiaryQuery = `
        UPDATE Diary SET \`like_count\` = \`like_count\` - 1 WHERE diary_id = ?;
    `;

    const [updateResult] = await conn.query(deleteLikeQuery, params);

    const [increaseResult] = await conn.query(updateDiaryQuery, params[1]);

    if (!updateResult || !increaseResult) {
        //return res.status(200).send("DB 오류");
    }else{
        //res.status(200).send("getResult");
    }
};

