import "../styles/SearchBar.css";

function SearchBar({
  search,
  setSearch,
  difficulty,
  setDifficulty,
  status,
  setStatus,
}) {

  return (

    <div className="search-container">


      <input
        type="text"
        placeholder="Search problems..."
        value={search}
        onChange={(e)=>
          setSearch(e.target.value)
        }
      />



      <select
        value={difficulty}
        onChange={(e)=>
          setDifficulty(e.target.value)
        }
      >

        <option value="">
          All Difficulties
        </option>

        <option value="Easy">
          Easy
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="Hard">
          Hard
        </option>

      </select>





      <select
        value={status}
        onChange={(e)=>
          setStatus(e.target.value)
        }
      >

        <option value="">
          All Status
        </option>

        <option value="Solved">
          Solved
        </option>

        <option value="Attempted">
          Attempted
        </option>

        <option value="Not Started">
          Not Started
        </option>

      </select>


    </div>

  );
}


export default SearchBar;