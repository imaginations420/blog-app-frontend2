import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css'; // Import the CSS file for styling

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://blog-app-backend2.onrender.com/posts');
                if (!response.ok) throw new Error('Failed to fetch posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            try {
                const response = await fetch(`https://blog-app-backend2.onrender.com/posts/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setPosts(posts.filter(post => post.id !== id)); // Update the post list
                    alert('Post deleted successfully');
                } else {
                    alert('Failed to delete the post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="post-list">
            <h2>Blog Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <Link to={`/posts/${post.id}`}>Read More</Link>
                        <button className="delete-button" onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
