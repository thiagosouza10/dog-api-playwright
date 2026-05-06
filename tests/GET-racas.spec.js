import { test, expect } from '@playwright/test';
import { path } from '../utils/paths.js';
import { validarSchemas } from '../utils/schemas/validador-schema.js';
import { schema } from '../utils/schemas/GET-racas.js';
import { DogService } from '../utils/services/dog-service.js';


test.describe('GET-Listagem de raças de cães', () => {
    let dogService;

    test.beforeEach(async ({ request }) => {
        dogService = new DogService(request);
    });

    test('Deve validar contrato', async ({ request }, testInfo) => {
        const { response, body } = await dogService.getBreedsListAll(testInfo);
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');
        validarSchemas.validarSchema({ body: body, schema: schema });
    });

    test('Deve retornar todas as raças de cães disponíveis', async ({ request }, testInfo) => {
        const { response, body } = await dogService.getBreedsListAll(testInfo);

        expect(response.status()).toBe(200);
        expect(body.status).toBe('success');
        expect(body.message).toBeDefined();
        expect(body.message).toBeInstanceOf(Object);
        expect(Object.keys(body.message).length).toBeGreaterThan(0);
    });

    test('Deve validar raça e sub-raças do bulldog', async ({ request }, testInfo) => {
        const { response, body } = await dogService.getBreedsListAll(testInfo);

        expect(response.status()).toBe(200);
        expect(body.status).toBe('success');
        expect(body.message.bulldog).toBeDefined();
        expect(body.message.bulldog).toBeInstanceOf(Array);
        expect(body.message.bulldog).toEqual(
            expect.arrayContaining(['french'])
        );
    });

    test('Deve retornar 404 para endpoint inválido', async ({ request }, testInfo) => {
        const res  = await dogService.getBreedsListAll(testInfo, '/breeds/list/invalid');

        expect(res.response.status()).toBe(404);
    });
});