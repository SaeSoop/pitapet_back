export const checkForm = function ( year, month, date, hours, minutes, seconds ) {

    if(month < 10){
        month = "0" + month;
    }

    if(date < 10){
        date = "0" + date;
    }

    if(hours < 10){
        hours = "0" + hours;
    }

    if(minutes < 10){
        minutes = "0" + minutes;
    }

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

export default checkForm;