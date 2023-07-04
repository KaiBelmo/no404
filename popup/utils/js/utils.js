export const pagination = {
  start: 0,
  end: 0,
  offset: 10,
  currentPage: 0,
  totalPages: 0,
  displayedList: null,
  listEl: null,
  counting: null,
  prevBtn: null,
  nextBtn: null,
};

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