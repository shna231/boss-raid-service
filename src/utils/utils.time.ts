export default class TimeUtils {
  /** 오늘 날짜를 string 타입으로 반환합니다. */
  static getCurrentDateString() {
    const cur = new Date();

    const year = cur.getFullYear();
    const month = cur.getMonth() + 1;
    const day = cur.getDate();

    const dateString = year + '-' + month + '-' + day;
    return dateString;
  }

  /** 오늘 날짜와 시간을 string 타입으로 반환합니다. */
  static getCurrentDatetimeString() {
    const cur = new Date();

    const year = cur.getFullYear();
    const month = num2StringWithZero(cur.getMonth() + 1);
    const day = num2StringWithZero(cur.getDate());

    const hour = num2StringWithZero(cur.getHours());
    const min = num2StringWithZero(cur.getMinutes());
    const sec = num2StringWithZero(cur.getSeconds());

    const dateString =
      year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;

    return dateString;
  }

  /** 오늘 날짜를 Date 타입으로 반환합니다. */
  static getCurrentKrDate() {
    const cur = new Date();

    const utc = cur.getTime() + cur.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

    const kr_cur = new Date(utc + KR_TIME_DIFF);

    return kr_cur;
  }
}

/** 숫자를 받아 값에 따라 0을 붙인 String으로 변환합니다. */
function num2StringWithZero(num: number) {
  if (num < 10) {
    const changedNum = '0' + num.toString();
    return changedNum;
  } else {
    return num.toString();
  }
}
