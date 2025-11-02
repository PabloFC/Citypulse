// Tipos para la API de Ticketmaster Discovery
export interface TicketmasterEvent {
  name: string;
  type: string;
  id: string;
  url: string;
  locale: string;
  images: EventImage[];
  sales?: {
    public?: {
      startDateTime?: string;
      endDateTime?: string;
    };
  };
  dates: {
    start: {
      localDate: string;
      localTime?: string;
      dateTime?: string;
    };
    timezone?: string;
    status?: {
      code: string;
    };
  };
  classifications?: EventClassification[];
  priceRanges?: PriceRange[];
  _embedded?: {
    venues?: Venue[];
  };
}

export interface EventImage {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

export interface EventClassification {
  primary: boolean;
  segment: {
    id: string;
    name: string;
  };
  genre?: {
    id: string;
    name: string;
  };
  subGenre?: {
    id: string;
    name: string;
  };
}

export interface PriceRange {
  type: string;
  currency: string;
  min: number;
  max: number;
}

export interface Venue {
  name: string;
  type: string;
  id: string;
  url?: string;
  locale?: string;
  postalCode?: string;
  timezone?: string;
  city?: {
    name: string;
  };
  state?: {
    name: string;
    stateCode: string;
  };
  country?: {
    name: string;
    countryCode: string;
  };
  address?: {
    line1: string;
  };
  location?: {
    longitude: string;
    latitude: string;
  };
}

export interface TicketmasterResponse {
  _embedded?: {
    events: TicketmasterEvent[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
