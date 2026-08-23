import { create } from 'zustand';

const useStore = create((set, get) => ({
  // User photo
  userImage: null,
  setUserImage: (file) => {
    const prev = get().userImage;
    if (prev?.url) URL.revokeObjectURL(prev.url);
    if (!file) return set({ userImage: null });
    const url = URL.createObjectURL(file);
    set({ userImage: { file, url } });
  },

  // Selected garment
  selectedGarment: null,
  setSelectedGarment: (product) => set({ selectedGarment: product }),

  // Try-on settings
  settings: { category: '', garmentPhotoType: 'model', mode: 'balanced', steps: 15 },
  updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),

  // Generation state
  genState: 'idle',
  genResult: null,
  genError: null,
  setGenState: (genState) => set({ genState }),
  setGenResult: (genResult) => set({ genResult, genState: 'completed' }),
  setGenError: (genError) => set({ genError, genState: 'error' }),
  resetGen: () => {
    const prev = get().genResult;
    if (prev?.imageUrl) URL.revokeObjectURL(prev.imageUrl);
    set({ genState: 'idle', genResult: null, genError: null });
  },

  // History
  history: [],
  addToHistory: (entry) => set((s) => ({ history: [entry, ...s.history].slice(0, 50) })),

  // Saved looks
  savedLooks: [],
  saveLook: (look) => set((s) => {
    if (s.savedLooks.find(l => l.id === look.id)) return s;
    return { savedLooks: [look, ...s.savedLooks] };
  }),
  removeSavedLook: (id) => set((s) => ({ savedLooks: s.savedLooks.filter(l => l.id !== id) })),
}));

export default useStore;
