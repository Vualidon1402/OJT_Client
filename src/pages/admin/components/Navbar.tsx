import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const userStore = useSelector((state: any) => state.userStore);

  const handleLogout = () => {
    localStorage.removeItem('token');
  }
  return (
    <div id="navbar_box">
      <div className="user_box">
        <Link to={"/manager"}> HOME </Link>
      </div>
      <div className="authen_box">
        <img src={userStore.data?.avatarUrl} alt="avatar" />
        <div className="user_name">{userStore.data?.userName}</div>
        <button className='btn btn-danger' onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  );
}
