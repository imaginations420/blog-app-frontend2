import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostForm.css';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://blog-app-backend2.onrender.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, excerpt }),
    })
      .then(response => response.json())
      .then(() => navigate('/'))
      .catch(error => console.error('Error creating post:', error));
  };

  return (
    <div className="post-form">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Excerpt:</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default PostForm;
