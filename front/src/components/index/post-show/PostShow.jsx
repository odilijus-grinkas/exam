import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostShow(props) {
  const [selectedStar, setSelectedStar] = useState(0);
  const navigate = useNavigate();

  const handleEdit = async (postId) => {
    navigate(`/edit/${postId}`);
  }

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
      });
      if (response.ok) {
        props.setReloadPosts(props.reloadPosts + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStarClick = async (starNumber) => {
    if (selectedStar) return;
    if (sessionStorage.getItem("user") === null) return;
    setSelectedStar(starNumber);
    try {
      const response = await fetch("http://localhost:3000/posts/stars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify({
          postId: props.post.post_id,
          rating: starNumber,
        }),
      });
      if (response.ok) {
        props.setReloadPosts(props.reloadPosts + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="card"
      style={{
        padding: "20px",
        margin: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <div className="d-flex justify-content-end">
        <span>rating: {props.post.rating}/5</span>
      </div>
      {props.userPosts ? null : (
        <div className="d-flex justify-content-end">
          {[...Array(5)].map((_, index) => (
            <i
              key={index}
              className="bi bi-star-fill "
              onClick={() => handleStarClick(index + 1)}
              style={{
                cursor: "pointer",
                color: index < selectedStar ? "gold" : "grey",
              }}
            ></i>
          ))}
        </div>
      )}
      <h2>{props.post.title}</h2>
      <p>
        <strong>Time:</strong> {props.post.time}
      </p>
      <p>
        <strong>Place:</strong> {props.post.place}
      </p>
      <p>
        <strong>Category:</strong> {props.post.category}
      </p>
      {/* delete button */}
      {(sessionStorage.getItem("user") &&
        JSON.parse(sessionStorage.getItem("user")).admin) ||
      props.userPosts ? (
        <>
          <i className="btn btn-info mb-2 container" onClick={() => handleEdit(props.post.post_id)}>
            Edit Post
          </i>
          <i
            className="btn btn-danger bi bi-trash container"
            onClick={() => handleDelete(props.post.post_id)}
          >
            Delete Post
          </i>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
