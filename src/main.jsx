import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <div className="w-full max-w-full md:max-w-screen-lg px-4 mx-auto">
          <div className="mb-24 md:mb-16 ">
            <Header />
          </div>
          <App />
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
