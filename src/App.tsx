import { useEffect, useState } from 'react'
import './App.css';
import LeftBar from './layout/LeftBar/LeftBar';
import Main from './layout/Main/Main';
import LogIn from './component/LogIn/LogIn';
import { useDispatch as useReduxDispatch, useSelector } from 'react-redux';
import { RootState} from './store/store';

import { useDispatch } from 'react-redux';
import { login } from './store/auth.slice';

import tokenVarification from './tokenVarification'

function App() {

  const auth = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch()

  const [isLogin, setIsLogin] = useState(false);



  useEffect(() =>{
    setIsLogin(auth.loggedIn)
  },[auth])
 
  useEffect(() => {
    async function checkLoginStatus() {
      const status = await tokenVarification(); 

      if (status && typeof status !== 'boolean') {
        setIsLogin(true);
        dispatch(login({ login: true, id: status.id }));
      } else {
        setIsLogin(false);
      }
    }
  
    checkLoginStatus();
  }, []);

  return (
    <>
      <div className='wrap-app'>
        {
        !isLogin ?
         <>
          <LeftBar />
          <Main />
        </>
        :
        <>
        <LogIn />
        </>
        }
      
      </div>
      <div id="modal-root"></div>
    </>
  
  );
}

export default App;
