import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Try to import the JSON file
        let data;
        try {
          const module = await import('../data/blogs.json');
          data = module.default;
        } catch (importError) {
          console.warn('Could not import blogs.json, using mock data instead:', importError);
          // Fallback data
          data = [
            {
              id: 1,
              title: "Understanding Tarot Spreads",
              content: "Tarot spreads are arrangements of cards that create a framework for readings.\n\nEach position in a spread has a specific meaning that influences how the card placed there should be interpreted.\n\nThe most basic spread is the single card draw, which provides a simple answer or insight into a specific question.",
              author: "Tarot Master",
              timestamp: "2023-07-15T14:30:00Z"
            }
          ];
        }

        // Find the blog with the matching ID
        const foundBlog = data.find(blog => blog.id === parseInt(id));
        
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError('Blog post not found');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading blog data:', error);
        setError('Failed to load blog post');
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

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