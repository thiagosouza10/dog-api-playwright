import { test, expect } from '@playwright/test';
import { path } from '../utils/paths.js';
import { validarSchemas } from '../utils/schemas/validador-schema.js';
import { schema } from '../utils/schemas/GET-racas.js';
import { anexarResponseRelatorio } from '../utils/utils.js';

const pathBreedsAll = path.breedsAll();

test.describe(`GET-Listagem de raças de cães - ${pathBreedsAll}`, () => {

    test('Deve validar contrato', async ({ request }, testInfo) => {
        const response = await request.get(pathBreedsAll);
        await anexarResponseRelatorio(testInfo, response);
        expect(response.status()).toBe(200);
        await expect(response.headers()['content-type']).toContain('application/json');
        const body = await response.json();
        validarSchemas.validarSchema({ body: body, schema: schema });
    });

    test('Deve retornar todas as raças de cães disponíveis', async ({ request }, testInfo) => {
        const response = await request.get(pathBreedsAll);
        await anexarResponseRelatorio(testInfo, response);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.status).toBe('success');
        expect(body.message).toBeDefined();
        expect(body.message).toBeInstanceOf(Object);
        expect(Object.keys(body.message).length).toBeGreaterThan(0);
    });

    test('Deve validar raça e sub-raças do bulldog', async ({ request }, testInfo) => {
        const response = await request.get(pathBreedsAll);
        await anexarResponseRelatorio(testInfo, response);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.status).toBe('success');
        expect(body.message.bulldog).toBeDefined();
        expect(body.message.bulldog).toBeInstanceOf(Array);
        expect(body.message.bulldog).toEqual(
            expect.arrayContaining(['french'])
        );
    });

    test('Deve retornar 404 para endpoint inválido', async ({ request }) => {
        const response = await request.get('/breeds/list/invalid');
        expect(response.status()).toBe(404);
    });
});