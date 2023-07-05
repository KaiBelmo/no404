export const isEmpty =  (obj) => {
  return Object.keys(obj).length === 0;
}

export const removeAnimation = (el) => {
  Object.assign(el.style, {
    animationName: "none",
    animationDuration: "0s",
    animationTimingFunction: "none",
    animationDelay: "0s",
    animationIterationCount: "1",
    animationDirection: "normal",
    animationFillMode: "none",
    animationPlayState: "paused"
  });
}

export const parseDateString = (str) => {
  const year = str.toString().substring(0, 4);
  const month = str.toString().substring(4, 6);
  const day = str.toString().substring(6, 8);
  const hour = str.toString().substring(8, 10);
  const minute = str.toString().substring(10, 12);
  const second = str.toString().substring(12, 14);
  
  return `${year}/${month}/${day} - ${hour}:${minute}:${second}`;
}

export const getWayBackMachineLink = (date, baseUrl) => {
  return `http://web.archive.org/web/${date}/${baseUrl}`;
}