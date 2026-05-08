import { test, expect } from '@playwright/test';
import { validarSchemas } from '../utils/schemas/validador-schema.js';
import { schema } from '../utils/schemas/GET-imagens-raca.js';
import { DogService } from '../utils/services/dog-service.js';


test.describe('GET-Listagem de imagens de uma raça específica', () => {
    /** @type {DogService} */
    let dogService;
    let raca = 'bulldog';

    test.beforeEach(async ({ request }) => {
        dogService = new DogService(request);
    });

    test('Deve validar contrato', async ({ request }, testInfo) => {
        const { response, body } = await dogService.getBreedImages(testInfo, raca);

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');
        validarSchemas.validarSchema({ body: body, schema: schema });
    });

    test('Deve retornar imagens para raça válida', async ({ request }, testInfo) => {
        const { response, body } = await dogService.getBreedImages(testInfo, raca);

        expect(response.status()).toBe(200);
        expect(body.status).toBe('success');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.length).toBeGreaterThan(0);
        body.message.forEach((url) => {
            expect(url).toMatch(/^https:\/\/images\.dog\.ceo\/breeds\/bulldog.*\.jpg$/);
        });
    });

    test('Não Deve retornar imagens para raça que não existe', async ({ request }, testInfo) => {
        const { response, body } = await dogService.getBreedImages(testInfo, 'gato');

        expect(response.status()).toBe(404);
        expect(body).toEqual({
            "status": "error",
            "message": "Breed not found (main breed does not exist)",
            "code": 404
        });
    });

    test('Não Deve retornar imagens sem parâmetro da raça', async ({ request }, testInfo) => {
        const { response, body } = await dogService.getBreedImages(testInfo, " ");

        expect(response.status()).toBe(404);
        expect(body).toEqual({
            "status": "error",
            "message": "Breed not found (main breed does not exist)",
            "code": 404
        });
    });
});