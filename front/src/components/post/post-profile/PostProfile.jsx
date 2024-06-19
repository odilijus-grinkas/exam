import Header from "../../header/Header";
import PostShow from "../../index/post-show/PostShow";
import { useEffect, useState } from "react";

export default function PostProfile() {
  const [posts, setPosts] = useState([]);
  const [reloadPosts, setReloadPosts] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      const id = await JSON.parse(sessionStorage.getItem("user")).id;
      const response = await fetch(`http://localhost:3000/posts/filtered/:user_id=${id}`);
      const data = await response.json();
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div>
      <Header />
      <h1>My Events</h1>
      {posts.map((post) => {
          return (
            <div className="flex-grow-1" key={post.post_id}>
              <PostShow
                post={post}
                key={post.post_id}
                reloadPosts={reloadPosts}
                setReloadPosts={setReloadPosts}
                userPosts={true}
              />
            </div>
          );
        })}
    </div>
  );
}