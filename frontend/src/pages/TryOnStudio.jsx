import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Settings2, Sparkles, Image as ImageIcon, Download, Share2 } from 'lucide-react';
import useStore from '../store/useStore';
import Button from '../components/ui/Button';
import { submitTryOn, pollStatus, fetchGarmentBlob } from '../lib/api';
import { formatPrice } from '../lib/utils';

export default function TryOnStudio() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const { 
    userImage, setUserImage, 
    selectedGarment, setSelectedGarment,
    settings,
    genState, setGenState, setGenResult, setGenError, genResult, genError, resetGen
  } = useStore();

  useEffect(() => {
    // If we mount and have no selected garment, we should probably let them pick one
    // But for now, we'll just show the empty state
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File too large. Please select an image under 10MB.");
        return;
      }
      setUserImage(file);
      resetGen();
    }
  };

  const handleGenerate = async () => {
    if (!userImage || !selectedGarment) return;
    
    setGenState('generating');
    try {
      // Fetch garment image as blob first
      const garmentFile = await fetchGarmentBlob(selectedGarment.primaryImage);
      
      const { job_id, poll_endpoint } = await submitTryOn({
        personImage: userImage.file,
        garmentImage: garmentFile,
        category: settings.category || selectedGarment.category,
        garmentPhotoType: settings.garmentPhotoType,
        mode: settings.mode,
        steps: settings.steps
      });

      const result = await pollStatus(poll_endpoint, {
        onPending: () => {
          // Could update progress here
        }
      });

      setGenResult(result);
    } catch (err) {
      setGenError(err.message || 'Generation failed');
    }
  };

  const handleDownload = async () => {
    if (!genResult?.imageUrl) return;
    try {
      const a = document.createElement('a');
      a.href = genResult.imageUrl;
      a.download = `shopping-buddy-tryon-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight mb-3">Your virtual fitting room.</h1>
        <p className="text-text-secondary text-lg">Upload your photo and see how your selected garment looks on you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left: User Photo */}
        <div className="bg-surface-alt rounded-2xl p-6 border border-border flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
          {userImage ? (
            <>
              <img src={userImage.url} alt="You" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => { setUserImage(null); resetGen(); }} className="bg-white/90 backdrop-blur text-dark p-2 rounded-full hover:bg-white shadow-sm transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center w-full max-w-sm">
              <div className="w-20 h-20 bg-primary-tint text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Your Photo</h3>
              <p className="text-text-secondary mb-8">Drop your photo here or choose from your device.</p>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg,image/png,image/webp" onChange={handleFileSelect} />
              <Button size="lg" className="w-full" onClick={() => fileInputRef.current?.click()}>
                Choose Photo
              </Button>
            </div>
          )}
        </div>

        {/* Right: Selected Garment or Result */}
        <div className="bg-surface-alt rounded-2xl p-6 border border-border flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {genState === 'completed' && genResult ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 w-full h-full"
              >
                <img src={genResult.imageUrl} alt="Try On Result" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                  <Button variant="secondary" className="bg-white/90 backdrop-blur border-none shadow-lg text-dark hover:bg-white" icon={Download} onClick={handleDownload}>
                    Download
                  </Button>
                  <Button variant="secondary" className="bg-white/90 backdrop-blur border-none shadow-lg text-dark hover:bg-white" icon={Share2}>
                    Share
                  </Button>
                </div>
              </motion.div>
            ) : genState === 'generating' ? (
              <motion.div 
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center w-full h-full text-center p-8"
              >
                <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8" />
                <h3 className="text-2xl font-bold text-dark mb-2">Creating your look</h3>
                <p className="text-text-secondary">Usually takes around 7–10 seconds...</p>
              </motion.div>
            ) : selectedGarment ? (
              <motion.div 
                key="garment"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 w-full h-full flex flex-col"
              >
                <img src={selectedGarment.primaryImage} alt={selectedGarment.name} className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-2xl flex justify-between items-end">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-1">From {selectedGarment.source.replace('-', ' ')}</p>
                    <h3 className="text-xl font-bold line-clamp-1">{selectedGarment.name}</h3>
                    <p className="font-semibold text-primary-soft mt-1">{formatPrice(selectedGarment.salePrice || selectedGarment.price, selectedGarment.currency)}</p>
                  </div>
                  <Button size="sm" variant="secondary" className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20" onClick={() => { setSelectedGarment(null); resetGen(); }}>
                    Change
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty-garment"
                className="text-center w-full max-w-sm"
              >
                <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">Selected Garment</h3>
                <p className="text-text-secondary mb-8">Browse the shop to select a garment you'd like to try on.</p>
                <Button size="lg" className="w-full" onClick={() => navigate('/shop')}>
                  Browse Shop
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {genError && (
        <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-lg text-center border border-red-100">
          {genError}. Please try again.
        </div>
      )}

      {/* Action Area */}
      <div className="flex flex-col items-center justify-center max-w-md mx-auto">
        <Button 
          size="lg" 
          className="w-full h-16 text-lg shadow-xl shadow-primary/20" 
          icon={Sparkles}
          disabled={!userImage || !selectedGarment || genState === 'generating'}
          loading={genState === 'generating'}
          onClick={handleGenerate}
        >
          {genState === 'completed' ? 'Try Another Generation' : 'Generate Try-On'}
        </Button>
        
        <button className="flex items-center gap-2 text-text-muted hover:text-dark transition-colors mt-6 text-sm font-medium">
          <Settings2 className="w-4 h-4" /> Advanced Settings
        </button>
      </div>
    </div>
  );
}
