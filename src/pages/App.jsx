import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <HelmetProvider>
      <Router>
        {/* ...existing code... */}
      </Router>
    </HelmetProvider>
  );
}

export default App;