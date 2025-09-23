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
  document.getElementById('dropdowntitles').addEventListener('change', async function () {
    const selectedOption = this.options[this.selectedIndex];
    const selectedId = selectedOption.value;
    window.currentRecordId = selectedId;

    if (!selectedId) return;

    try {
      const response = await fetch('https://ledefnot543.app.n8n.cloud/webhook/get-latest-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedId })
      });

      if (response.status === 298) {
        const result = await response.json();

        // ✅ Always show the full original input
        const fullInput = selectedOption.title || result.Input;

        document.getElementById('textResult').value = result.Content || 'No content';
        if (!document.getElementById('lock-textInput').checked) {
          document.getElementById('textInput').value = fullInput || 'No content';
        }
        if (!document.getElementById('lock-promptInput').checked) {
          document.getElementById('promptInput').value = result.MainPrompt || 'No content';
        }
        if (!document.getElementById('lock-secondpromptInput').checked) {
          document.getElementById('secondpromptInput').value = result.SecondaryPrompt || 'No content';
        }
        console.log("Loaded:", result);
        document.getElementById('dropdowntitles').value = '__placeholder__';
      }

    } catch (error) {
      console.error('Error fetching single title:', error);
      document.getElementById('textResult').value = 'Error retrieving post.';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('dropdown').addEventListener('change', async function () {
    const selectedOption = this.options[this.selectedIndex].value;
    const isGerman = document.getElementById('germanToggle').checked;

    window.currentRecordId = '';
    document.getElementById('dropdowntitles').value = '__placeholder__';
    if (!document.getElementById('lock-promptInput').checked) {
      document.getElementById('promptInput').value = '';
    }
    const lang = isGerman ? 'de' : 'en';

    if (selectedOption === 'Business' && !document.getElementById('lock-promptInput').checked) {
      document.getElementById('promptInput').value = promptBusiness[lang];
    } else if (selectedOption === 'Narrative' && !document.getElementById('lock-promptInput').checked) {
      document.getElementById('promptInput').value = promptNarrative[lang];
    } else if (selectedOption === 'Business10' && !document.getElementById('lock-promptInput').checked) {
      document.getElementById('promptInput').value = promptBusiness10[lang];
    } else if (selectedOption === 'Wehelpyou' && !document.getElementById('lock-promptInput').checked) {
      document.getElementById('promptInput').value = promptWehelpyou[lang];
    }
  });
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
    const response = await fetch('https://ledefnot543.app.n8n.cloud/webhook/generate-from-text', {
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
