import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { CreatePostProvider } from './Context/CreatePostContext';
import CreatePost from './Pages/CreatePost';
import Post from './Pages/ListPost';
import NotFound from './Pages/NotFound';
import SpecificPost from './Pages/ShowPost';
import Login from './Pages/User/Login';
import Profile from './Pages/User/Profile';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Post />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/create-post" element={
            <CreatePostProvider>
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            </CreatePostProvider>
          } />
          <Route exact path="/posts/:id" element={<SpecificPost />} />
          <Route exact path="/users/:id" element={<Profile />} />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
