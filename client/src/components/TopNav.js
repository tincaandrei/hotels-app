import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

// creating a navigation menu

const TopNav = ()=>{

  const {auth} = useSelector((state) => ({...state}));
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logout = () =>{
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })

    // removing user from local storage

    window.localStorage.removeItem('auth');

    navigate('/login');
  }


  return(
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">Home</Link>
      {auth !== null && (<a className="nav-link pointer"  onClick={logout}>Logout</a>)}

      {auth === null && (
        <>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/register"> Registration</Link>
        </>
      )}
    </div>
  );
};
  
export default TopNav;
