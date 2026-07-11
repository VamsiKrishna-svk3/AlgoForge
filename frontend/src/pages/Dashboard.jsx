import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import StatsCards from "../components/statsCards";
import SearchBar from "../components/SearchBar";
import ProblemCard from "../components/ProblemCard";
import Heatmap from "../components/Heatmap";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../styles/Dashboard.css";


function Dashboard() {

  const navigate = useNavigate();


  const [problems, setProblems] = useState([]);

  const [stats, setStats] = useState(null);

  const [streak, setStreak] = useState(0);

  const [heatmap, setHeatmap] = useState([]);


  const [search, setSearch] = useState("");

  const [difficulty, setDifficulty] = useState("");

  const [status, setStatus] = useState("");


  useEffect(() => {

    fetchData();

  }, []);



  const fetchData = async () => {

    try {

      const token = localStorage.getItem("token");


      if (!token) {

        navigate("/login");
        return;

      }


      const config = {

        headers: {
          Authorization: `Bearer ${token}`,
        },

      };


      const [
        problemsRes,
        statsRes,
        streakRes,
        heatmapRes,

      ] = await Promise.all([


        axios.get(
          "http://localhost:5000/api/problems",
          config
        ),


        axios.get(
          "http://localhost:5000/api/problems/stats/summary",
          config
        ),


        axios.get(
          "http://localhost:5000/api/problems/stats/streak",
          config
        ),


        axios.get(
          "http://localhost:5000/api/problems/stats/heatmap",
          config
        ),

      ]);



      setProblems(problemsRes.data);

      setStats(statsRes.data);

      setStreak(streakRes.data.streak);

      setHeatmap(heatmapRes.data);



    } catch (err) {

      console.log(err);

    }

  };




  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");


      await axios.delete(

        `http://localhost:5000/api/problems/${id}`,

        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }

      );


      setProblems(
        problems.filter(
          (p)=>p._id !== id
        )
      );


    } catch(err){

      console.log(err);

    }

  };





  const filteredProblems = problems.filter((problem)=>{


    const searchMatch =
      problem.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );


    const difficultyMatch =
      difficulty === "" ||
      problem.difficulty === difficulty;



    const statusMatch =
      status === "" ||
      problem.status === status;



    return (
      searchMatch &&
      difficultyMatch &&
      statusMatch
    );


  });





  const pieData = stats
    ? [

      {
        name:"Easy",
        value:stats.easy || 0
      },

      {
        name:"Medium",
        value:stats.medium || 0
      },

      {
        name:"Hard",
        value:stats.hard || 0
      }

    ]

    : [];



  const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444"
  ];





  return (

    <div className="dashboard">


      <Navbar />



      <div className="dashboard-container">

        {
          stats &&

          <StatsCards
            stats={stats}
            streak={streak}
          />

        }




        <div className="chart-box">

          <h2>
            Difficulty Breakdown
          </h2>


          <div className="chart">

            <ResponsiveContainer>

              <PieChart>


                <Pie

                  data={pieData}

                  dataKey="value"

                  outerRadius={100}

                >

                  {
                    pieData.map(
                      (_,index)=>(

                        <Cell

                          key={index}

                          fill={
                            COLORS[index]
                          }

                        />

                      )
                    )
                  }

                </Pie>


                <Tooltip />

              </PieChart>


            </ResponsiveContainer>


          </div>


        </div>





        <Heatmap
          data={heatmap}
        />






        <SearchBar

          search={search}

          setSearch={setSearch}

          difficulty={difficulty}

          setDifficulty={setDifficulty}

          status={status}

          setStatus={setStatus}

        />






        <div className="problem-list">


        {

          filteredProblems.length > 0 ?


          filteredProblems.map(
            (problem,index)=>(


              <ProblemCard

                key={problem._id}

                problem={problem}

                index={index+1}

                onDelete={handleDelete}

              />


            )
          )


          :


          <h3>
            No problems found
          </h3>


        }


        </div>




      </div>



    </div>


  );

}


export default Dashboard;