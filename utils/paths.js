export const path = {
    breedsAll: () => '/api/breeds/list/all',
    breedImages: (breed = '${breed}') => `/api/breed/${breed}/images`,
    breedImageRandom: () => '/api/breeds/image/random'
};