import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import "../styles/AddProblem.css";

function EditProblem() {
  const { id } = useParams();
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

  useEffect(() => {
    fetchProblem();
  }, []);

  const fetchProblem = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/problems",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const problem = res.data.find((p) => p._id === id);

      if (!problem) {
        alert("Problem not found");
        navigate("/dashboard");
        return;
      }

      setForm({
        title: problem.title || "",
        leetcodeNumber: problem.leetcodeNumber || "",
        problemUrl: problem.problemUrl || "",
        difficulty: problem.difficulty || "Easy",
        status: problem.status || "Solved",
        timeComplexity: problem.timeComplexity || "",
        spaceComplexity: problem.spaceComplexity || "",
        tags: problem.tags ? problem.tags.join(", ") : "",
        notes: problem.notes || "",
        platform: problem.platform || "LeetCode",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to load problem.");
    }
  };

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

      await axios.put(
        `http://localhost:5000/api/problems/${id}`,
        {
          ...form,
          leetcodeNumber: form.leetcodeNumber
            ? Number(form.leetcodeNumber)
            : null,
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Problem Updated Successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed to update problem.");
    }
  };
    return (
    <>
      <Navbar />

      <div className="add-container">
        <div className="add-card">
          <h1>Edit Problem</h1>

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
              rows="6"
              name="notes"
              placeholder="Notes..."
              value={form.notes}
              onChange={handleChange}
            />

            <button type="submit">
              Update Problem
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProblem;
