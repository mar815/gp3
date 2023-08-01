import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Item } from './types';
import axios from 'axios';
import Map from './Map';
import { PlaceData } from './types'


interface RecyclingLocationsModalProps {
  open: boolean;
  handleClose: () => void;
  item: Item;
  userLocation: { lat: number; lng: number; };
}

const baseURL = ""; // fill in with server address
const endpoint = ""; // fill in with endpoint to hit for recycling locations

const RecyclingLocationsModal: React.FC<RecyclingLocationsModalProps> =
  ({ open, handleClose, item, userLocation }) => {
    const [recyclingCenters, setRecyclingCenters] = useState<PlaceData[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchRecyclingCenters = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseURL}/${endpoint}`, { params: { item: item.name, location: userLocation } }
        );
        setRecyclingCenters(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recycling centers", error);
        setLoading(false);
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
