import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./lib/apollo-client";
import { Facilities } from "./pages/Facilities";
import { AreaFacilities } from "./pages/AreaFacilities";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { CookieBanner } from "./components/CookieBanner";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Facilities />} />
              <Route path="/area/:id" element={<AreaFacilities />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
