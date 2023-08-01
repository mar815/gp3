import axios, { AxiosResponse } from 'axios';

export const getGeocode = async (locationQuery: string): Promise<any> => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationQuery}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const response: AxiosResponse = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getNearbyRecyclingCenters = async (
  location: { lat: number; lng: number },
  item: string
): Promise<any> => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=16093&keyword=recycle+${item}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const response: AxiosResponse = await axios(url);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
