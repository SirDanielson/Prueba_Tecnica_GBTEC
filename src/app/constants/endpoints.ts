export const ENDPOINTS: Endpoints = {
  searchPhotos: '/search/photos',
  searchRandomPhotos: '/photos/random',
};

interface Endpoints {
  searchPhotos: string;
  searchRandomPhotos: string;
}
