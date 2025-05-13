import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome, {user?.username} ({user?.role})</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
