import { parseDateString, getWayBackMachineLink } from './utils.js'
export class Pagination {
  constructor() {
    this.start = 0;
    this.end = 0;
    this.offset = 10;
    this.currentPage = 0;
    this.totalPages = 0;
    this.baseURL = "";
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
    this.end = (this.timeStamps.length < this.offset)
      ? this.timeStamps.length
      : this.start + this.offset;

    this.displayedList = array.slice(this.start, this.end);

    this.listEl.innerHTML = "";

    this.displayedList.forEach((element) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      // http://web.archive.org/web/20230629030102/https://smth.idk/
      a.href = getWayBackMachineLink(element, this.baseURL);
      a.textContent = parseDateString(element);
      a.target = '_blank';
      li.appendChild(a);
      this.listEl.appendChild(li);
    });

    this.counting.innerText = `Showing ${this.start} to ${this.end} of ${this.timeStamps.length} Entries`;
    this.prevBtn.classList.toggle("disabled", this.currentPage === 0);
    this.nextBtn.classList.toggle("disabled", this.currentPage === this.totalPages - 1);
  }
}