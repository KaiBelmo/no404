// todo: fix this code later

document.addEventListener('DOMContentLoaded',  () => {
  const el = document.getElementById("container");
  
  chrome.storage.sync.get(['url'], async (message) => {
    const res = await fetch(`https://archive.org/wayback/available?url=${encodeURIComponent(message.url)}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.archived_snapshots.closest.available === true){
        const AlltimeStamps = await fetch(`https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(message.url)}&output=json&fl=timestamp&limit=300`)
        if (AlltimeStamps.ok) {
          const GetAlltimeStamps = await AlltimeStamps.json();
          console.log(GetAlltimeStamps)
          // GetAlltimeStamps.shift();
            // getall.forEach(element => {
              
            // });
        }
      }
    } else {
      el.innerText = `Error checking page archival status: ${res.status}`;
    }
  });
});
