export enum TypesOfSpec {
  pine = "pine",
  spruce = "spruce",
  birch = "birch",
  other = "other",
}

export interface MainTypes {
  id: number;
  lng: number;
  lat: number;
  main_species: TypesOfSpec;
  relative_vol: number;
  age: number;
  size: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface BarData {
  label: string;
  data: number[];
  backgroundColor: string[] | CanvasGradient;
  borderWidth: number;
}

export interface ScatterData {
  label: string;
  data: Coordinate[];
  backgroundColor: string[] | CanvasGradient;
}

export interface PieData {
  data: number[];
  backgroundColor: string[] | CanvasGradient;
}
