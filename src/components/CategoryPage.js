import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import db from '../firebase/db';

export default function CategoryPage() {
  const { category } = useParams();

  const [postsByCategory, setPostsByCategory] = useState([]);

  useEffect(() => {
    db.collection('blogs')
      .where('category', '==', category)
      .get()
      .then(processCategorySnapshot);
  }, [category]);

  const processCategorySnapshot = (snapshot) => {
    const items = [];

    snapshot.docs.forEach((item) => {
      const docItem = item.data();
      docItem['docId'] = item.id;

      items.push(docItem);
    });
    setPostsByCategory(items);
  };

  return (
    <div className="mt-3">
      <h1>{category[0].toUpperCase() + category.slice(1)}</h1>
      {postsByCategory.map((blog, i) => (
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
