import React from 'react';

export default function Posts({ blogs }) {
  return (
    <div>
      {blogs.map((blog) => (
        <div className="border p-4">
          <h2>{blog.title[0].toUpperCase() + blog.title.slice(1)}</h2>
          <p>{blog.content}</p>
          <p>edit this post</p>
        </div>
      ))}
    </div>
  );
}
