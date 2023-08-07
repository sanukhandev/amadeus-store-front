import './App.css'
import './index.css'
import Header from "./components/Shared/Header.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home.tsx";
function App() {
  return (
      <Router>
          <Header />
          <div className="container mx-auto bg-primary-50">
              <Routes>
                  <Route path="/" element={<Home />} />
                  {/*<Route path="/about" element={<About />} />*/}
              </Routes>
          </div>
      </Router>
  );
}

export default App;
