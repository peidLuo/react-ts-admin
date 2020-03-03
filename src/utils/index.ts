import dayjs from 'dayjs';

const randomElement = (arr = []) => arr[Math.floor(Math.random() * arr.length)];

const kebab = (str: string) =>
  (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

interface FsDocumentElement extends HTMLElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullScreen?: () => void;
  webkitFullscreenElement?: () => void;
}
interface FsDocument extends HTMLDocument {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitFullscreenElement?: () => void;
}

const toggleFullScreen = () => {
  const doc: FsDocument = window.document;
  const docEl: FsDocumentElement = doc.documentElement;

  const requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  const cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
};

/**
 * @param {string} url
 * @returns {Object}
 */
// export function param2Obj(url) {
//   const search = url.split('?')[1];
//   if (!search) {
//     return {};
//   }
//   return JSON.parse(
//     `{"${decodeURIComponent(search)
//       .replace(/"/g, '\\"')
//       .replace(/&/g, '","')
//       .replace(/=/g, '":"')
//       .replace(/\+/g, ' ')}"}`
//   );
// }

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
const dateFormat = (date: Date, fmt: string) => {
  // author: meizz
  interface TempInfo {
    [key: string]: number;
  }
  const o: TempInfo = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  /* eslint-disable */
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  for (const k in o)
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? `${o[k]}` : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  return fmt;
};
// 根据模式日期和时间段生成对应的class_detail
const getClassDetail = ({
  class_start_date,
  class_end_date,
  class_begin_time,
  class_end_time,
  class_mode,
  class_room_id,
  holidayDateParam = [],
  class_periodic
}: {
  class_start_date: string;
  class_end_date: string;
  class_begin_time: string;
  class_end_time: string;
  class_mode: number;
  class_room_id: string;
  holidayDateParam: string[];
  class_periodic: string[];
}) => {
  // 连续模式
  let arr = [];
  if (Number(class_mode) === 1) {
    const days = dayjs(class_end_date).diff(dayjs(class_start_date), 'day');
    for (let index = 0; index <= days; index++) {
      const day = dayjs(class_start_date)
        .add(index, 'd')
        .format('YYYY-MM-DD');
      arr.push({
        class_room_id,
        class_start_time: `${day} ${class_begin_time}:00`,
        class_end_time: `${day} ${class_end_time}:00`
      });
    }
  }
  // 周期模式
  if (Number(class_mode) === 2) {
    const days = dayjs(class_end_date).diff(dayjs(class_start_date), 'day');
    for (let index = 0; index <= days; index++) {
      const day = dayjs(class_start_date).add(index, 'd');
      if (class_periodic.includes(`${day.day()}`)) {
        arr.push({
          class_room_id,
          class_start_time: `${day.format(
            'YYYY-MM-DD'
          )} ${class_begin_time}:00`,
          class_end_time: `${day.format('YYYY-MM-DD')} ${class_end_time}:00`
        });
      }
    }
  }
  // 自定义模式
  if (Number(class_mode) === 3) {
    arr.push({
      class_room_id,
      class_start_time: `${class_start_date} ${class_begin_time}:00`,
      class_end_time: `${class_start_date} ${class_end_time}:00`
    });
  } else {
    // 过滤假期
    arr = arr.filter(
      item =>
        !holidayDateParam.includes(
          dayjs(item.class_start_time).format('YYYY-MM-DD')
        )
    );
  }
  return {
    class_detail: arr
  };
};

// 反向计算用于展示
const setClassDetail = ({
  class_mode,
  class_detail
}: {
  class_mode: number;
  class_detail: ClassDetail[];
}) => {
  let class_start_date,
    class_end_date,
    class_begin_time,
    class_end_time,
    class_periodic: string[] = [],
    class_room_id,
    class_room_name;
  const len = class_detail.length;
  if (len === 0) return {};
  const mStartDay = dayjs(class_detail[0].class_start_time);
  const mEndDay = dayjs(class_detail[len - 1].class_end_time);
  if (class_mode === 1 || class_mode === 2) {
    class_start_date = mStartDay.format('YYYY-MM-DD');
    class_end_date = mEndDay.format('YYYY-MM-DD');
    class_begin_time = mStartDay.format('HH:mm');
    class_end_time = mEndDay.format('HH:mm');
  }
  // 连续模式
  if (class_mode === 1) {
    class_room_id = class_detail[0].class_room_id;
    class_room_name = class_detail[0].name;
    return {
      class_date: [class_start_date, class_end_date],
      class_time: [class_begin_time, class_end_time],
      class_mode,
      class_room_id,
      class_periodic,
      class_room_name
    };
  }
  // 周期模式
  if (class_mode === 2) {
    class_detail.find(item => {
      const weekday = dayjs(item.class_start_time).day();
      if (!class_periodic[weekday]) {
        class_periodic[weekday] = `${weekday}`;
        return false;
      }
      return true;
    });
    class_periodic = class_periodic.map((item, index) => item && `${index}`);
    class_room_name = class_detail[0].name;
    return {
      class_date: [class_start_date, class_end_date],
      class_time: [class_begin_time, class_end_time],
      class_mode,
      class_room_id,
      class_periodic,
      class_room_name
    };
  }
  // 自定义模式
  if (class_mode === 3) {
    interface tempObj {
      [key: string]: ClassDetail;
    }
    const tmp: tempObj = {};
    class_detail.map(item => {
      const start = dayjs(item.class_start_time);
      const end = dayjs(item.class_end_time);
      tmp[start.format('YYYY-MM-DD')] = {
        class_begin_time: start.format('HH:mm'),
        class_end_time: end.format('HH:mm'),
        class_room_id: item.class_room_id,
        class_room_name: item.name,
        class_mode
      };
    });
    return tmp;
  }
};
export default {
  randomElement,
  toggleFullScreen,
  kebab,
  dateFormat,
  getClassDetail,
  setClassDetail
};
