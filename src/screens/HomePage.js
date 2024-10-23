import React, { useEffect, useState, useRef, useReducer } from 'react';
import Posts from './Posts';
import PostDetail from './PostDetail';

// browser for routing location window.location.push('/posts/1');

function HomePage() {
    const [names, setNames] = useState([]);
    const [name, setName] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const [showPosts, setShowPosts] = useState(false);

    useEffect(() => {
        const handleHashChange = () => {
            const postId = window.location.hash.split('-')[1];
            if (postId) {
                fetchPost(postId);
            } else {
                setSelectedPost(null);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const fetchPost = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const post = await response.json();
            setSelectedPost(post);
        } catch (error) {
            console.error('Failed to fetch post', error);
        }
    };

    const handleChange = e => {
        const { value } = e.target;
        setName(value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setNames(prev => [...prev, name]);
        setName('');
    };

    const handleShowPosts = () => {
        setShowPosts(true);
    };

    const handlePostClick = post => {
        window.location.hash = `post-${post.id}`;
    };

    const handleBackToPosts = () => {
        window.location.hash = '';
    };

    const handleBackToForm = () => {
        setShowPosts(false);
    };

    if (selectedPost) {
        return <PostDetail post={selectedPost} onBackClick={handleBackToPosts} />;
    }

    if (showPosts) {
        return <Posts onPostClick={handlePostClick} onBackClick={handleBackToForm} />;
    }

    return (
        <div className='App'>
            <h1>List of Post</h1>
            <button onClick={handleShowPosts}>Show Posts</button>
        </div>
    );
}

export default HomePage;
