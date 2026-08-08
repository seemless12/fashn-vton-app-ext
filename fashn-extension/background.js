// Helper to fetch the stored API URL
async function getApiUrl() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['apiUrl', 'steps'], (result) => {
      resolve({ apiUrl: result.apiUrl || null, steps: result.steps || 15 });
    });
  });
}

// Convert base64 data URL back to Blob for FormData
async function dataUrlToBlob(dataUrl) {
  const res = await fetch(dataUrl);
  return await res.blob();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CHECK_HEALTH') {
    getApiUrl().then(({ apiUrl }) => {
      if (!apiUrl) return sendResponse({ status: 'no_url' });
      fetch(`${apiUrl}/health`)
        .then(res => res.json())
        .then(data => sendResponse({ status: 'ok', data }))
        .catch(err => sendResponse({ status: 'error', error: err.message }));
    });
    return true; // async response
  }

  if (request.type === 'SUBMIT_TRYON') {
    getApiUrl().then(async ({ apiUrl, steps }) => {
      if (!apiUrl) return sendResponse({ status: 'error', error: 'API URL not configured' });
      
      try {
        const formData = new FormData();
        
        // The person image is a data URL from local storage
        const personBlob = await dataUrlToBlob(request.data.personImage);
        formData.append('person_image', personBlob, 'person.jpg');
        
        // The garment image might be a data URL or an external URL. Let's fetch it to a Blob.
        let garmentBlob;
        try {
          garmentBlob = await dataUrlToBlob(request.data.garmentImage);
        } catch (e) {
          throw new Error('Failed to download garment image from Shopify. It might be protected by CORS.');
        }
        formData.append('garment_image', garmentBlob, 'garment.jpg');

        if (request.data.category) formData.append('category', request.data.category);
        formData.append('garment_photo_type', request.data.garment_photo_type || 'model');
        formData.append('mode', request.data.mode || 'auto');
        formData.append('steps', steps);
        formData.append('guidance_scale', request.data.guidance_scale || 1.5);
        formData.append('refine', request.data.refine || false);

        const res = await fetch(`${apiUrl}/api/try-on`, {
          method: 'POST',
          body: formData
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Server returned ${res.status}: ${errText}`);
        }

        const data = await res.json();
        sendResponse({ status: 'ok', data });
      } catch (err) {
        sendResponse({ status: 'error', error: err.message });
      }
    });
    return true;
  }

  if (request.type === 'POLL_STATUS') {
    getApiUrl().then(async ({ apiUrl }) => {
      if (!apiUrl) return sendResponse({ status: 'error', error: 'API URL not configured' });
      
      try {
        const res = await fetch(`${apiUrl}${request.pollEndpoint}`);
        if (!res.ok) throw new Error(`Poll returned ${res.status}`);
        
        const contentType = res.headers.get('Content-Type') || '';
        if (contentType.includes('image')) {
          // Success! Read as blob and convert to data URL so we can send it via message passing
          const blob = await res.blob();
          const reader = new FileReader();
          reader.onloadend = () => {
            sendResponse({ status: 'completed', imageBase64: reader.result });
          };
          reader.readAsDataURL(blob);
          return; // don't sendResponse yet
        }

        const data = await res.json();
        if (data.status === 'completed') {
          // fetch the image URL and convert to base64
          const imgRes = await fetch(`${apiUrl}${data.image_url}`);
          const blob = await imgRes.blob();
          const reader = new FileReader();
          reader.onloadend = () => {
            sendResponse({ status: 'completed', imageBase64: reader.result, generation_time: data.generation_time, steps: data.steps });
          };
          reader.readAsDataURL(blob);
          return;
        } else if (data.status === 'failed') {
          sendResponse({ status: 'failed', error: data.error });
        } else {
          // pending / processing
          sendResponse({ status: 'pending' });
        }
      } catch (err) {
        sendResponse({ status: 'error', error: err.message });
      }
    });
    return true;
  }
});
