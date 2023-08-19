import multer from "multer";
import path from "path";

export const getDate = function () {

    let today = new Date();   
    
    let year = today.getFullYear();     // 년도
    let month = today.getMonth() + 1;   // 월
    let date = today.getDate();         // 날짜

    return `${year}/${month}/${date}`;
};

export default getDate;