import '../stylesheets/Header.css';

function Header(props) {

  return (
    <header className="header">
      <h1 className='header-title'>Welcome to the blog</h1>
      {
        (props.loggedIn && <button onClick={props.displayPostModal} className='header-btn'>Create Post</button>) ||
        (<button onClick={props.displayLoginModal} className='header-btn'>Login</button>)
      }
      {props.loggedIn && <button className='header-btn' onClick={props.logOut}>Log out</button>}
    </header>
  );
};

export default Header;
