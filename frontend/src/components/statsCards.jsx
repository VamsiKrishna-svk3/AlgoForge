import "../styles/statscards.css";
function StatsCards({ stats, streak }) {

  const cards = [
    {
      title: "Total Problems",
      value: stats?.total || 0,
      icon: "📚",
    },

    {
      title: "Solved",
      value: stats?.solved || 0,
      icon: "✅",
    },

    {
      title: "Easy",
      value: stats?.easy || 0,
      icon: "🟢",
    },

    {
      title: "Medium",
      value: stats?.medium || 0,
      icon: "🟡",
    },

    {
      title: "Hard",
      value: stats?.hard || 0,
      icon: "🔴",
    },

    {
      title: "Current Streak",
      value: streak || 0,
      icon: "🔥",
    },
  ];


  return (

    <div className="stats-grid">

      {
        cards.map((card,index)=>(

          <div 
            className="stats-card"
            key={index}
          >

            <div className="stats-icon">
              {card.icon}
            </div>


            <h2>
              {card.value}
            </h2>


            <p>
              {card.title}
            </p>


          </div>

        ))
      }

    </div>

  );
}


export default StatsCards;