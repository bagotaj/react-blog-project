import React from 'react';
import { Link } from 'react-router-dom';

export default function Posts({ blogs }) {
  return (
    <div>
      <h1>Posts</h1>
      {blogs.map((blog, i) => (
        <div key={blog.title + i} className="border p-4 mb-3">
          <h2>{blog.title[0].toUpperCase() + blog.title.slice(1)}</h2>
          <p>{blog.timestamp.toDate().toDateString()}</p>
          <p>{blog.content}</p>
          <Link to={`/edit-post/${blog.docId}`} className="link">
            <span>edit this post</span>
          </Link>
          <Link to={`/category/${blog.category}`} className="ms-5 link">
            <span>{blog.category}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
