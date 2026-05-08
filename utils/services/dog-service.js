import { expect } from '@playwright/test';
import { anexarResponseRelatorio } from '../../utils/utils.js';

export class DogService {

    constructor(request) {
        this.request = request;
        this.endpoints = {
            brees_list_all : '/api/breeds/list/all',
            breed_image_random: '/api/breeds/image/random',
            breed_images: (breed) => `/api/breed/${breed}/images`
        };
    }

    async #handleResponse(testInfo, response) {
        await anexarResponseRelatorio(testInfo, response);
        let body;
        try {
            body = await response.json();
        } catch (e) {
            body = await response.text().catch(() => null);
        }
        return { response, body };
    }

    async getBreedsListAll(testInfo, path=this.endpoints.brees_list_all) {
        const response = await this.request.get(path);
        return this.#handleResponse(testInfo, response);
    }

    async getBreedImages(testInfo, breed) {
        const response = await this.request.get(this.endpoints.breed_images(breed));
        return this.#handleResponse(testInfo, response);
    }

    async getBreedImageRandom(testInfo) {
        const response = await this.request.get(this.endpoints.breed_image_random);
        return this.#handleResponse(testInfo, response);
    }
}