// --- Shopify Detection ---
function isShopifyStore() {
  if (window.Shopify) return true;
  if (document.querySelector('meta[name="shopify-digital-wallet"]')) return true;
  const scripts = document.querySelectorAll('script');
  for (let s of scripts) {
    if (s.src && s.src.includes('cdn.shopify.com')) return true;
  }
  return false;
}

// --- Image Extraction ---
async function extractProductData() {
  // 1. ld+json
  const schemas = document.querySelectorAll('script[type="application/ld+json"]');
  for (let schema of schemas) {
    try {
      const data = JSON.parse(schema.textContent);
      const product = Array.isArray(data) ? data.find(d => d['@type'] === 'Product') : (data['@type'] === 'Product' ? data : null);
      if (product && product.image) {
        const imgUrl = Array.isArray(product.image) ? product.image[0] : (typeof product.image === 'string' ? product.image : product.image.url || product.image[0]);
        if (imgUrl) return { image: normalizeImageUrl(imgUrl), title: product.name || 'Product' };
      }
    } catch (e) { /* ignore parse errors */ }
  }

  // 2. Shopify JSON endpoint
  try {
    const res = await fetch(window.location.pathname + '.js');
    if (res.ok) {
      const data = await res.json();
      if (data.images && data.images.length > 0) {
        return { image: normalizeImageUrl(data.images[0]), title: data.title || 'Product' };
      }
    }
  } catch (e) { /* ignore network errors */ }

  // 3. Fallback: largest image in <main> or product container
  let largestImg = null;
  let maxArea = 0;
  const containers = document.querySelectorAll('main, [class*="product"], [id*="product"]');
  const imgs = new Set();
  containers.forEach(c => c.querySelectorAll('img').forEach(img => imgs.add(img)));
  
  if (imgs.size === 0) document.querySelectorAll('img').forEach(img => imgs.add(img));

  for (let img of imgs) {
    const area = img.clientWidth * img.clientHeight;
    if (area > maxArea && area > 40000) {
      maxArea = area;
      largestImg = img;
    }
  }

  if (largestImg && largestImg.src) {
    return { image: normalizeImageUrl(largestImg.src), title: document.title.split('-')[0].trim() || 'Product' };
  }

  return null;
}

function normalizeImageUrl(url) {
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return window.location.origin + url;
  return url;
}

// --- UI Injection ---
let fashnProductData = null;

async function init() {
  chrome.storage.local.get(['extensionEnabled'], async (res) => {
    if (res.extensionEnabled === false) return;

    if (!isShopifyStore()) return;

    fashnProductData = await extractProductData();
    if (!fashnProductData || !fashnProductData.image) return;

    injectTryOnButton();
  });
}

