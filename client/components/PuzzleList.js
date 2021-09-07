import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";

const PuzzleList = (props) => {
  const fetchUsers = (limit, skip) => {
    // Make sure you send 'limit' and 'skip' as query parameters to your node.js server
    axios.get(`/api/beeData/all?limit=${limit}&skip=${skip}`).then((res) => {
      setPuzzle(res.data);
      setLoading(false);
    });
  };

  // const history = useHistory();
  const [puzzles, setPuzzle] = useState([]);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const nextPage = () => {
    setSkip(skip + limit);
  };

  const previousPage = () => {
    setSkip(skip - limit);
  };

  useEffect(() => {
    fetchUsers(limit, skip);
  }, [skip, limit]);

  return (
    <div>
      All puzzles:
      <div>
        {isLoading ? (
          <div className="loading"> </div>
        ) : (
          puzzles.map((puzzle) => (
            <div key={puzzle.printDate}>
              <h3
                onClick={() => window.location.assign(`/${puzzle.printDate}`)}
              >
                {puzzle.displayDate}
              </h3>
              <p>{puzzle.validLetters}</p>
              <br></br>
            </div>
          ))
        )}
      </div>
      <div>
        <div onClick={nextPage}> Previous Page </div>
        <div onClick={previousPage}> Next Page </div>
      </div>
    </div>
  );
};
export default PuzzleList;
