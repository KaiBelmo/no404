import { parseDateString } from './utils.js'
export class Pagination {
  constructor() {
    this.start = 0;
    this.end = 0;
    this.offset = 10;
    this.currentPage = 0;
    this.totalPages = 0;
    this.displayedList = null;
    this.timeStamps = null;
    this.listEl = null;
    this.counting = null;
    this.prevBtn = null;
    this.nextBtn = null;
  }
  renderList(array) {
    if (this.listEl == null || this.prevBtn == null || this.nextBtn == null)
      return;
    this.start = this.currentPage * this.offset;
    this.end = (this.totalPages <= this.offset)
      ? this.timeStamps.length
      : this.start + this.offset;

    this.displayedList = array.slice(this.start, this.end);

    this.listEl.innerHTML = "";

    this.displayedList.forEach((element) => {
      const li = document.createElement("li");
      li.innerText = parseDateString(element);
      this.listEl.appendChild(li);
    });

    this.counting.innerText = `Showing ${this.start} to ${this.end} of ${this.timeStamps.length} Entries`;
    this.prevBtn.classList.toggle("disabled", this.currentPage === 0);
    this.nextBtn.classList.toggle("disabled", this.currentPage === this.totalPages - 1);
  }
}

// http://web.archive.org/web/20230629030102/https://jsfiddle.net/
// 2023/06/29/
// 030102
// 03:01:02