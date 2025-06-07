import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch blogs from the backend API (MySQL)
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://newtrainingwebsite.onrender.com/api/blogs');
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error loading blog data:', error);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format timestamp
  const formatDate = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return timestamp;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="loading">Loading tech blogs...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Tech Blogs</h1>
        <p className="mb-4 text-center text-gray-600">Explore the latest articles, tutorials, and insights on technology, coding, and software development.</p>
        {/* Search input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tech blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Blog list */}
        <div className="mb-6 space-y-3">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <div
                key={blog.id}
                className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition"
              >
                <Link to={`/blog/${blog.id}`} className="block">
                  <h2 className="text-lg font-semibold text-blue-600">{blog.title}</h2>
                  <p className="text-sm text-gray-500">
                    By {blog.author} - {formatDate(blog.timestamp)}
                  </p>
                  <p className="mt-2 text-gray-600 line-clamp-2">{blog.content.substring(0, 120)}...</p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No tech blogs found matching "{searchTerm}"</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;