import "./App.css";
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { MailBox } from "./pages/MailBox"
import { Search } from "./pages/Search"
import { Navbar } from "./navigation/Navbar"
import LoginPage from "./pages/Login";
import { useEffect } from "react";
import { createSecureService } from "./services/APIServices";
import Matches from "./pages/Matches";

function App() {
  useEffect(() => {
    createSecureService();
}, []);
  return (
    <>
 <Navbar />
      <Container className="mb-4">
        <Routes>
        <Route path="/" element={<LoginPage />} />
          <Route path="/mailbox" element={<MailBox />} />
          <Route path="/search" element={<Search />} />
          <Route path="/matches" element={<Matches />} />
       

      
        </Routes>
      </Container>
    </>
  );
}

export default App;
