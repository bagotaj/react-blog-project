import React from 'react';
import { Link } from 'react-router-dom';

export default function Posts({ blogs }) {
  return (
    <div>
      {blogs.map((blog, i) => (
        <div key={blog.title + i} className="border p-4 mb-3">
          <h2>{blog.title[0].toUpperCase() + blog.title.slice(1)}</h2>
          <p>{blog.timestamp.toDate().toDateString()}</p>
          <p>{blog.content}</p>
          <Link to={`/edit-post/${blog.docId}`} className="link">
            <p>edit this post</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
