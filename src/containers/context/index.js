import React, {useEffect, useState} from "react";

const UserContext = React.createContext([{}, () => {
}])

const UserProvider = (props) => {
  const [state, setState] = useState({
    userAuth: null,
    articles: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).articles : [],
    users: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).users : []
  });

  useEffect(() => {
      const idx = state.users.findIndex(el => el.auth);
      if (idx >= 0) {
        setState(state => ({...state, userAuth: state.users[idx]}))
      }
  }, [state.users]);

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  )
};

export {UserContext, UserProvider}