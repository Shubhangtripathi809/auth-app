import { createSlice } from '@reduxjs/toolkit';
import { users as initialUsers } from '../data/users';

let userDB = [...initialUsers];

const initialState = {
  user: null,
  isAuthenticated: false,
  users: userDB
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = userDB.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
      }
    },
    signup: (state, action) => {
      const newUser = { id: Date.now(), ...action.payload };
      userDB.push(newUser);
      state.users = userDB;
      state.user = newUser;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    deleteUser: (state, action) => {
      userDB = userDB.filter((u) => u.id !== action.payload);
      state.users = userDB;
    },
    updateUser: (state, action) => {
      const { id, username, role } = action.payload;
      userDB = userDB.map((u) =>
        u.id === id ? { ...u, username, role } : u
      );
      state.users = userDB;
    }
  }
});

export const { login, signup, logout, deleteUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
