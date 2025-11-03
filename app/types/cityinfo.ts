// Tipos para información específica de la ciudad

export interface CityInfo {
  name: string;
  population: number;
  founded?: string;
  altitude?: number;
  nickname?: string;
  famousFor: string[];
  funFact: string;
}

export interface CityInfoResponse {
  success: boolean;
  data?: CityInfo;
  error?: string;
}
