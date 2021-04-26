import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

import AddNewPost from './components/AddNewPost';
import Posts from './components/Posts';

import { useEffect, useState } from 'react';

import db from './firebase/db';
import EditPost from './components/EditPost';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('blogs').onSnapshot((snapshot) => {
      const data = [];

      snapshot.docs.forEach((blog) => {
        const docItem = blog.data();

        docItem['docId'] = blog.id;

        data.push(docItem);
      });

      setBlogs(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <NavLink to="/" className="link">
                <h1 className="ms-5 navbar-brand">The Blog</h1>
              </NavLink>
            </div>
          </nav>
        </header>
        <main className="container">
          <Switch>
            <Route path="/edit-post/:id">
              <EditPost />
            </Route>
            <Route exact path="/">
              <AddNewPost />
            </Route>
          </Switch>
          <Posts blogs={blogs} />
        </main>
      </div>
    </Router>
  );
}

export default App;
