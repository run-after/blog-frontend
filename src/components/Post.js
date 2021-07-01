import '../stylesheets/Post.css';
import { useEffect, useState } from 'react';
import PostForm from './PostForm';
import Comment from './Comment';
import CommentForm from './CommentForm';
const URL = 'https://arctic-eh-68834.herokuapp.com';

const formatTime = (timeString) => {
  const time = new Date(timeString);
  return `${time.toLocaleDateString("en-US")} at ${time.toLocaleTimeString('en-US')}`;
};

function Post(props) {

  const [post, setPost] = useState({ 'data': props.post });
  const [showPostForm, setShowPostForm] = useState(false);
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const deletePost = (postID) => {
    const confirm = prompt('CONFIRM - Do you want to delete? Type yes to confirm');

    if (confirm && confirm.toLowerCase() === 'yes') {
      fetch(`${URL}/posts/${postID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(() => {
        props.removePost(postID);
      });
    };
  };

  const removeComment = (commentID) => {
    const temp = comments.data.filter(comment => comment._id !== commentID);
    setComments({ 'data': temp });
  };

  const changePublishStatus = (post) => {
    fetch(`${URL}/posts/${post._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ "title": post.title, "body": post.body, "published": !post.published }),
    }).then((res) => {
      // Show updated post
      post.published = !post.published;
      setPost({ 'data': post });
    });
  };

  const changeCommentDisplay = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    fetch(`${URL}/posts/${props.post._id}/comments`).then((res) => {
      res.json().then((res) => {
        setComments({ 'data': res });
      });
    });
  }, [props.post._id]);

  return (
    <div className="post">
      {
        showPostForm &&
        <PostForm displayPostModal={() => { setShowPostForm(!showPostForm) }}
          post={post.data}
          setPost={setPost}
        />
      }
      <div className='post-header'>
        <h3 className='post-title'>{post.data.title}</h3>
        <p className='post-timestamp'>Posted on: {formatTime(post.data.createdAt)}</p>
        <p className='post-author'>By: {post.data.author}</p>
      </div>
      <p className='post-body'>{post.data.body}</p>
      <div className='post-btns'>
        {props.loggedIn &&
          <button onClick={() => setShowPostForm(true)}
            className='post-btn'>Edit post
          </button>
        }
        {
          props.loggedIn &&
          <button onClick={() => deletePost(post.data._id)}
            className='post-btn'>Delete post
          </button>
        }
        {
          props.loggedIn &&
          <button onClick={() => changePublishStatus(post.data)}
            className='post-btn'>
            {
              (!post.data.published &&
                'Publish post') ||
              'Unpublish post'
            }
          </button>
        }
        <button className='post-btn comment-display-btn' onClick={changeCommentDisplay}>{(showComments && 'Hide Comments') || 'Show Comments'}</button>
      </div>
      {
        showComments &&
        <div className='comments'>
          {comments && comments.data.map((comment) => {
            return (
              <Comment
                key={comment._id}
                comment={comment}
                loggedIn={props.loggedIn}
                removeComment={removeComment}
              />
            )
          })}
          <CommentForm
            comments={comments}
            setComments={setComments}
            post={post.data}
          />
        </div>
      }
    </div>
  );
};

export default Post;

// NEED TO ADD A PROMPT TO MAKE SURE USER WANTS TO DELETE POST