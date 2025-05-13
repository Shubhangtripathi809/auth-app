import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, updateUser } from '../features/authSlice';
import { useState } from 'react';

export default function Crud() {
  const { users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ username: '', role: 'user' });

  const handleEdit = (user) => {
    setEdit(user.id);
    setForm({ username: user.username, role: user.role });
  };

  const handleUpdate = () => {
    dispatch(updateUser({ id: edit, ...form }));
    setEdit(null);
    setForm({ username: '', role: 'user' });
  };

  return (
    <div>
      <h4>User Management</h4>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {edit === u.id ? (
              <>
                <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button onClick={handleUpdate}>Save</button>
              </>
            ) : (
              <>
                {u.username} - {u.role}
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => dispatch(deleteUser(u.id))}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}