import '../stylesheets/CommentForm.css';
import { useState } from 'react';
const URL = 'https://arctic-eh-68834.herokuapp.com';

function CommentForm(props) {

  const [message, setMessage] = useState(null);
  const [authorValue, setAuthorValue] = useState('');
  const [commentBodyValue, setCommentBodyValue] = useState('');

  const changeAuthorInput = (e) => {
    setAuthorValue(e.target.value)
  };

  const changeBodyInput = (e) => {
    setCommentBodyValue(e.target.value)
  };

  const createComment = (e) => {
    e.preventDefault();

    fetch(`${URL}/posts/${props.post._id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ 'body': e.target.body.value, 'author': e.target.author.value })
    }).then((res) => {
      res.json().then((res) => {
        if (res.errors) {
          setMessage(res.errors);
        } else {
          const commentArray = props.comments.data;
          commentArray.push(res);
          setAuthorValue('');
          setCommentBodyValue('');
          setMessage(null);
          props.setComments({ 'data': commentArray });
        };
      });
    });
  };

  return (
    <form className='comment-form' onSubmit={createComment}>
      <h3 className='comment-form-title'>Write a comment...</h3>
      {message && message.map((err) => {
        return <p key={err.msg}>{err.msg}</p>
      })}
      <input
        id='author'
        name='author'
        placeholder='Your name'
        value={authorValue}
        onChange={changeAuthorInput}
        required
      />
      <textarea
        id='body'
        name='body'
        placeholder='Comment'
        value={commentBodyValue}
        onChange={changeBodyInput}
        required
      />
      <button>Submit</button>
    </form>
  );
};

export default CommentForm;