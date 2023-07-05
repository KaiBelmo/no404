import { Pagination } from "./utils/js/pagination.js";
import { isEmpty, removeAnimation } from "./utils/js/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const loadingEl = document.getElementById('loading');
  const pagination = new Pagination();
  
  pagination.listEl = document.getElementById("list");
  pagination.prevBtn = document.getElementById("prevBtn");
  pagination.nextBtn = document.getElementById("nextBtn");
  pagination.counting = document.getElementById("counting");

  chrome.storage.sync.get(['url'], async (message) => {
    pagination.baseURL = message.url;
    loadingEl.innerText = 'checking page availability';
    const res = await fetch(`https://archive.org/wayback/available?url=${encodeURIComponent(message.url)}`)
      .catch(() => {
        removeAnimation(loadingEl);
        loadingEl.innerText = 'Failed to check page availability';
        return;
      });
    if (res.ok) {
      loadingEl.innerText = 'fetching timestamps';
      const data = await res.json();
      if (!isEmpty(data.archived_snapshots) && data.archived_snapshots.closest.available === true) {
        // If you want to limit the number of timestamps returned by the API, you can add &limit=${MaxNumber}
        const AlltimeStamps = await fetch(`https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(message.url)}&output=json&fl=timestamp`)
          .catch(() => {
            removeAnimation(loadingEl);
            loadingEl.innerText = 'Failed to fetch timestamps';
            return;
          });
        if (AlltimeStamps.ok) {
          let GetAlltimeStamps = await AlltimeStamps.json();
          console.log(GetAlltimeStamps);
          GetAlltimeStamps.shift();
          pagination.timeStamps = GetAlltimeStamps;
          pagination.totalPages = Math.ceil(GetAlltimeStamps.length / pagination.offset);
          loadingEl.parentElement.remove();
          pagination.renderList(pagination.timeStamps);
        }
      } else {
        removeAnimation(loadingEl);
        loadingEl.innerText = 'not available in archive.org';
      }
    }
  });

  pagination.prevBtn.addEventListener('click', () => {
    if (pagination.currentPage > 0) {
      pagination.currentPage--;
      pagination.renderList(pagination.timeStamps);
    }
  })
  pagination.nextBtn.addEventListener('click', () => {
    if (pagination.currentPage < pagination.totalPages - 1) {
      pagination.currentPage++;
      pagination.renderList(pagination.timeStamps);
    }
  })

});