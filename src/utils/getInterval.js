export const getAveragePostInterval = (arr) => {

  var postDates = [];

  for(let i = 0; i < arr.length; i++){
    var date = new Date(arr[i].diary_date);
    postDates.push(date);
  }
  console.log(postDates);

    if (postDates.length < 2) {
      return "-"; // 데이터가 충분하지 않을 경우
    }
    
    // 게시물 간 간격 계산
    const intervals = [];

    for (let i = 1; i < postDates.length; i++) {

        // 게시물 사이의 간격 계산
        const timeDifference = postDates[i] - postDates[i - 1];

        // 간격을 일(day)로 변환
        const daysDifference = Math.abs(timeDifference / (1000 * 60 * 60 * 24));
        intervals.push(daysDifference);
        //console.log(daysDifference);
    }

    // 평균 계산
    const sumIntervals = intervals.reduce((sum, interval) => sum + interval, 0);
    const averageInterval = sumIntervals / intervals.length;

    return averageInterval;
}

export default getAveragePostInterval;