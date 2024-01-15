import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PirateList = (props) => {

    const {socket, update, setUpdate} = props
    const [pirates, setPirates] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/pirates/')
            .then(res => setPirates(res.data))
            .catch(err => console.log(err))
            socket.on('toClient', (pirate) => {
                setUpdate(!update)
            })
            return () => socket.removeAllListeners()
    }, [update])

    const AddPirate = () => {
        navigate('/pirate/new')
    }
    const ViewProfile = (pirateId) => {
        navigate('/pirate/' + pirateId)
    }    
    const DeletePirate = (pirateId) => {
        axios.delete('http://localhost:8000/api/pirate/' + pirateId)
            .then(res => {
                socket.emit('toServer', res.data)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="bg-warning padiing">
            <div className="d-flex justify-content-between pirateNav padiing bg-secondary">
                <h3>Pirate Crew</h3>
                <button className="btn bg-light" onClick={AddPirate}>Add Pirate</button>
            </div>
           <div>
           <div className="orangebck d-flex align-items-center ">
                {pirates && pirates.map((pirate, index) => (
                    <div key={index}>
                        <div className="pirateCard d-flex justify-content-around">
                        <img src={pirate.img} className="profilePhoto mweidthh" alt="Profile photo" />
                        <div>
                            <div className="d-flex justify-content-between">
                                <h4>{pirate.name}</h4>
                                {pirate.role === 'Captain' ? <p className="captainCard">Captain</p> : ""}
                            </div>
                            <br />
                            <button className="btn btn-success" onClick={() => ViewProfile(pirate._id)}>View Pirate</button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button className="btn bg-light" onClick={() => DeletePirate(pirate._id)}>Walk the Plank</button>
                        </div>
                    </div>
                    <br/>
                    </div>
                ))}
            </div>
           </div>
        </div>
    )
}

export default PirateList;