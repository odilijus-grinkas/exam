import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PostForm(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState([]);

  const getCategories = async () => {
    try{
      const response = await fetch("http://localhost:3000/posts/categories");
      const categories = await response.json();
      setOptions(categories);
      setCategory(categories[0].name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    // Check if props.data is not empty
    if (!props.data) return;
    const rawTime = props.data.time || "";
    const date = new Date(rawTime);

    // Format the date and time to match the datetime-local input requirements (YYYY-MM-DDThh:mm)
    const formattedTime =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      "T" +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2);

    if (Object.keys(props.data).length > 0) {
      setTitle(props.data.title || "");
      setTime(formattedTime || "");
      setPlace(props.data.place || "");
    }
  }, [props.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title: title, time: time, place: place, category: category };
    if (props.data) {
      props.handleEdit((data));
      navigate("post/profile")
    }
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        navigate("/post/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          aria-describedby="emailHelp"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="time" className="form-label">
          Time
        </label>
        <input
          type="datetime-local"
          className="form-control"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="place" className="form-label">
          Place
        </label>
        <input
          type="text"
          className="form-control"
          id="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          className="form-select"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  );
}
