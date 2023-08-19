export const getDate = function() {

    let today = new Date();   

    const masTime = new Date("2023-01-01");
    const diff = today - masTime;

    const diffDay = Math.floor(diff / (1000*60*60*24));

    //console.log("diffDay",diffDay);

    return Number(diffDay + 1);
};

export default getDate;