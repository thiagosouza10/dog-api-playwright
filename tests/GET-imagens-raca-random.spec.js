import { test, expect } from '@playwright/test';
import { path } from '../utils/paths.js';
import { validarSchemas } from '../utils/schemas/validador-schema.js';
import { schema } from '../utils/schemas/GET-imagens-raca-random.js';
import { anexarResponseRelatorio } from '../utils/utils.js';

const pathBreedsImagesRandom = path.breedImageRandom();

test.describe(`GET-Lista uma única imagem aleatória da lista de Cães - ${pathBreedsImagesRandom}`, () => {

    test('Deve validar contrato', async ({ request }, testInfo) => {
        const response = await request.get(pathBreedsImagesRandom);
        await anexarResponseRelatorio(testInfo, response);
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');
        const body = await response.json();
        validarSchemas.validarSchema({ body: body, schema: schema });
    });

    test('Deve retornar imagem válida para raças aleatórias', async ({ request }, testInfo) => {
        const response = await request.get(pathBreedsImagesRandom);
        await anexarResponseRelatorio(testInfo, response);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.status).toBe('success');
        expect(body).toBeInstanceOf(Object);
        expect(body.message).toMatch(/^https:\/\/images\.dog\.ceo\/breeds\/.+\.jpg$/);
    });
});