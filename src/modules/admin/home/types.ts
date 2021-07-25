export interface assignVideoRequestData {
  id: number;
  userId: number[];
}

export interface createAndEditVideoRequestData {
  id?: number;
  name: string;
  url: string;
  description?: string;
}

export interface Message {
  type: string;
  text: string;
}
