
import './App.css';
import './components/Coursecard';
import './components/Header';
import Header from './components/Header';
import Coursecard from './components/Coursecard';
import FeedbackForm from './components/FeedbackForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">

      <Header/>
      <Coursecard/>
      <FeedbackForm/>
    </div>
   
  );
}

export default App;
