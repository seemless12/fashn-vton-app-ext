import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Shirt, Image as ImageIcon, Download, RefreshCw, AlertCircle } from 'lucide-react';
import './App.css';
import LandingPage from './LandingPage';
import ExtensionInfo from './ExtensionInfo';

// Mock Shopify Data
const MOCK_PRODUCTS = [
  { id: 1, title: 'Classic White Tee', price: '$24.99', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80' },
  { id: 2, title: 'Denim Jacket', price: '$89.00', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=500&q=80' },
  { id: 3, title: 'Summer Floral Dress', price: '$59.99', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=500&q=80' },
  { id: 4, title: 'Leather Moto Jacket', price: '$199.00', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80' },
  { id: 5, title: 'Graphic Hoodie', price: '$54.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80' },
  { id: 6, title: 'Minimalist Cardigan', price: '$45.00', image: 'https://images.unsplash.com/photo-1434389678369-183423d6a20d?auto=format&fit=crop&w=500&q=80' },
  { id: 7, title: 'Silk Blouse', price: '$79.00', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=500&q=80' },
  { id: 8, title: 'Vintage Polo', price: '$34.50', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=500&q=80' },
];

const API_BASE_URL = 'http://65.0.180.137:8000'; // Raw AWS IP

const FUNNY_PHRASES = [
  "Fitting your garment...",
  "Stitching the pixels...",
  "Ironing out the wrinkles...",
  "Shirt is stuck, wait...",
  "Ooh noo, dress is cracked...",
  "Teaching the AI fashion...",
  "Adding some extra drip...",
  "Hey wait, almost there...",
  "Checking the mirror..."
];

function App() {
  const [showApp, setShowApp] = useState(false);
  const [showExtensionInfo, setShowExtensionInfo] = useState(false);
  const [activeTab, setActiveTab] = useState('shop');
  const [personImage, setPersonImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  
  // Generation State
  const [status, setStatus] = useState('idle'); // idle | generating | success | error
  const [elapsedTime, setElapsedTime] = useState(0);
  const [resultImage, setResultImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingPhrase, setLoadingPhrase] = useState(FUNNY_PHRASES[0]);
  
  // Inference Quality
  const [steps, setSteps] = useState(15);
  const [generationTime, setGenerationTime] = useState(null);

  // Handle Person Upload
  const handlePersonUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPersonImage({ file, url });
    }
  };

  // Handle Custom Garment Upload
  const handleGarmentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setGarmentImage({ file, url, isCustom: true });
    }
  };

  // Handle Mock Garment Selection
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
        if (prev % 2 === 0) {
          setLoadingPhrase(FUNNY_PHRASES[Math.floor(Math.random() * FUNNY_PHRASES.length)]);
        }
        return prev + 1;
      });
    }, 1000);

    try {
      const formData = new FormData();
      formData.append('person_image', personImage.file);
      formData.append('garment_image', garmentImage.file);
      formData.append('steps', steps);
      formData.append('guidance_scale', 1.5);

      const response = await fetch(`${API_BASE_URL}/api/try-on`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to start job');
      const { job_id, poll_endpoint } = await response.json();

      // Poll
      const pollUrl = `${API_BASE_URL}${poll_endpoint}`;
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const pollRes = await fetch(pollUrl);
        if (!pollRes.ok) throw new Error('Polling failed');
        
        const contentType = pollRes.headers.get('content-type');
        if (contentType && contentType.startsWith('image/')) {
          // Job is complete and image is returned directly!
          const blob = await pollRes.blob();
          clearInterval(timer);
          setResultImage(URL.createObjectURL(blob));
          setStatus('success');
          break;
        }

        const pollData = await pollRes.json();

        if (pollData.status === 'completed') {
          clearInterval(timer);
          setResultImage(`${API_BASE_URL}${pollData.image_url}`);
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

  if (showExtensionInfo) {
    return <ExtensionInfo onBack={() => setShowExtensionInfo(false)} />;
  }

  if (!showApp) {
    return <LandingPage onTryNow={() => setShowApp(true)} onGetExtension={() => setShowExtensionInfo(true)} />;
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header glass">
        <div className="logo-container">
          <div className="logo-mark">S</div>
          <h1>Shopping Buddy</h1>
        </div>
      </header>

      <main className="main-content">
        <div className="workspace">
          
          {/* Left Column: Person Setup & Action */}
          <section className="setup-panel">
            <div className="panel-header">
              <h2>Your Photo</h2>
              <p>Upload a clear front-facing photo</p>
            </div>
            
            <div className="upload-zone">
              {personImage ? (
                <div className="image-preview-container">
                  <img src={personImage.url} alt="Person" className="image-preview" />
                  <button className="clear-btn" onClick={() => setPersonImage(null)}>✕</button>
                </div>
              ) : (
                <label className="upload-label glass">
                  <input type="file" accept="image/*" onChange={handlePersonUpload} hidden />
                  <ImageIcon size={32} className="upload-icon" />
                  <span>Click or drag to upload</span>
                </label>
              )}
            </div>

            {/* Quality Selector */}
            <div className="quality-selector glass" style={{ marginTop: '20px', padding: '16px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>Inference Quality (Steps: {steps})</h3>
              <input 
                type="range" 
                min="10" 
                max="50" 
                step="5"
                value={steps} 
                onChange={(e) => setSteps(Number(e.target.value))}
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                <span>Fast (10)</span>
                <span>Balanced (15)</span>
                <span>High (25)</span>
                <span>Ultra (30+)</span>
              </div>
            </div>

            {/* Try On Action */}
            <div className="action-zone glass">
              <div className="selection-summary">
                <div className={`summary-item ${personImage ? 'ready' : ''}`}>
                  <div className="indicator"></div> Photo
                </div>
                <div className={`summary-item ${garmentImage ? 'ready' : ''}`}>
                  <div className="indicator"></div> Garment
                </div>
              </div>
              
              <button 
                className="try-on-btn" 
                disabled={!personImage || !garmentImage || status === 'generating'}
                onClick={handleTryOn}
              >
                {status === 'generating' ? 'Generating...' : 'Try It On'}
              </button>
            </div>
          </section>

          {/* Right Column: Garment Selection or Result */}
          <section className="content-panel">
            <AnimatePresence mode="wait">
              
              {status === 'generating' && (
                <motion.div 
                  key="generating"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="generating-view glass"
                >
                  <div className="immersive-loader">
                    <div className="glow-orb"></div>
                    <div className="glow-ring"></div>
                    <div className="glow-ring delayed"></div>
                    <motion.p
                      key={loadingPhrase}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="loading-phrase"
                    >
                      {loadingPhrase}
                    </motion.p>
                  </div>
                  <p className="hint">Powered by FASHN VTON 1.5</p>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="result-view glass"
                >
                  <img src={resultImage} alt="Try-On Result" className="result-image" />
                  {generationTime && (
                    <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      Generation Time: {generationTime}s (Steps: {steps})
                    </div>
                  )}
                  <div className="result-actions">
                    <button className="secondary-btn" onClick={() => setStatus('idle')}>
                      <RefreshCw size={18} /> Try Another
                    </button>
                    <button className="primary-btn">
                      <Download size={18} /> Download High-Res
                    </button>
                  </div>
                </motion.div>
              )}

              {status === 'idle' && (
                <motion.div 
                  key="selection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="garment-selection"
                >
                  {/* Tabs */}
                  <div className="tabs">
                    <button 
                      className={`tab ${activeTab === 'shop' ? 'active' : ''}`}
                      onClick={() => setActiveTab('shop')}
                    >
                      <Shirt size={18} /> Shop
                    </button>
                    <button 
                      className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
                      onClick={() => setActiveTab('upload')}
                    >
                      <Upload size={18} /> Upload Garment
                    </button>
                  </div>

                  <div className="tab-content glass">
                    {activeTab === 'shop' ? (
                      <div className="shop-grid">
                        {MOCK_PRODUCTS.map(product => (
                          <div 
                            key={product.id} 
                            className={`product-card ${garmentImage?.url === product.image ? 'selected' : ''}`}
                            onClick={() => selectMockGarment(product)}
                          >
                            <img src={product.image} alt={product.title} />
                            <div className="product-info">
                              <span className="title">{product.title}</span>
                              <span className="price">{product.price}</span>
                            </div>
                            {garmentImage?.url === product.image && (
                              <div className="selected-overlay">Selected</div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="upload-tab">
                        {garmentImage?.isCustom ? (
                           <div className="image-preview-container">
                           <img src={garmentImage.url} alt="Garment" className="image-preview" />
                           <button className="clear-btn" onClick={() => setGarmentImage(null)}>✕</button>
                         </div>
                        ) : (
                          <label className="upload-label">
                            <input type="file" accept="image/*" onChange={handleGarmentUpload} hidden />
                            <Upload size={48} className="upload-icon" />
                            <span>Upload custom garment</span>
                            <span className="subtitle">Supported: Tops, Bottoms, Dresses</span>
                          </label>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
