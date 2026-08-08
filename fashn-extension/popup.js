document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('api-url');
  const saveUrlBtn = document.getElementById('save-url-btn');
  const statusMsg = document.getElementById('url-status');
  const toggle = document.getElementById('enable-toggle');
  
  const photoArea = document.getElementById('photo-area');
  const fileInput = document.getElementById('file-input');
  const photoPreview = document.getElementById('photo-preview');
  const photoPlaceholder = document.getElementById('photo-placeholder');
  const changePhotoBtn = document.getElementById('change-photo-btn');

  const qualityInput = document.getElementById('inference-quality');
  const stepsValue = document.getElementById('steps-value');

  // Load existing settings
  chrome.storage.local.get(['apiUrl', 'extensionEnabled', 'personImage', 'steps'], (res) => {
    if (res.apiUrl) urlInput.value = res.apiUrl;
    if (res.extensionEnabled !== undefined) toggle.checked = res.extensionEnabled;
    if (res.steps !== undefined) {
      qualityInput.value = res.steps;
      stepsValue.textContent = res.steps;
    }
    
    if (res.personImage) {
      photoPreview.src = res.personImage;
      photoPreview.style.display = 'block';
      photoPlaceholder.style.display = 'none';
      changePhotoBtn.style.display = 'block';
    }
  });

  // Global Toggle
  toggle.addEventListener('change', (e) => {
    chrome.storage.local.set({ extensionEnabled: e.target.checked });
  });

  // Steps/Quality Change
  qualityInput.addEventListener('input', (e) => {
    const val = e.target.value;
    stepsValue.textContent = val;
    chrome.storage.local.set({ steps: parseInt(val) });
  });

  // Save API URL
  saveUrlBtn.addEventListener('click', async () => {
    let url = urlInput.value.trim();
    if (!url) {
      statusMsg.textContent = 'Please enter a URL';
      statusMsg.className = 'status-msg error';
      return;
    }
    // basic cleanup
    if (url.endsWith('/')) url = url.slice(0, -1);
    if (!url.startsWith('http')) url = 'https://' + url;
    urlInput.value = url;

    statusMsg.textContent = 'Checking connection...';
    statusMsg.className = 'status-msg';

    try {
      const res = await fetch(`${url}/health`);
      if (!res.ok) throw new Error('Not OK');
      const data = await res.json();
      
      if (data.status === 'ok') {
        chrome.storage.local.set({ apiUrl: url });
        statusMsg.textContent = 'Connected successfully!';
        statusMsg.className = 'status-msg success';
      } else {
        throw new Error('Invalid response');
      }
    } catch (e) {
      statusMsg.textContent = 'Failed to connect. Is the server running?';
      statusMsg.className = 'status-msg error';
    }
  });

  // Photo Upload
  photoArea.addEventListener('click', () => fileInput.click());
  changePhotoBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result;
      chrome.storage.local.set({ personImage: b64 });
      
      photoPreview.src = b64;
      photoPreview.style.display = 'block';
      photoPlaceholder.style.display = 'none';
      changePhotoBtn.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });
});
