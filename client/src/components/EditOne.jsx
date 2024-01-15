import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams,Link } from 'react-router-dom';

const EditOne = () => {
  const [editedPirate, setEditedPirate] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pirate/${id}`)
      .then(response => {
        setEditedPirate(response.data);
      })
      .catch(error => {
        console.error('Error fetching pirate:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setEditedPirate({
      ...editedPirate,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setEditedPirate({
      ...editedPirate,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSave = () => {
    axios
      .patch(`http://localhost:8000/api/pirates/${id}`, editedPirate)
      .then(response => {
        console.log('Pirate updated:', response.data);
        navigate(`/pirate/${id}`);
      })
      .catch(error => {
        console.error('Error updating pirate:', error);
      });
  };
  return (
    <div className='bg-warning padiing  d-flex align-items-center justify-content-center'> 
     <div>
     <div>
     <h2>Edit Pirate</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={editedPirate.name || ''}
        onChange={handleInputChange}
      />
     </div>

      <div>
      <label htmlFor="img">Image URL:</label>
      <input
        type="text"
        id="img"
        name="img"
        value={editedPirate.img || ''}
        onChange={handleInputChange}
      />
      </div>

      <div>
        <label htmlFor="treasureChest">Treasure Chest:</label>
      <input
        type="number"
        id="treasureChest"
        name="treasureChest"
        value={editedPirate.treasureChest || 0}
        onChange={handleInputChange}
      />
      </div>

      <div>
      <label>
        <input
          type="checkbox"
          name="pegLeg"
          checked={editedPirate.pegLeg || false}
          onChange={handleCheckboxChange}
        />
        Peg Leg
      </label>
      </div>

     <div>
     <label>
        <input
          type="checkbox"
          name="eyePatch"
          checked={editedPirate.eyePatch || false}
          onChange={handleCheckboxChange}
        />
        Eye Patch
      </label>
     </div>

     <div>
     <label>
        <input
          type="checkbox"
          name="hookHand"
          checked={editedPirate.hookHand || false}
          onChange={handleCheckboxChange}
        />
        Hook Hand
      </label>
     </div>

      <div>
      <Link to='/pirates' className='btn bg-light'>cancel</Link>
      <button className='btn bg-light' onClick={handleSave}>Save</button>
      </div>
     </div>
    </div>
  );
}

export default EditOne;
