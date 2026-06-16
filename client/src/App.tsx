import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contactus from "./pages/Contactus";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Volunteering from "./pages/Volunteering";
import Sponsors from "./pages/Sponsors";
import BlogDetail from "./components/Blogdetail";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sponsordb" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/volunteering" element={<Volunteering />} />
          <Route path="/sponsors" element={<Sponsors />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
