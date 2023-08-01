import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Item } from '../../server/models/Item'; // Updated path
import { PlaceData } from '../../server/controllers/recyclingLocationsController'; // Updated path
import axios from 'axios';
import Map from './Map';

// ... (rest of the component)


interface RecyclingLocationsModalProps {
  open: boolean;
  handleClose: () => void;
  item: Item;
  userLocation: { lat: number; lng: number; }; // replace with correct location data type
}

const baseURL = ""; // fill in with server address
const endpoint = ""; // fill in with endpoint to hit for recycling locations

const RecyclingLocationsModal: React.FC<RecyclingLocationsModalProps> =
  ({ open, handleClose, item, userLocation }) => {
    const [recyclingCenters, setRecyclingCenters] = useState<PlaceData[]>([]);

    const fetchRecyclingCenters = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/${endpoint}`, // use your server route to get recycling locations
          {
            params: {
              item: item.name,
              location: userLocation
            }
          }
        );
        setRecyclingCenters(response.data);
      } catch (error) {
        console.error("Error fetching recycling centers", error);
        // add additional error handling as necessary
      }
    }

    React.useEffect(() => {
      if (open) {
        fetchRecyclingCenters();
      }
    }, [open]);

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <h2 id="modal-modal-title">Recycling Locations for {item.name}</h2>
          <Map
            center={userLocation}
            zoom={10}
            item={item}
            places={recyclingCenters}
          />
          <button onClick={handleClose}>Close</button>
        </div>
      </Modal>
    );
  }

export default RecyclingLocationsModal;