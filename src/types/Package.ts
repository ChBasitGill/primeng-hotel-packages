export interface Package {
  id: string;
  nights: number;
  city: string;
  hotels: Hotel[];
  excursions: Excursion[];
  tourServices: TourService[];
}

export interface Hotel {
  id: string;
  hotel: string;
  roomType: string;
}

export interface Excursion {
  id: string;
  name: string;
}

export interface TourService {
  id: string;
  name: string;
}