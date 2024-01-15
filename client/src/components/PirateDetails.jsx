import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import EditOne from "./EditOne";

const PirateDetails = (props) => {
  const [pirate, setPirate] = useState({});
  const { update, setUpdate } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pirate/" + id)
      .then((res) => {
        console.log(res.data);
        setPirate(res.data);
      })
      .catch((err) => console.log(err));
  }, [update]);

  const PirateCrew = () => {
    navigate("/pirates");
  };

  return (
    <div className="bg-warning d-flex align-items-center justify-content-center">
     <div>
     <h2 className="pirateNav">{pirate.name}</h2>
      <div className="orangebck">
        <div className="d-flex justify-content-around">
          <div>
            <img src={pirate.img} alt="profile picture" className="detailPhoto mweidthh" />
            <h3>{pirate.catchPhrase}</h3>
          </div>
          <div className="aboutCard">
            <h4>About</h4>
            <p>Position: {pirate.position}</p>
            <p>Treasures: {pirate.treasureChest}</p>
            <p>Peg Leg: {pirate.pegLeg ? "Yes" : "No"}</p>
            <p>Eye Patch: {pirate.eyePatch ? "Yes" : "No"}</p>
            <p>Hook Hand: {pirate.hookHand ? "Yes" : "No"}</p>
          </div>
        </div>
        <br />
        <button className="btn bg-light" onClick={PirateCrew}>
          Crew Board
        </button>
        <Link to={`/pirate/${id}/edit`}>
          <button className="btn bg-light">Edit</button>
        </Link>
      </div>
     </div>
    </div>
  );
};

export default PirateDetails;
