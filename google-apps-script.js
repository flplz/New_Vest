/**
 * Google Apps Script para receber dados do formulário e salvar no Google Sheets
 * 
 * INSTRUÇÕES DE CONFIGURAÇÃO:
 * 
 * 1. Abra o Google Sheets onde você quer salvar os dados
 * 2. Vá em Extensões > Apps Script
 * 3. Substitua todo o código pelo código abaixo
 * 4. Salve o projeto
 * 5. Clique em "Deploy" > "New deployment"
 * 6. Escolha "Web app"
 * 7. Configure:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 8. Clique em "Deploy"
 * 9. Copie a URL gerada e atualize no arquivo server.js
 */

function doPost(e) {
  try {
    // Obter a planilha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Obter os dados enviados
    const dados = e.parameter;
    
    // Preparar os dados para inserção
    const rowData = [
      dados.nome || '',
      dados.email || '',
      dados.telefone || '',
      dados.tipo || '',
      dados.data || new Date().toLocaleString('pt-BR'),
      dados.timestamp || new Date().toISOString(),
      new Date().toLocaleString('pt-BR') // Data de recebimento
    ];
    
    // Inserir na próxima linha disponível
    sheet.appendRow(rowData);
    
    // Retornar resposta de sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Dados salvos com sucesso!',
        row: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Erro no Google Apps Script:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Erro ao salvar dados: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Rota GET para teste
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Google Apps Script funcionando!',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * FUNÇÃO PARA CONFIGURAR O CABEÇALHO DA PLANILHA
 * Execute esta função uma vez para criar o cabeçalho
 */
function configurarCabecalho() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Verificar se já existe cabeçalho
  if (sheet.getRange(1, 1).getValue() !== '') {
    console.log('Cabeçalho já existe!');
    return;
  }
  
  // Criar cabeçalho
  const cabecalho = [
    'Nome',
    'E-mail', 
    'Telefone',
    'Tipo',
    'Data de Cadastro',
    'Timestamp',
    'Data de Recebimento'
  ];
  
  sheet.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]);
  
  // Formatar cabeçalho
  sheet.getRange(1, 1, 1, cabecalho.length)
    .setFontWeight('bold')
    .setBackground('#ff8800')
    .setFontColor('white');
    
  console.log('Cabeçalho configurado com sucesso!');
} 