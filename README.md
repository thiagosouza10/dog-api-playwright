# Projeto Dog API - Testes Automatizados (Playwright)

Projeto de testes automatizados para a Dog API utilizando Playwright.
- **Dog API*: https://dog.ceo/dog-api/documentation

## Pré-requisitos

- **Node.js**: https://nodejs.org/pt-br
- **Git**: https://git-scm.com/install/windows

## Arquitetura

```
├── .github/workflows/  # GitHub Actions (playwright.yml)
├── docs/               # Documentação e evidências
│   ├── bugs/
│   ├── casos-de-testes/
│   └── evidencias/
├── tests/              # Specs de testes
│   ├── GET-imagens-raca.spec.js
│   ├── GET-imagens-raca-random.spec.js
│   └── GET-racas.spec.js
├── utils/              # Utilitários e schemas
│   ├── paths.js
│   ├── utils.js
│   └── schemas/
│       ├── GET-imagens-raca.js
│       ├── GET-imagens-raca-random.js
│       ├── GET-racas.js
│       └── validador-schema.js
├── playwright.config.js
└── package.json
```

## Pasta docs

| Pasta | Descrição |
|-------|-----------|
| `bugs/` | Issues e bugs encontrados |
| `casos-de-testes/` | Casos de teste documentados |
| `evidências/` | Screenshots e vídeos de execuções |

## Passo a Passo para Executar os testes

```bash
abra o terminal

# Clonar o projeto
git clone https://github.com/thiagosouza10/dog-api-playwright.git

# Entrar na pasta do projeto
cd dog-api-playwright

# Instalar dependências
npm install

# Executar testes
npm run tests

# Gerar relatório
npm run report

```

## Rodando os testes no GitHub Actions

### Como executar manualmente

1. Acesse a aba **Actions** no repositório
2. Selecione o workflow **Playwright Tests**
3. Clique em **Run workflow**
4. Escolha a branch (ex: main)
5. Clique em **Run workflow**

### Visualizar relatório dos testes

Após a execução:
- O report é publicado automaticamente no GitHub Pages
- Acesse o link em: https://thiagosouza10.github.io/dog-api-playwright/