export interface Store {
  id: string,
  deleted: boolean;
  location: {lat: string, long: string},
  title: string,
  description: string
}
