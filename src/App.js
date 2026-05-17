import Header from "./Header";
import Footer from "./Footer";
import TopPage from "./TopPage";
import Teams from "./Teams";
import Ranking from "./Ranking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
