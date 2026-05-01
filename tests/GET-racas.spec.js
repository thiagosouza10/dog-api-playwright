import { test, expect } from '@playwright/test';
import { path } from '../utils/paths.js';
import { validarSchemas } from '../utils/schemas/validador-schema.js';
import { schema } from '../utils/schemas/GET-racas.js';


test.describe("GET /breeds/list/all - Deve listar todas as raças de cães", () => {

    test('Deve validar contrato GET /breeds/list/all', async ({ request }, testInfo) => {
        const response = await request.get(path.breedsAll());
        const body = await response.json();
        await testInfo.attach('response', { body: JSON.stringify(body, null, 2) });
        expect(response.status()).toBe(200);
        validarSchemas.validarSchema({ body: body, schema: schema });
    });

    test('Deve retornar todas as raças de cães disponíveis', async ({ request }, testInfo) => {
        const response = await request.get(path.breedsAll());
        const body = await response.json();
        await testInfo.attach('response', { body: JSON.stringify(body, null, 2) });
        expect(response.status()).toBe(200);
    });
});