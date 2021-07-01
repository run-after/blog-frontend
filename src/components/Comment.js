import '../stylesheets/Comment.css';
const URL = 'https://arctic-eh-68834.herokuapp.com';

const formatTime = (timeString) => {
  const time = new Date(timeString);
  return `${time.toLocaleDateString("en-US")} at ${time.toLocaleTimeString('en-US')}`;
};

function Comment(props) {

  const deleteComment = (commentID) => {
    const confirm = prompt('CONFIRM - Do you want to delete? Type yes to confirm');

    if (confirm && confirm.toLowerCase() === 'yes') {
      fetch(`${URL}/posts/${props.comment.post}/comments/${commentID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(() => {
        props.removeComment(commentID);
      });
    };
  };

  return (
    <div className='comment'>
      <div className='comment-header'>
        <p className='comment-time'>{formatTime(props.comment.createdAt)}</p>
        <h6 className='comment-author'>{props.comment.author} writes:</h6>
      </div>
      <p className='comment-body'>{props.comment.body}</p>
      {
        props.loggedIn &&
        <button
          className='comment-btn'
          onClick={() => { deleteComment(props.comment._id) }}
        >
          Delete Comment
        </button>
      }
    </div>
  );
};

export default Comment;