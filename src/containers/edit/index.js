import React, {useContext, useState} from "react";
import {UserContext} from "../context";
import {Redirect, withRouter} from "react-router-dom";

const Edit = (props) => {
  const {history} = props;
  const [state, setState] = useContext(UserContext)
  const {userAuth, articles, users} = state;

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [check, setCheck] = useState(false);

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  };
  const onChangeDesc = (e) => {
    setDesc(e.target.value)
  };


  const onSubmitArticle = (e) => {
    e.preventDefault();
    if (title.length < 4 || desc.length < 4) {
      return setCheck(true)
    }
    setCheck(false)

    const stamp = (Date.now()/1000).toFixed(0);

    // article
    const article = {
      title,
      description: desc,
      author: userAuth.userName,
      created_ad: stamp
    };


    articles.push({...article})

    setState(state=>({...state, articles}));

    const newState = {
      users,
      articles
    };

    localStorage.setItem('state', JSON.stringify(newState));

    history.push(`/${stamp}`);
    setTitle('');
    setDesc('');

  };

  const checkForm = check ? <div className="alert alert-danger" role="alert">
    поля формы должны иметь более 4 символов
  </div> : null;
  // check auth
  if (!userAuth) {
    return <Redirect to="/"/>
  }
  return (
    <div className="container">
      <form className="create-article" onSubmit={onSubmitArticle}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          aria-describedby="title"
          placeholder="Title"
          value={title}
          onChange={onChangeTitle}
        />
        <label htmlFor="Textarea1">Description</label>
        <textarea
          className="form-control"
          id="Textarea1"
          rows="3"
          value={desc}
          onChange={onChangeDesc}
        ></textarea>
        <input type="submit" className="btn btn-primary" value="Create"/>
      </form>
      {checkForm}
    </div>
  )
};

export default withRouter(Edit);