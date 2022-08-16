// styles
import './App.css';
// components
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
// animations
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {

  AOS.init();

  return (
    <div className="pageWrapper">
      <Header />
      <main>
        <Dashboard/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
