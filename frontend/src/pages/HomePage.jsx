import { useState, useEffect } from 'react';
import { fetchPosts } from '../services/api';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

