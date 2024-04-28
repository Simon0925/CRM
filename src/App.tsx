import './App.css';
import LeftBar from './layout/LeftBar/LeftBar';
import Main from './layout/Main/Main';

function App() {
  return (
    <>
      <div className='wrap-app'>
      <LeftBar />
      <Main />
      </div>
      <div id="modal-root"></div>
    </>
  
  );
}

export default App;
