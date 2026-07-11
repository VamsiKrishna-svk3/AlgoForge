import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/AddProblem.css";

function AddProblem() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    leetcodeNumber: "",
    problemUrl: "",
    difficulty: "Easy",
    status: "Solved",
    timeComplexity: "",
    spaceComplexity: "",
    tags: "",
    notes: "",
    platform: "LeetCode",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...form,
        leetcodeNumber: form.leetcodeNumber
          ? Number(form.leetcodeNumber)
          : null,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await axios.post(
        "http://localhost:5000/api/problems",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Problem Added Successfully!");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to add problem");
    }
  };

  return (
    <>
      <Navbar />

      <div className="add-container">

        <div className="add-card">

          <h1>Add Problem</h1>

          <form onSubmit={handleSubmit}>

            <input
              type="number"
              name="leetcodeNumber"
              placeholder="LeetCode Number"
              value={form.leetcodeNumber}
              onChange={handleChange}
            />

            <input
              type="text"
              name="title"
              placeholder="Problem Title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="problemUrl"
              placeholder="LeetCode URL"
              value={form.problemUrl}
              onChange={handleChange}
            />

            <div className="row">

              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Solved</option>
                <option>Attempted</option>
                <option>Not Started</option>
              </select>

            </div>

            <div className="row">

              <input
                type="text"
                name="timeComplexity"
                placeholder="Time Complexity (e.g. O(n))"
                value={form.timeComplexity}
                onChange={handleChange}
              />

              <input
                type="text"
                name="spaceComplexity"
                placeholder="Space Complexity (e.g. O(1))"
                value={form.spaceComplexity}
                onChange={handleChange}
              />

            </div>

            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={handleChange}
            />

            <textarea
              name="notes"
              placeholder="Notes..."
              rows="6"
              value={form.notes}
              onChange={handleChange}
            />

            <button type="submit">
              Add Problem
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddProblem;