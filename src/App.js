import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Post from './components/Post';
import PostForm from './components/PostForm';
const URL = 'https://arctic-eh-68834.herokuapp.com';

function App() {

  const [posts, setPosts] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displayPostForm, setDisplayPostForm] = useState(false);

  const displayLoginModal = () => {
    setDisplayLogin(!displayLogin);
  };

  const displayPostModal = () => {
    setDisplayPostForm(!displayPostForm);
  };

  const logOut = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const addPost = (post) => {
    post.author = post.author.username;
    const temp = posts.data;
    temp.push(post);
    setPosts({ 'data': temp });
  };

  const removePost = (postID) => {
    const temp = posts.data.filter(post => post._id !== postID);
    setPosts({ 'data': temp });
  };

  useEffect(() => {
    // Fetch all blog posts and set state
    fetch(`${URL}/posts`).then((response) => {
      response.json().then((posts) => {
        setPosts({ 'data': posts });
      });
    });

    // Check for userID in localStorage to determine logged in status
    const userID = localStorage.getItem('userID');
    if (userID) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    };
  }, []);

  return (
    <div className="App">
      <Header
        displayLoginModal={displayLoginModal}
        displayPostModal={displayPostModal}
        loggedIn={loggedIn}
        logOut={logOut}
      />
      {
        posts &&
        // find a different method than map.. reduce?
        posts.data.map((post) => {
          if (post.published || loggedIn) {
            return (
              <Post key={post._id}
                post={post}
                loggedIn={loggedIn}
                removePost={removePost}
                setPosts={setPosts}
                displayPostModal={displayPostModal}
                displayPostForm={displayPostForm}
              />
            )
          };
        })
      }
      {
        displayLogin &&
        <Login
          displayLoginModal={displayLoginModal}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setDisplayLogin={setDisplayLogin}
        />
      }
      {
        displayPostForm &&
        <PostForm
          displayPostModal={displayPostModal}
          addPost={addPost}
        />
      }
    </div>
  );
}

export default App;