const pagination = {
  start: 0,
  end: 0,
  offset: 10,
  currentPage: 0,
  totalPages: 0,
  displayedList: null,
  listEl: null,
  counting: null,
  prevBtn: null,
  nextBtn: null
};



// todo: fix this code later

document.addEventListener('DOMContentLoaded', () => {
  const errorEl = document.getElementById("error");
  pagination.listEl = document.getElementById('list');
  pagination.prevBtn = document.getElementById('prevBtn');
  pagination.nextBtn = document.getElementById('nextBtn');
  pagination.counting = document.getElementById('counting');

  chrome.storage.sync.get(['url'], async (message) => {
    const res = await fetch(`https://archive.org/wayback/available?url=${encodeURIComponent(message.url)}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.archived_snapshots.closest.available === true) {
        const AlltimeStamps = await fetch(`https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(message.url)}&output=json&fl=timestamp&limit=300`)
        if (AlltimeStamps.ok) {
          const GetAlltimeStamps = await AlltimeStamps.json();
          GetAlltimeStamps.shift();
          pagination.totalPages = GetAlltimeStamps.length;
          renderList(GetAlltimeStamps)
        }
      }
    } else {
      errorEl.innerText = `Error checking page archival status: ${res.status}`;
    }
  });
});

const renderList = (array) => {
  if (pagination.listEl == null || pagination.prevBtn == null || pagination.nextBtn == null)
    return;
  pagination.start = pagination.currentPage * pagination.offset;
  pagination.end = pagination.start + pagination.offset;
  pagination.displayedList = array.slice(pagination.start, pagination.end);

  pagination.listEl.innerHTML = '';

  pagination.displayedList.forEach(element => {
    const li = document.createElement('li');
    li.innerText = element;
    pagination.listEl.appendChild(li);
  });
  pagination.counting.innerText = `Showing ${pagination.start} to ${pagination.end} of ${pagination.totalPages} Entries  `

  pagination.prevBtn.toggle('disabled', pagination.currentPage === 0);
  pagination.nextBtn.toggle('disabled', pagination.currentPage === pagination.totalPages - 1);
}
