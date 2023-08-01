export interface Item {
  id: string;
  name: string;
  description: string;
  protocol: string;
  image: string;
}

export interface PlaceData {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}


