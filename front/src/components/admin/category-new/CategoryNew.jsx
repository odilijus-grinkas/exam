import { useState } from "react";

export default function CategoryNew() {
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name: document.getElementById("name").value };
    try {
      const response = await fetch("http://localhost:3000/posts/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card mx-2 bg-info h-50">
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit} className="mx-5">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}
