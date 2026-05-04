import { test, expect } from '@playwright/test';
import { path } from '../utils/paths.js';
import { validarSchemas } from '../utils/schemas/validador-schema.js';
import { schema } from '../utils/schemas/GET-imagens-raca.js';
import { anexarResponseRelatorio } from '../utils/utils.js';

const pathBreedsImages = path.breedImages('bulldog');

test.describe(`GET-Listagem de imagens de uma raça específica - ${pathBreedsImages}`, () => {

    test('Deve validar contrato', async ({ request }, testInfo) => {
        const response = await request.get(pathBreedsImages);
        await anexarResponseRelatorio(testInfo, response);
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');
        const body = await response.json();
        validarSchemas.validarSchema({ body: body, schema: schema });
    });

    test('Deve retornar imagens para raça válida', async ({ request }, testInfo) => {
        const response = await request.get(pathBreedsImages);
        await anexarResponseRelatorio(testInfo, response);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.status).toBe('success');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.length).toBeGreaterThan(0);
        body.message.forEach((url) => {
            expect(url).toMatch(/^https:\/\/images\.dog\.ceo\/breeds\/bulldog.*\.jpg$/);
        });
    });

    test('Não Deve retornar imagens para raça que não existe', async ({ request }, testInfo) => {
        const response = await request.get(path.breedImages('gato'));
        await anexarResponseRelatorio(testInfo, response);
        expect(response.status()).toBe(404);
        expect(response.headers()['content-type']).toContain('application/json');
        const body = await response.json();
        expect(body).toEqual({
            "status": "error",
            "message": "Breed not found (main breed does not exist)",
            "code": 404
        });
    });

    test('Não Deve retornar imagens sem parâmetro da raça', async ({ request }, testInfo) => {
        const response = await request.get(path.breedImages(''));
        await anexarResponseRelatorio(testInfo, response);
        expect(response.status()).toBe(404);
        expect(response.headers()['content-type']).toContain('application/json');
        const body = await response.json();
        expect(body).toEqual({
            "status": "error",
            "message": "No route found for \"GET http://dog.ceo/api/breed//images\" with code: 0",
            "code": 404
        });
    });
});