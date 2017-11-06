chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request == "printSlackUserID") {
    const rows = document.querySelectorAll('.c-member');
    rows.forEach((row) => {
      let slackUserId = row.querySelector('.member_preview_link').dataset.memberId;

      let element = document.createElement('span');
      element.className = 'c-member__secondary-name c-member__secondary-name--medium ext-copy';
      element.textContent = slackUserId;
      element.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        let range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        let res = document.execCommand('copy');
        alert('Copied!')
        return false;
      });

      let targetNode = row.querySelector('.c-member__name');
      if (targetNode === null) {
        return;
      }

      if (targetNode.classList.contains('ext-appended')) {
        // do nothing
      } else {
        targetNode.appendChild(element);
        targetNode.className = 'ext-appended';
      }
    });

  } else {
    console.log("unknown request" + request)
  }

});