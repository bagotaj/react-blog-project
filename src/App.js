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
              <NavLink to="/" className="link ms-5 navbar-brand">
                The Blog
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink to="/" className="link">
                      Add new post
                    </NavLink>
                  </li>
                </ul>
              </div>
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
