import './App.css';

import Header from './components/Header';
import Contact from './components/Contact';
import Mapping from './components/Mapping';
import Graph from './components/Graph';
import { BrowserRouter as Router, Route ,Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  const client = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={client}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Contact /> }  />
            <Route path="/map" element={<Mapping /> } />
            <Route path="/graph" element={<Graph /> } />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
