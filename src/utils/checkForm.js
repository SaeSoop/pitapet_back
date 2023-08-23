export const checkForm = function ( year, month, date, hours, minutes, seconds ) {

    if(month < 10){
        month = "0" + month;
    }

    if(date < 10){
        date = "0" + date;
    }

    return `${year}-${month}-${date}`;

    // 일기 날짜 테스트 용으로 얘도 잠시 주석 처리 해둘게요 .. -수빈
    // if(hours < 10){
    //     hours = "0" + hours;
    // }

    // if(minutes < 10){
    //     minutes = "0" + minutes;
    // }

    // if(seconds < 10){
    //     seconds = "0" + seconds;
    // }

    // return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

export default checkForm;