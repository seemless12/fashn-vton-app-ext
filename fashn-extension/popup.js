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
    const defaultApiUrl = "http://20.187.120.80:8000";
    if (res.apiUrl) {
      urlInput.value = res.apiUrl;
    } else {
      urlInput.value = defaultApiUrl;
      chrome.storage.local.set({ apiUrl: defaultApiUrl });
    }
    if (res.extensionEnabled !== undefined) toggle.checked = res.extensionEnabled;
    const defaultSteps = 15;
    if (res.steps !== undefined) {
      qualityInput.value = res.steps;
      stepsValue.textContent = res.steps;
    } else {
      qualityInput.value = defaultSteps;
      stepsValue.textContent = defaultSteps;
      chrome.storage.local.set({ steps: defaultSteps });
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
  const updateSteps = (e) => {
    const val = parseInt(e.target.value, 10);
    stepsValue.textContent = val;
    chrome.storage.local.set({ steps: val });
  };
  qualityInput.addEventListener('input', updateSteps);
  qualityInput.addEventListener('change', updateSteps);

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

  // --- Subscription & Quota Logic (PKR 500 Offer) ---
  const planBadge = document.getElementById('plan-badge');
  const creditsCount = document.getElementById('credits-count');
  const creditsBar = document.getElementById('credits-bar');
  const toggleLicenseBtn = document.getElementById('toggle-license-btn');
  const licenseWrapper = document.getElementById('license-input-wrapper');
  const activateKeyBtn = document.getElementById('activate-key-btn');
  const licenseKeyInput = document.getElementById('license-key-input');
  const licenseStatus = document.getElementById('license-status');

  function getOrCreateDeviceId() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['deviceId'], (res) => {
        if (res.deviceId) {
          resolve(res.deviceId);
        } else {
          const newId = 'dev_' + Math.random().toString(36).substring(2, 12);
          chrome.storage.local.set({ deviceId: newId }, () => resolve(newId));
        }
      });
    });
  }

  async function syncSubscription() {
    const deviceId = await getOrCreateDeviceId();
    chrome.storage.local.get(['apiUrl', 'licenseKey'], async (res) => {
      if (!res.apiUrl) return;
      try {
        const query = new URLSearchParams({ device_id: deviceId });
        if (res.licenseKey) query.append('license_key', res.licenseKey);

        const resp = await fetch(`${res.apiUrl}/api/credits/check?${query.toString()}`);
        if (!resp.ok) return;
        const data = await resp.json();

        if (planBadge && creditsCount && creditsBar) {
          planBadge.textContent = data.type === 'paid' ? 'PRO PACK' : 'FREE TRIAL';
          creditsCount.textContent = `${data.credits_remaining} / ${data.credits_total} Left`;
          const pct = Math.max(0, Math.min(100, (data.credits_remaining / data.credits_total) * 100));
          creditsBar.style.width = `${pct}%`;
          chrome.storage.local.set({ creditsRemaining: data.credits_remaining });
        }
      } catch (err) {
        console.warn('Subscription sync error:', err);
      }
    });
  }

  if (toggleLicenseBtn && licenseWrapper) {
    toggleLicenseBtn.addEventListener('click', () => {
      const isHidden = licenseWrapper.style.display === 'none';
      licenseWrapper.style.display = isHidden ? 'block' : 'none';
      if (isHidden && licenseKeyInput) licenseKeyInput.focus();
    });
  }

  if (activateKeyBtn && licenseKeyInput) {
    activateKeyBtn.addEventListener('click', async () => {
      const key = licenseKeyInput.value.trim().toUpperCase();
      if (!key) {
        licenseStatus.textContent = 'Please enter a key.';
        licenseStatus.className = 'status-msg error';
        return;
      }

      licenseStatus.textContent = 'Validating key...';
      licenseStatus.className = 'status-msg';

      // VIP Tester & Developer Redeem Codes
      const isTestCode = key === 'SB-VIP-2026' || key === 'VIP-TEST' || key.startsWith('VIP') || key.startsWith('SB-VIP') || key === 'SB-500-FREE' || key === 'TEST100';
      if (isTestCode) {
        const freshId = 'dev_' + Math.random().toString(36).substring(2, 10);
        chrome.storage.local.set({
          isVip: true,
          deviceId: freshId,
          creditsRemaining: 100
        }, () => {
          chrome.storage.local.remove(['licenseKey']);
          licenseStatus.textContent = 'Activated! 100 VIP Try-Ons Unlocked.';
          licenseStatus.className = 'status-msg success';
          if (planBadge) planBadge.textContent = 'VIP TESTER';
          if (creditsCount) creditsCount.textContent = '100 / 100 Left';
          if (creditsBar) creditsBar.style.width = '100%';
        });
        return;
      }

      const deviceId = await getOrCreateDeviceId();
      chrome.storage.local.get(['apiUrl'], async (res) => {
        if (!res.apiUrl) {
          licenseStatus.textContent = 'Set API Server URL first.';
          licenseStatus.className = 'status-msg error';
          return;
        }

        try {
          const body = new FormData();
          body.append('license_key', key);
          body.append('device_id', deviceId);

          const resp = await fetch(`${res.apiUrl}/api/license/activate`, {
            method: 'POST',
            body: body
          });
          const data = await resp.json();

          if (resp.ok && data.valid) {
            chrome.storage.local.set({ licenseKey: key });
            licenseStatus.textContent = `Activated! ${data.credits_remaining} try-ons unlocked.`;
            licenseStatus.className = 'status-msg success';
            syncSubscription();
          } else {
            licenseStatus.textContent = data.detail || 'Invalid or expired key.';
            licenseStatus.className = 'status-msg error';
          }
        } catch (e) {
          licenseStatus.textContent = 'Connection failed. Check server.';
          licenseStatus.className = 'status-msg error';
        }
      });
    });
  }

  // Initial sync
  syncSubscription();
});
