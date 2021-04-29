import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

import AddNewPost from './components/AddNewPost';
import Posts from './components/Posts';
import EditPost from './components/EditPost';
import CategoryPage from './components/CategoryPage';

import { useEffect, useState } from 'react';

import db from './firebase/db';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [options, setOptions] = useState([
    { value: 'sci-fi' },
    { value: 'science' },
    { value: 'crypto' },
    { value: 'web' },
    { value: 'general topic' },
  ]);

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
            <Route path="/category/:category">
              <CategoryPage />
            </Route>
            <Route path="/edit-post/:id">
              <EditPost options={options} />
            </Route>
            <Route exact path="/">
              <AddNewPost options={options} />
            </Route>
          </Switch>
          <Posts blogs={blogs} />
        </main>
      </div>
    </Router>
  );
}

export default App;
