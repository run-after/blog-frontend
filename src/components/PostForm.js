import '../stylesheets/PostForm.css';
import { useState } from 'react';
const URL = 'https://arctic-eh-68834.herokuapp.com';

function PostForm(props) {

  const [message, setMessage] = useState(null);

  const createPost = (e) => {
    e.preventDefault();

    if (props.post) {
      const test = props.post;
      test.title = e.target.title.value;
      test.body = e.target.body.value;
      test.published = e.target.published.checked;

      fetch(`${URL}/posts/${props.post._id}`, {
        method: 'PUT',
        body: JSON.stringify({ "title": e.target.title.value, "body": e.target.body.value, "published": e.target.published.checked }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        res.json().then((res) => {
          if (res.message) {
            setMessage(res.message.errors);
          } else {
            // Do not display post form
            props.displayPostModal();
            // Display new post
            props.setPost({ 'data': test });
          };
        })

      });
    } else {
      fetch(`${URL}/posts`, {
        method: 'POST',
        body: JSON.stringify({ "title": e.target.title.value, "body": e.target.body.value, "published": e.target.published.checked }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        res.json().then((res) => {
          // If post isn't valid
          if (res.message) {
            setMessage(res.message.errors);
            // If create post did work...
          } else {
            // Show new post on feed
            props.addPost(res);
            // Do not display post form
            props.displayPostModal();
          };
        });
      });
    };
  };

  return (
    <div className="post-form">
      <button onClick={props.displayPostModal} className='close-btn'>×</button>
      {message && message.map((msg) => {
        return <p key={msg.msg}>{msg.msg}</p>
      })}
      <form onSubmit={createPost}>
        <input type='text' id='title' name='title' required placeholder='title' defaultValue={props.post ? props.post.title : ''} />
        <textarea id='body' name='body' required placeholder='body' defaultValue={props.post ? props.post.body : ''} />
        <div className='published'>
          <label htmlFor='published'>Publish?</label>
          <input type='checkbox' name='published' defaultChecked={props.post ? props.post.published : false} />
        </div>
        <button>Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;