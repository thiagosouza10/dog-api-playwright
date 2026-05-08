import { test, expect } from '@playwright/test';
import { validarSchemas } from '../utils/schemas/validador-schema.js';
import { schema } from '../utils/schemas/GET-imagens-raca-random.js';
import { DogService } from '../utils/services/dog-service.js';


test.describe('GET-Lista uma única imagem aleatória da lista de Cães', () => {
    /** @type {DogService} */
    let dogService;

    test.beforeEach(async ({ request }) => {
        dogService = new DogService(request);
    });

    test('Deve validar contrato', async ({ request }, testInfo) => {
        const { response, body } = await dogService.getBreedImageRandom(testInfo);

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');
        validarSchemas.validarSchema({ body: body, schema: schema });
    });

    test('Deve retornar imagem válida para raças aleatórias', async ({ request }, testInfo) => {
        const { response, body } = await dogService.getBreedImageRandom(testInfo);

        expect(response.status()).toBe(200);
        expect(body.status).toBe('success');
        expect(body).toBeInstanceOf(Object);
        expect(body.message).toMatch(/^https:\/\/images\.dog\.ceo\/breeds\/.+\.jpg$/);
    });
});