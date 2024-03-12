
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import Edit from './Edit';

function Home() {
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setUserName(storedEmail);
    setUserEmail(storedEmail);

    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const addPost = (title, paragraph, image) => {
    const newPost = { title, paragraph, userName, image };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const deletePost = (index, postUserName) => {
    if (userName === postUserName) {
      const updatedPosts = [...posts];
      updatedPosts.splice(index, 1);
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  return (
    <div className="homepage">
      <div className="navBar">
        <p>Posts</p>
        <p>{`Welcome, ${userName} (${userEmail})`}</p>
      </div>

      <div className="carousel">
        <h2>Write Your Own Post Now !</h2>
        <Link to="/edit" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" id="btn">
          Add
        </Link>
      </div>

      <div className="posts">
        <div className="first-row">
          {posts.map((post, index) => (
            <Post key={index} {...post} index={index} onDelete={deletePost} />
          ))}
        </div>
      </div>

      <Edit addPost={addPost} />
    </div>
  );
}

export default Home;
