import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import ProjectsSection from './components/ProjectsSection';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Videos from './components/Videos';
import AgentHub from './components/AgentHub';
import AgentChat from './components/AgentChat';
import InvoiceAgent from './components/InvoiceAgent';
import AdminApp from './admin/AdminApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
<Route path="/videos" element={<Videos />} />
        <Route path="/agent" element={<AgentHub />} />
        <Route path="/agent/invoice" element={<InvoiceAgent />} />
        <Route path="/agent/:id" element={<AgentChat />} />
        <Route path="/my-admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}

export default App;
