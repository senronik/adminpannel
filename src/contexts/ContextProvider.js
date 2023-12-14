import React, { createContext, useContext, useState,useReducer,useRef,useEffect } from 'react';
import reducer from '../reducers/AuthReducer';
const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
  isauthenticate:false
};

export const ContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);


  console.log(state.isauthenticate);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    // try {
    //   isAuthenticated = localStorage.getItem('token');
    // } catch (err) {
    //   console.error(err);
    // }
      let isAuthenticated=localStorage.getItem("token");
    if (isAuthenticated) {
      // const user = {
      //   id: '5e86809283e28b96d2d38537',
      //   avatar: '/assets/avatars/avatar-anika-visser.png',
      //   name: 'Anika Visser',
      //   email: 'anika.visser@devias.io',
      //   role:'admin'
      // };
      dispatch({type:"LOGIN_SUCCESS"});
    } else {
      dispatch({
       type:"LOGOUT"
      });
    }
  };

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });
  // const handleClick=(clicked)=>{
  //   console.log("handleclick is running")
  //   dispatch({type:"CLICKED",payload:clicked});
  // }

  useEffect(
    () => {
      initialize();
    },
    []
  );
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ ...state, currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState,dispatch, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
