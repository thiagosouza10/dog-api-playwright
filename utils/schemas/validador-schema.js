import { expect } from '@playwright/test';
import Ajv from "ajv";
import addFormats from "ajv-formats";
const _ajv = new Ajv({ allErrors: true });
addFormats(_ajv);

export const validarSchemas = {
    validarSchema({ body, schema }) {
        const _valida = _ajv.compile(schema);
        const _validacao = _valida(body);
        expect(_validacao, `Contrato inválido: ${JSON.stringify(_valida.errors, null, 2)}`).toBe(true);
    }
};