import axios from 'axios';

export const getGeocode = async (zipCode: string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const getNearbyRecyclingCenters = async (
  location: { lat: number; lng: number },
  item: string
) => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=16093&keyword=recycle+${item}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};
