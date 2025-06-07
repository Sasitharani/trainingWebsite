import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function BlogPost() {
  const { id } = useParams(); // id is like '123-some-title'
  const blogId = id.split('-')[0];
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${blogId}`);
        if (!response.ok) throw new Error('Failed to fetch blog');
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

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
        <div className="loading">Loading blog post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl text-center">
          <h1 className="text-xl font-bold text-red-500 mb-4">{error}</h1>
          <Link to="/blog" className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Helmet>
        <title>{blog.title} | Tech Blog</title>
        <meta name="description" content={blog.content.substring(0, 150)} />
        {/* Open Graph tags */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content.substring(0, 150)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        {/* Optionally add an image if available: <meta property="og:image" content={blog.imageUrl} /> */}
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.content.substring(0, 150)} />
        {/* Optionally add an image if available: <meta name="twitter:image" content={blog.imageUrl} /> */}
      </Helmet>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">{blog.title}</h1>
        <div className="mb-4 text-gray-600 text-center">
          By {blog.author} - {formatDate(blog.timestamp)}
        </div>
        <div className="blog-content mb-8">
          {blog.content.split('\n').map((paragraph, idx) => (
            paragraph ?
              <p key={idx} className="mb-4">{paragraph}</p> :
              <br key={idx} />
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;