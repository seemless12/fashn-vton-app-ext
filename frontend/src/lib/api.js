const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Server unavailable');
  return res.json();
}

export async function submitTryOn({ personImage, garmentImage, category, garmentPhotoType, mode, steps, guidanceScale }) {
  const formData = new FormData();
  formData.append('person_image', personImage);
  formData.append('garment_image', garmentImage);
  if (category) formData.append('category', category);
  formData.append('garment_photo_type', garmentPhotoType || 'model');
  formData.append('mode', mode || 'balanced');
  formData.append('steps', steps || 15);
  formData.append('guidance_scale', guidanceScale || 1.5);

  const res = await fetch(`${API_BASE}/api/try-on`, { method: 'POST', body: formData });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Server error');
  }
  return res.json();
}

export async function pollStatus(pollEndpoint, { signal, onPending } = {}) {
  const url = `${API_BASE}${pollEndpoint}`;
  while (true) {
    await new Promise(r => setTimeout(r, 800));
    if (signal?.aborted) throw new Error('Cancelled');
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error('Polling failed');

    const contentType = res.headers.get('content-type') || '';
    if (contentType.startsWith('image/')) {
      const blob = await res.blob();
      return { imageUrl: URL.createObjectURL(blob), steps: null, generationTime: null };
    }

    const data = await res.json();
    if (data.status === 'completed') {
      const imgRes = await fetch(`${API_BASE}${data.image_url}`, { signal });
      const blob = await imgRes.blob();
      return { imageUrl: URL.createObjectURL(blob), steps: data.steps, generationTime: data.generation_time };
    }
    if (data.status === 'failed') throw new Error(data.error || 'Generation failed');
    onPending?.(data);
  }
}

export async function fetchGarmentBlob(imageUrl) {
  const res = await fetch(imageUrl);
  const blob = await res.blob();
  return new File([blob], 'garment.jpg', { type: blob.type || 'image/jpeg' });
}
