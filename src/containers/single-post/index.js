import React, {useContext} from "react";
import {withRouter} from "react-router-dom";
import {UserContext} from "../context/index";
import useFunc from "../context/use-func";

const SinglePost = (props) => {
  const {getReadDate} = useFunc()
  const [state, setState] = useContext(UserContext);
  const {articles, userAuth, users} = state;
  const {match: {params: {id}}, history} = props;


  const idx = articles ? articles.findIndex(el => el.created_ad === id) : -1;
  if(idx < 0) {
    return <div className="container"><h2>Post not found</h2></div>
  }
  const {title, description, author, created_ad} = articles[idx];
  let date = new Date(created_ad * 1000);
  const readDate = getReadDate(date);

  const delPost = () => {
    const newArticles = [
      ...articles.slice(0, idx),
      ...articles.slice(idx + 1)
    ];
    setState(state => ({...state, articles: newArticles}))
    const newState = {
      users,
      articles: newArticles
    };
    localStorage.setItem('state', JSON.stringify(newState))

    history.push('/');
  };

  const delButton = userAuth !== null && userAuth.userName === articles[idx].author ? <button type="button" className="btn btn-danger" onClick={delPost}>Delete</button> : null



  return (
    <div className="container">
      <div className="col-12 article">
        <h3 className="title-post">{title}</h3>
        <p>{description}</p>
        <div className="row">
          <div className="col-6">{author}</div>
          <div className="col-6">{readDate}</div>
        </div>
      </div>
      {delButton}
    </div>
  )
};

export default withRouter(SinglePost);