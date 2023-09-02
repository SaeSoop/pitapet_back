import getAveragePostInterval from "../../utils/getInterval.js";
// 
export const getAverageInterval = async (conn, params) => {
    const readDiaryCount = `
        SELECT diary_date
        FROM Diary 
        WHERE user_id = ?;
    `;
    const [DiaryCount] = await conn.query(readDiaryCount, params);

    //console.log("diary_count: ", diary_count);

    return [DiaryCount];
};

// 일기 총 개수 갖고 오기
export const diaryCount = async (conn, params) => {

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