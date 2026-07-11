import { useNavigate } from "react-router-dom";
import "../styles/ProblemCard.css";

function ProblemCard({ problem, index, onDelete }) {

    const navigate = useNavigate();

    return (

        <div className="problem-card">

            <div className="problem-top">

                <div className="problem-left">

                    <span className="problem-number">
                        #{index}
                    </span>

                    <div>

                        <h2 className="problem-title">
                            {problem.title}
                        </h2>

                        {
                            problem.leetcodeNumber &&

                            <p className="leetcode-number">
                                LeetCode #{problem.leetcodeNumber}
                            </p>

                        }

                    </div>

                </div>


                <div className="problem-right">

                    <span
                        className={`difficulty ${problem.difficulty.toLowerCase()}`}
                    >
                        {problem.difficulty}
                    </span>


                    <span
                        className={`status ${problem.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                    >
                        {problem.status}
                    </span>

                </div>

            </div>



            {
                problem.problemUrl &&

                <div className="problem-info">

                    <a
                        href={problem.problemUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="leetcode-link"
                    >
                        🔗 Open Problem
                    </a>

                </div>

            }



            {
                problem.tags &&
                problem.tags.length > 0 &&

                <div className="tags-section">

                    <h4>
                        🏷 Topics
                    </h4>


                    <div className="tags">

                        {
                            problem.tags.map((tag,index)=>(

                                <span
                                    key={index}
                                    className="tag"
                                >
                                    {tag}
                                </span>

                            ))
                        }

                    </div>

                </div>

            }




            {
                problem.notes &&

                <div className="notes">

                    <h4>
                        📝 Notes
                    </h4>

                    <p>
                        {problem.notes}
                    </p>

                </div>

            }




            <div className="actions">

                <button
                    className="edit-btn"
                    onClick={() =>
                        navigate(`/edit-problem/${problem._id}`)
                    }
                >
                    ✏ Edit
                </button>


                <button
                    className="delete-btn"
                    onClick={() =>
                        onDelete(problem._id)
                    }
                >
                    🗑 Delete
                </button>

            </div>


        </div>

    );

}

export default ProblemCard;