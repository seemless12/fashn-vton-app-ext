import { useState } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import ExtensionInfo from './ExtensionInfo';

const MOCK_PRODUCTS = [
  { id: 1, title: 'Classic White Tee', price: '$24.99', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80' },
  { id: 2, title: 'Denim Jacket', price: '$89.00', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=500&q=80' },
  { id: 3, title: 'Summer Floral Dress', price: '$59.99', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=500&q=80' },
  { id: 4, title: 'Leather Moto Jacket', price: '$199.00', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80' }
];

// Use relative path in production (Vercel) to leverage vercel.json rewrites and avoid Mixed Content (HTTPS -> HTTP) errors.
// Use direct IP in development.
const API_BASE_URL = import.meta.env.PROD ? '' : 'http://3.108.228.67:8000'; 
const FUNNY_PHRASES = ["Fitting your garment...", "Stitching the pixels...", "Ironing out the wrinkles...", "Teaching the AI fashion..."];

function App() {
  const [showApp, setShowApp] = useState(false);
  const [showExtensionInfo, setShowExtensionInfo] = useState(false);
  const [personImage, setPersonImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  
  const [status, setStatus] = useState('idle'); 
  const [elapsedTime, setElapsedTime] = useState(0);
  const [resultImage, setResultImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingPhrase, setLoadingPhrase] = useState(FUNNY_PHRASES[0]);
  
  const [steps, setSteps] = useState(15);
  const [generationTime, setGenerationTime] = useState(null);

  const handlePersonUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPersonImage({ file, url });
    }
  };

  const handleGarmentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setGarmentImage({ file, url, isCustom: true });
    }
  };

  const selectMockGarment = async (product) => {
    try {
      const response = await fetch(product.image);
      const blob = await response.blob();
      const file = new File([blob], 'garment.jpg', { type: 'image/jpeg' });
      setGarmentImage({ file, url: product.image, isCustom: false });
    } catch (error) {
      console.error('Failed to load mock image', error);
    }
  };

  const handleTryOn = async () => {
    if (!personImage || !garmentImage) return;
    setStatus('generating');
    setElapsedTime(0);
    setErrorMessage('');
    
    const timer = setInterval(() => {
      setElapsedTime(prev => {
        if (prev % 2 === 0) setLoadingPhrase(FUNNY_PHRASES[Math.floor(Math.random() * FUNNY_PHRASES.length)]);
        return prev + 1;
      });
    }, 1000);

    try {
      const formData = new FormData();
      formData.append('person_image', personImage.file);
      formData.append('garment_image', garmentImage.file);
      formData.append('steps', steps);
      formData.append('guidance_scale', 1.5);

      const response = await fetch(`${API_BASE_URL}/api/try-on`, { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Failed to start job');
      const { job_id, poll_endpoint } = await response.json();

      const pollUrl = `${API_BASE_URL}${poll_endpoint}`;
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const pollRes = await fetch(pollUrl);
        if (!pollRes.ok) throw new Error('Polling failed');
        
        const contentType = pollRes.headers.get('content-type');
        if (contentType && contentType.startsWith('image/')) {
          const blob = await pollRes.blob();
          clearInterval(timer);
          setResultImage(URL.createObjectURL(blob));
          setStatus('success');
          break;
        }

        const pollData = await pollRes.json();
        if (pollData.status === 'completed') {
          clearInterval(timer);
          // Fetch the image as a blob to avoid Mixed Content / proxy issues
          const imgRes = await fetch(`${API_BASE_URL}${pollData.image_url}`);
          const imgBlob = await imgRes.blob();
          setResultImage(URL.createObjectURL(imgBlob));
          setGenerationTime(pollData.generation_time);
          setStatus('success');
          break;
        } else if (pollData.status === 'failed') {
          throw new Error(pollData.error || 'Generation failed');
        }
      }
    } catch (error) {
      clearInterval(timer);
      console.error(error);
      setErrorMessage(error.message);
      setStatus('idle');
      setGenerationTime(null);
      alert('Generation failed: ' + error.message);
    }
  };

  if (showExtensionInfo) return <ExtensionInfo onBack={() => setShowExtensionInfo(false)} />;
  if (!showApp) return <LandingPage onTryNow={() => setShowApp(true)} onGetExtension={() => setShowExtensionInfo(true)} />;

  return (
    <div className="min-h-screen relative overflow-x-hidden pt-24 pb-32" style={{backgroundColor: '#05050a', color: '#d4e4fa', fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
      
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/40 dark:bg-surface/40 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-indigo-500/15">
        <div className="flex justify-between items-center px-gutter h-16 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors p-2 rounded-full active:scale-95 transition-transform">
            <span className="material-symbols-outlined font-headline-sm text-headline-sm" style={{color: '#d4e4fa'}} onClick={() => setShowApp(false)}>arrow_back</span>
          </div>
          <div className="font-display-lg-mobile text-[24px] md:text-[32px] font-extrabold bg-gradient-to-br from-primary to-tertiary bg-clip-text text-transparent">
            Shopping Buddy
          </div>
          <button className="p-2 rounded-full text-primary dark:text-primary-fixed-dim hover:bg-white/10 transition-colors active:scale-95 transition-transform">
            <span className="material-symbols-outlined font-headline-sm text-[24px]">notifications</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="w-full max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
        
        {/* Section 1: Your Style Canvas */}
        <section className="col-span-1 md:col-span-8 glass-panel rounded-xl p-6 flex flex-col gap-6">
          <h2 className="font-headline-md text-[32px] font-bold text-primary">Your Style Canvas</h2>
          
          <div className="w-full h-96 relative flex items-center justify-center overflow-hidden rounded-xl">
            {status === 'generating' ? (
              <div className="w-full h-full flex flex-col items-center justify-center glass-panel rounded-xl">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-[20px] font-semibold text-white animate-pulse">{loadingPhrase}</p>
                <p className="text-gray-400 mt-2">Powered by FASHN VTON AI</p>
              </div>
            ) : status === 'success' ? (
              <div className="w-full h-full relative">
                <img src={resultImage} className="w-full h-full object-contain" alt="Result" />
                <button onClick={() => setStatus('idle')} className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-white/20 transition">Reset</button>
              </div>
            ) : (
              <label className="drag-zone w-full h-full flex flex-col items-center justify-center cursor-pointer group">
                <input type="file" accept="image/*" onChange={handlePersonUpload} hidden />
                {personImage ? (
                  <img src={personImage.url} className="w-full h-full object-cover opacity-80" alt="Person" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-tertiary" style={{fontSize: '48px'}}>upload_file</span>
                    <p className="font-body-lg text-[18px] text-on-surface mt-4">Upload your photo here</p>
                    <p className="font-body-md text-[16px] text-on-surface-variant mt-2">High-res, full body shots work best</p>
                  </>
                )}
              </label>
            )}
          </div>
        </section>

        {/* Section 2: AI Wardrobe & Action */}
        <section className="col-span-1 md:col-span-4 flex flex-col gap-6">
          <div className="glass-panel rounded-xl p-6 flex-grow flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <h2 className="font-headline-sm text-[24px] font-semibold text-primary">AI Wardrobe</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Custom Upload Tile */}
              <label className="relative group cursor-pointer rounded-lg overflow-hidden glass-panel p-1 flex items-center justify-center flex-col min-h-[128px]">
                <input type="file" accept="image/*" onChange={handleGarmentUpload} hidden />
                {garmentImage?.isCustom ? (
                  <div className={`w-full h-full relative ${garmentImage?.isCustom ? 'ring-2 ring-indigo-500' : ''}`}>
                     <img src={garmentImage.url} className="w-full h-32 object-cover rounded-md" alt="Custom Garment" />
                     <div className="absolute top-2 left-2 bg-indigo-600/80 backdrop-blur-md px-2 py-1 rounded-full font-label-caps text-[10px] text-white font-bold tracking-wider">Custom</div>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-on-surface-variant font-headline-md text-[32px] group-hover:text-tertiary transition-colors">add</span>
                    <span className="text-[12px] text-on-surface-variant mt-2">Upload Custom</span>
                  </>
                )}
              </label>

              {MOCK_PRODUCTS.map((product) => (
                <div key={product.id} className={`relative group cursor-pointer rounded-lg overflow-hidden glass-panel p-1 ${garmentImage?.url === product.image && !garmentImage?.isCustom ? 'ring-2 ring-indigo-500' : ''}`} onClick={() => selectMockGarment(product)}>
                  <img className="w-full h-32 object-cover rounded-md group-hover:scale-105 transition-transform duration-500" src={product.image} alt={product.title} />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full font-label-caps text-[10px] text-white font-bold tracking-wider">{product.title.split(' ')[0]}</div>
                </div>
              ))}
            </div>

            {/* Quality Setting */}
            <div className="mt-4 pt-4 border-t border-white/10">
               <h3 className="text-[14px] text-gray-400 mb-2">Inference Quality (Steps: {steps})</h3>
               <input type="range" min="10" max="50" step="5" value={steps} onChange={(e) => setSteps(Number(e.target.value))} className="w-full accent-indigo-500" />
            </div>
          </div>

          <button 
            disabled={!personImage || !garmentImage || status === 'generating'}
            onClick={handleTryOn}
            className="btn-glow w-full py-4 rounded-xl flex items-center justify-center gap-2 font-headline-sm text-[20px] font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
            <span className="material-symbols-outlined">auto_fix_high</span>
            {status === 'generating' ? 'Generating...' : 'Try It On'}
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
