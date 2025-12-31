
export interface RouteOption {
  type: string;
  duration: string;
  distance: string;
  cost: string;
  description: string;
  advantages: string[];
  emissions?: string;
}

export interface RouteResponse {
  bestRoute: RouteOption;
  alternatives: RouteOption[];
}

export interface Preferences {
  fastest: boolean;
  cheapest: boolean;
  mostComfortable: boolean;
  ecoFriendly: boolean;
}
