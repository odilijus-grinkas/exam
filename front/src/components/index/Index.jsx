import Header from "../header/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostShow from "./post-show/PostShow";

export default function Index() {
  const [posts, setPosts] = useState([{ title: "Hello" }]);
  const [reloadPosts, setReloadPosts] = useState(0);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3000/posts/all");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, [reloadPosts]);
  return (
    <div>
      <Header />
      {sessionStorage.getItem("user") ? null : <h5 className="text-start">You can only vote if you log in 👆</h5>}
      <h1>City Events</h1>
      {/* Posts */}
      <div className="d-block d-md-flex flex-wrap">
        {posts.map((post) => {
          return (
            <div className="flex-grow-1" key={post.post_id}>
              <PostShow
                post={post}
                key={post.post_id}
                reloadPosts={reloadPosts}
                setReloadPosts={setReloadPosts}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
