import checkForm from "./checkForm.js";

export const getDate = function () {

    let today = new Date();   
    
    let year = today.getFullYear();    // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();        // 날짜

    let hours = today.getHours();      // 시
    let minutes = today.getMinutes();  // 분
    let seconds = today.getSeconds();  // 초

    return checkForm(year, month, date, hours, minutes, seconds);
};

export default getDate;