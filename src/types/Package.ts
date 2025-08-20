export interface Destination {
  id: string;
  nights: number;
  city: string;
  hotels: Hotel[];
  excursions: Excursion[];
  tourServices: TourService[];
}

export interface Hotel {
  id: string;
  name: string;
  roomTypes: RoomType[];
}

export interface RoomType {
  id: string;
  name: string;
}

export interface Excursion {
  id: string;
  name: string;
}

export interface TourService {
  id: string;
  name: string;
}
