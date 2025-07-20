# Vestiário - Sistema de Pré-lista

Este projeto é uma landing page para captura de leads interessados no produto Vestiário, com integração automática ao Google Sheets.

## 🚀 Como Configurar

### 1. Configuração do Google Sheets

#### Passo 1: Criar a Planilha
1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Renomeie para "Vestiário - Pré-lista"

#### Passo 2: Configurar o Google Apps Script
1. Na planilha, vá em **Extensões > Apps Script**
2. Substitua todo o código pelo conteúdo do arquivo `google-apps-script.js`
3. Salve o projeto (Ctrl+S)
4. Clique em **Deploy > New deployment**
5. Configure:
   - **Type**: Web app
   - **Execute as**: Me
   - **Who has access**: Anyone
6. Clique em **Deploy**
7. **Copie a URL gerada** (será algo como: `https://script.google.com/macros/s/.../exec`)

#### Passo 3: Configurar o Cabeçalho da Planilha
1. No Google Apps Script, execute a função `configurarCabecalho()`
2. Isso criará as colunas: Nome, E-mail, Telefone, Tipo, Data de Cadastro, Timestamp, Data de Recebimento

### 2. Configuração do Servidor

#### Passo 1: Atualizar a URL do Google Apps Script
1. Abra o arquivo `server.js`
2. Substitua a linha 25 com a URL que você copiou:
```javascript
const GAS_URL = 'SUA_URL_AQUI';
```

#### Passo 2: Instalar Dependências
```bash
npm install
```

#### Passo 3: Executar o Servidor
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 🧪 Testando o Sistema

### 1. Teste do Servidor
Acesse: `http://localhost:3000/api/teste`

### 2. Teste do Google Apps Script
Acesse a URL do seu Google Apps Script diretamente no navegador

### 3. Teste Completo
1. Acesse `http://localhost:3000`
2. Preencha o formulário
3. Verifique se os dados aparecem na planilha

## 📋 Estrutura dos Dados

Os dados salvos na planilha incluem:
- **Nome**: Nome completo do interessado
- **E-mail**: E-mail para contato
- **Telefone**: Número de telefone (apenas números)
- **Tipo**: "Jogador" ou "Dono / Trabalhador / Funcionário"
- **Data de Cadastro**: Data/hora do preenchimento
- **Timestamp**: Timestamp ISO para ordenação
- **Data de Recebimento**: Data/hora de chegada no servidor

## 🔧 Solução de Problemas

### Erro: "Erro ao enviar dados para o Google Sheets"
1. Verifique se a URL do Google Apps Script está correta
2. Confirme se o Google Apps Script está configurado como "Web app"
3. Verifique se as permissões estão como "Anyone"

### Erro: "HTTP error! status: 403"
- O Google Apps Script pode estar com restrições de CORS
- Tente recriar o deployment

### Erro: "Resposta inesperada do Google Apps Script"
- Verifique se o código do Google Apps Script está correto
- Teste a URL diretamente no navegador

### Dados não aparecem na planilha
1. Verifique se executou a função `configurarCabecalho()`
2. Confirme se está na aba correta da planilha
3. Verifique os logs no Google Apps Script

### Problemas com a máscara de telefone
1. **Erro ao digitar números**: A máscara foi melhorada para aceitar qualquer número
2. **Formatação incorreta**: Verifique se está digitando apenas números
3. **Teste a máscara**: Abra `teste-telefone.html` no navegador para testar
4. **Validação**: O sistema aceita números de 10 a 11 dígitos (com ou sem 9º dígito)

### Como testar a máscara de telefone
1. Abra `http://localhost:3000/teste-telefone.html`
2. Teste diferentes formatos de números
3. Tente colar números
4. Execute os testes automáticos

## 📁 Estrutura do Projeto

```
Vestiario/
├── server.js              # Servidor Express
├── package.json           # Dependências
├── public/
│   ├── index.html         # Landing page
│   └── imagens/           # Imagens do projeto
├── google-apps-script.js  # Código para Google Apps Script
└── README.md             # Este arquivo
```

## 🚀 Deploy em Produção

Para colocar em produção, você pode usar:
- **Heroku**: Conecte seu repositório GitHub
- **Vercel**: Deploy automático
- **Railway**: Deploy simples
- **DigitalOcean**: VPS personalizado

Lembre-se de configurar a variável de ambiente `PORT` se necessário.

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do console do navegador
2. Verifique os logs do servidor
3. Teste cada componente individualmente
4. Verifique se todas as URLs estão corretas 