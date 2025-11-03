// Tipos para la API de Google Places

export interface PlacePhoto {
  photo_reference: string;
  height: number;
  width: number;
  html_attributions: string[];
}

export interface PlaceGeometry {
  location: {
    lat: number;
    lng: number;
  };
  viewport?: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
}

export interface Place {
  place_id: string;
  name: string;
  vicinity?: string;
  formatted_address?: string;
  geometry: PlaceGeometry;
  rating?: number;
  user_ratings_total?: number;
  photos?: PlacePhoto[];
  types: string[];
  business_status?: string;
  opening_hours?: {
    open_now?: boolean;
  };
  price_level?: number;
}

export interface PlacesResponse {
  results: Place[];
  status: string;
  error_message?: string;
  next_page_token?: string;
}

export type PlaceCategory = 
  | "tourist_attraction"
  | "museum"
  | "restaurant"
  | "park"
  | "shopping_mall"
  | "cafe"
  | "church"
  | "art_gallery";

export interface PlaceCategoryOption {
  id: PlaceCategory;
  label: string;
  icon: string;
}