function injectTryOnButton() {
  if (document.getElementById('fashn-vton-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'fashn-vton-btn';
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
    Try It On
  `;
  btn.onclick = openModal;
  document.body.appendChild(btn);
}

// --- Modal UI ---
function openModal() {
  let modal = document.getElementById('fashn-modal-overlay');
  if (modal) {
    modal.style.display = 'flex';
    return;
  }

  modal = document.createElement('div');
  modal.id = 'fashn-modal-overlay';
  modal.innerHTML = `
    <div id="fashn-modal">
      <div id="fashn-modal-header">
        <h2>Shopping Buddy</h2>
        <button id="fashn-modal-close">&times;</button>
      </div>
      
      <div id="fashn-modal-setup">
        <div class="fashn-photos">
          <div class="fashn-photo-box">
            <span class="fashn-photo-label">Garment</span>
            <img src="${fashnProductData.image}" class="fashn-thumb" />
          </div>
          <div class="fashn-photo-box" id="fashn-person-box">
            <span class="fashn-photo-label">You</span>
            <div id="fashn-person-placeholder">
              <button id="fashn-upload-btn" class="fashn-btn fashn-btn-secondary fashn-btn-sm">Upload Photo</button>
              <input type="file" id="fashn-file-input" accept="image/*" hidden />
            </div>
            <img id="fashn-person-preview" class="fashn-thumb" style="display:none;" />
          </div>
        </div>

        <div class="fashn-controls">
          <label for="fashn-category">Category (Optional)</label>
          <select id="fashn-category">
            <option value="">Auto-detect</option>
            <option value="tops">Tops / T-Shirts</option>
            <option value="one-pieces">Dresses / One-Pieces</option>
            <option value="bottoms">Bottoms / Pants</option>
          </select>
        </div>

        <div id="fashn-error" class="fashn-error" style="display:none;"></div>

        <button id="fashn-generate-btn" class="fashn-btn fashn-btn-primary" disabled>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px;">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
          </svg>
          Generate Try-On
        </button>
      </div>

      <div id="fashn-modal-loading" style="display:none;">
        <div class="fashn-loader-wrap">
          <div class="fashn-loader-spinner"></div>
          <div class="fashn-loader-progress">
            <div class="fashn-loader-bar" id="fashn-progress-bar"></div>
          </div>
        </div>
        <h3 id="fashn-phrase">Fitting your garment...</h3>
        <p id="fashn-timer" class="fashn-timer">0s</p>
        <p class="fashn-hint">Powered by Shopping Buddy AI</p>
      </div>

      <div id="fashn-modal-result" style="display:none;">
        <div class="fashn-result-compare">
          <div class="fashn-compare-item">
            <span class="fashn-compare-label">Original</span>
            <img id="fashn-original-person" class="fashn-compare-img" />
          </div>
          <div class="fashn-compare-item">
            <span class="fashn-compare-label">Try-On Result</span>
            <img id="fashn-result-img" class="fashn-compare-img" />
          </div>
        </div>
        <div id="fashn-gen-stats" class="fashn-gen-stats"></div>
        <div class="fashn-result-actions">
          <button id="fashn-download-btn" class="fashn-btn fashn-btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:6px;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </button>
          <button id="fashn-reset-btn" class="fashn-btn fashn-btn-secondary">Try Another</button>
        </div>
      </div>

    </div>
  `;
  document.body.appendChild(modal);

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Event Listeners
  document.getElementById('fashn-modal-close').onclick = () => modal.style.display = 'none';
  
  const fileInput = document.getElementById('fashn-file-input');
  const uploadBtn = document.getElementById('fashn-upload-btn');
  const personPreview = document.getElementById('fashn-person-preview');
  const personPlaceholder = document.getElementById('fashn-person-placeholder');
  const generateBtn = document.getElementById('fashn-generate-btn');

  // Load existing person photo
  chrome.storage.local.get(['personImage'], (res) => {
    if (res.personImage) {
      personPreview.src = res.personImage;
      personPreview.style.display = 'block';
      personPlaceholder.style.display = 'none';
      generateBtn.disabled = false;
    }
  });

  uploadBtn.onclick = () => fileInput.click();
  
  // Allow clicking person box to re-upload
  document.getElementById('fashn-person-box').addEventListener('click', (e) => {
    if (e.target.closest('#fashn-upload-btn')) return;
    if (personPreview.style.display === 'block') fileInput.click();
  });

  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Compress image before storing to save chrome.storage space
    const reader = new FileReader();
    reader.onloadend = () => {
      compressImage(reader.result, 800, 0.85).then((compressed) => {
        chrome.storage.local.set({ personImage: compressed });
        personPreview.src = compressed;
        personPreview.style.display = 'block';
        personPlaceholder.style.display = 'none';
        generateBtn.disabled = false;
      });
    };
    reader.readAsDataURL(file);
  };

  generateBtn.onclick = startGeneration;

  document.getElementById('fashn-download-btn').onclick = () => {
    const a = document.createElement('a');
    a.href = document.getElementById('fashn-result-img').src;
    a.download = `shopping-buddy-tryon-${Date.now()}.png`;
    a.click();
  };

  document.getElementById('fashn-reset-btn').onclick = () => {
    document.getElementById('fashn-modal-result').style.display = 'none';
    document.getElementById('fashn-modal-setup').style.display = 'block';
    document.getElementById('fashn-error').style.display = 'none';
  };
}

// --- Image Compression ---
function compressImage(dataUrl, maxDim, quality) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let w = img.width, h = img.height;
      if (w > maxDim || h > maxDim) {
        const ratio = Math.min(maxDim / w, maxDim / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataUrl;
  });
}

// --- Generation Logic ---
let timerInterval = null;
let elapsedTimer = null;

const FUNNY_PHRASES = [
  "Fitting your garment...",
  "Stitching the pixels...",
  "Ironing out the wrinkles...",
  "Shirt is stuck, wait...",
  "Ooh noo, dress is cracked...",
  "Teaching the AI fashion...",
  "Adding some extra drip...",
  "Hey wait, almost there...",
  "Checking the mirror...",
  "Adjusting the fit...",
  "Making you look fire...",
  "Hold tight, styling in progress..."
];

function startGeneration() {
  const errorDiv = document.getElementById('fashn-error');
  errorDiv.style.display = 'none';
  
  document.getElementById('fashn-modal-setup').style.display = 'none';
  document.getElementById('fashn-modal-loading').style.display = 'flex';
  
  // Animated progress bar (estimate ~15s)
  const bar = document.getElementById('fashn-progress-bar');
  bar.style.width = '0%';
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += (90 - progress) * 0.04; // eases towards 90%
    bar.style.width = progress + '%';
  }, 200);

  // Elapsed timer
  const timerEl = document.getElementById('fashn-timer');
  let elapsed = 0;
  clearInterval(elapsedTimer);
  elapsedTimer = setInterval(() => {
    elapsed++;
    timerEl.textContent = elapsed + 's';
  }, 1000);

  // Rotating phrases
  const phraseEl = document.getElementById('fashn-phrase');
  phraseEl.innerText = FUNNY_PHRASES[0];
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    phraseEl.style.opacity = '0';
    setTimeout(() => {
      phraseEl.innerText = FUNNY_PHRASES[Math.floor(Math.random() * FUNNY_PHRASES.length)];
      phraseEl.style.opacity = '1';
    }, 300);
  }, 2500);

  const generationStartTime = Date.now();

  // Check health first
  chrome.runtime.sendMessage({ type: 'CHECK_HEALTH' }, (healthRes) => {
    if (healthRes.status === 'no_url') {
      clearInterval(progressInterval);
      showError('Please configure your API Server URL in the extension popup first.');
      return;
    }
    if (healthRes.status === 'error') {
      clearInterval(progressInterval);
      showError('Cannot connect to the API server. Is it running?');
      return;
    }

    // Health OK, submit job
    chrome.storage.local.get(['personImage'], (res) => {
      const payload = {
        personImage: res.personImage,
        garmentImage: fashnProductData.image,
        category: document.getElementById('fashn-category').value,
        num_timesteps: 10,
      };

      chrome.runtime.sendMessage({ type: 'SUBMIT_TRYON', data: payload }, (submitRes) => {
        if (submitRes.status === 'error') {
          clearInterval(progressInterval);
          showError(submitRes.error);
          return;
        }

        const pollEndpoint = submitRes.data.poll_endpoint;
        if (!pollEndpoint) {
          clearInterval(progressInterval);
          showError('Server did not return a poll_endpoint.');
          return;
        }

        pollStatus(pollEndpoint, progressInterval, generationStartTime);
      });
    });
  });
}

function pollStatus(pollEndpoint, progressInterval, startTime) {
  setTimeout(() => {
    chrome.runtime.sendMessage({ type: 'POLL_STATUS', pollEndpoint }, (res) => {
      if (res.status === 'completed') {
        clearInterval(progressInterval);
        const bar = document.getElementById('fashn-progress-bar');
        bar.style.width = '100%';
        const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
        setTimeout(() => showSuccess(res.imageBase64, totalTime, res.steps), 400);
      } else if (res.status === 'failed' || res.status === 'error') {
        clearInterval(progressInterval);
        showError(res.error || 'Generation failed.');
      } else {
        pollStatus(pollEndpoint, progressInterval, startTime);
      }
    });
  }, 1000);
}

function showError(msg) {
  clearInterval(timerInterval);
  clearInterval(elapsedTimer);
  document.getElementById('fashn-modal-loading').style.display = 'none';
  document.getElementById('fashn-modal-setup').style.display = 'block';
  const err = document.getElementById('fashn-error');
  err.innerText = msg;
  err.style.display = 'block';
}

function showSuccess(imgB64, totalTime, steps) {
  clearInterval(timerInterval);
  clearInterval(elapsedTimer);
  document.getElementById('fashn-modal-loading').style.display = 'none';
  document.getElementById('fashn-modal-result').style.display = 'flex';
  document.getElementById('fashn-result-img').src = imgB64;

  // Show original person photo for comparison
  chrome.storage.local.get(['personImage'], (res) => {
    if (res.personImage) {
      document.getElementById('fashn-original-person').src = res.personImage;
    }
  });

  // Show generation stats
  const statsEl = document.getElementById('fashn-gen-stats');
  if (totalTime) {
    statsEl.innerHTML = `Generated in <strong>${totalTime}s</strong>${steps ? ` · ${steps} steps` : ''}`;
    statsEl.style.display = 'block';
  }
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
