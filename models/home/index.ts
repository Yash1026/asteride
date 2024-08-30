interface Location {
  latitude: number;
  longitude: number;
}
export interface House {
  id: string;
  title: string;
  description: string;
  address: string;
  imageUrl: string;
  location: Location;
}
