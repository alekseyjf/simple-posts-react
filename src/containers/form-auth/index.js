import React, {useContext, useState} from "react";
import {UserContext} from "../context";
import './form-auth.css'

const FormAuth = () => {
  const [state, setState] = useContext(UserContext);
  const {users, articles} = state;
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [check, setCheck] = useState(false);
  const [checkName, setCheckName] = useState(false);
  const [checkPass, setCheckPass] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (userName.length < 3 || email.length < 3 || pass.length < 3) {
      return setCheck(true)
    }
    setCheck(false);

    const item = {
      userName,
      email,
      pass
    };

    // auth

    const idx = users.findIndex(el => el.email.toLowerCase() === item.email.toLowerCase());

    if (idx >= 0) {
      if(users[idx].userName.toLowerCase() !== item.userName.toLowerCase()) {
        return setCheckName(true)
      }
      setCheckName(false);
      if(users[idx].pass.toLowerCase() !== item.pass.toLowerCase()) {
        return setCheckPass(true)
      }
      setCheckPass(false);

      const newUsers = users.map(el => {
        if (el.email === item.email) {
          item.auth = true
        }
        return item;
      });
      setState(state => ({...state, users: newUsers, userAuth: users[idx]}));
    } else {
      item.auth = true;
      users.push({...item});
      setState(state => ({...state, users, userAuth: users[users.length - 1]}));

    }
    const newState = {
      users,
      articles
    };
    localStorage.setItem('state', JSON.stringify(newState));


    setUserName('');
    setEmail('');
    setPass('');
  };
  const onSetName = (e) => {
    setUserName(e.target.value)
  };
  const onSetEmail = (e) => {
    setEmail(e.target.value)
  };
  const onSetPass = (e) => {
    setPass(e.target.value)
  };

  const warning = check ? <div className="alert alert-danger" role="alert">
    поля формы должны иметь более 2 символов
  </div> : null;
  const warningName = checkName ? <div className="alert alert-danger" role="alert">
    такой имейл зарегестрирован, неправильно ввели имя
  </div> : null;
  const warningPass = checkPass ? <div className="alert alert-danger" role="alert">
    такой имейл зарегестрирован, неправильно ввели пароль
  </div> : null;

  return (
    <form className="form-signin" onSubmit={onSubmit}>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <input
        type="text"
        id="userName"
        className="form-control"
        placeholder="Name" required=""
        autoFocus=""
        value={userName}
        onChange={onSetName}
      />
      <input
        type="email"
        id="inputEmail"
        className="form-control"
        placeholder="Email address"
        required=""
        autoFocus=""
        value={email}
        onChange={onSetEmail}
      />
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        required=""
        value={pass}
        onChange={onSetPass}
      />
      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"/> Remember me
        </label>
      </div>
      {warning}
      {warningName}
      {warningPass}
      <input className="btn btn-lg btn-primary btn-block" type="submit" value="Sign in"/>
    </form>
  )
}

export default FormAuth;