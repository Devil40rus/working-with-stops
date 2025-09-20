export interface ISite {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface ICost {
  from_id: number;
  to_id: number;
  cost: number;
  iwait: number;
  inveht: number;
  xnum: number;
  xpen: number;
}

export interface IAppState {
  sites: ISite[];
  costs: ICost[];
  selectedSiteId: number | null;
  loading: boolean;
  error: string | null;
}

export interface ICostInfo {
  cost: number;
  iwait: number;
  inveht: number;
  xnum: number;
  xpen: number;
}
