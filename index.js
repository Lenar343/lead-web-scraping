window.currentRecordId = null;
window.addEventListener('load', getTitles);

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = ''; // Required for modern browsers
});

document.addEventListener('DOMContentLoaded', () => {
  updateSecondaryPrompt();
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('custom-prompt').addEventListener('change', function () {
    const dropdown = document.getElementById('dropdown');
    
    if (this.checked && document.getElementById('custom-prompt2').checked) {
      dropdown.disabled = true;                  // Disable the dropdown
      dropdown.classList.add('disabled-style');  // Add gray-out style
    } else {
      dropdown.disabled = false;                 // Enable it again
      dropdown.classList.remove('disabled-style');
    }
  });
});

async function postText() {
  const link = document.getElementById('linkInput').value;
  const name = document.getElementById('nameInput').value;
 
  const button = document.getElementById('postTextBtn');
  button.classList.add('loading');

  const timeout = setTimeout(() => {
    button.classList.remove('loading');
    alert("⚠️ This is taking longer than expected (45s). Try again later.");
  }, 45000);

  const formData = {
    link: link,
    name: name,
  }; 
  
  try {
    const response = await fetch('https://n8n.enhanced-tech.de/webhook/submit-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData })
    });

    if (response.status === 299) {

      const json = await response.json();
      console.log(json);
      const dataArray = Array.isArray(json) ? json : [json];

      clearTimeout(timeout);
      button.classList.remove('loading');
    }

  } catch (error) {
    clearTimeout(timeout);
    button.classList.remove('loading');    
    console.error('Error receiving content:', error);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ['emojis', 'cta', 'facts', 'hotTakes'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateSecondaryPrompt);
  });
  
  document.getElementById('custom-prompt2').addEventListener('change', () => {
    if (!document.getElementById('custom-prompt2').checked) {
      updateSecondaryPrompt();
    }
  });
});

[
  { "url": "https://lenyes346.app.n8n.cloud/workflow/20jTer0mQUOZCvsn", "alt": "..." },
  { "url": "http://localhost:81", "alt": "..." }
]


