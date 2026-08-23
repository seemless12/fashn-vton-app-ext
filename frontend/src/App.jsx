import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import TryOnStudio from './pages/TryOnStudio';
import ExtensionInfo from './pages/ExtensionInfo';
// import Dashboard from './pages/Dashboard';
// import History from './pages/History';
// import Saved from './pages/Saved';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/try-on" element={<TryOnStudio />} />
        <Route path="/extension" element={<ExtensionInfo />} />
      </Routes>
    </Layout>
  );
}

export default App;
