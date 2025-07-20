/**
 * Script de teste para verificar se o sistema está funcionando
 * Execute: node teste-sistema.js
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testarSistema() {
  console.log('🧪 Iniciando testes do sistema Vestiário...\n');

  // Teste 1: Verificar se o servidor está rodando
  console.log('1️⃣ Testando se o servidor está rodando...');
  try {
    const response = await fetch(`${BASE_URL}/api/teste`);
    const data = await response.json();
    
    if (data.status === 'success') {
      console.log('✅ Servidor funcionando corretamente');
    } else {
      console.log('❌ Servidor retornou erro');
    }
  } catch (error) {
    console.log('❌ Servidor não está rodando. Execute: npm start');
    return;
  }

  // Teste 2: Testar envio de formulário
  console.log('\n2️⃣ Testando envio de formulário...');
  try {
    const dadosTeste = {
      nome: 'João Silva',
      email: 'joao@teste.com',
      telefone: '11999887766',
      tipo: 'Jogador'
    };

    const response = await fetch(`${BASE_URL}/api/enviar-formulario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosTeste)
    });

    const result = await response.json();
    
    if (result.status === 'success') {
      console.log('✅ Formulário enviado com sucesso');
      console.log('📝 Resposta:', result.message);
    } else {
      console.log('❌ Erro ao enviar formulário');
      console.log('📝 Erro:', result.message);
      console.log('💡 Verifique se o Google Apps Script está configurado corretamente');
    }
  } catch (error) {
    console.log('❌ Erro na comunicação com o servidor');
    console.log('📝 Erro:', error.message);
  }

  // Teste 3: Verificar página principal
  console.log('\n3️⃣ Testando página principal...');
  try {
    const response = await fetch(`${BASE_URL}/`);
    
    if (response.ok) {
      console.log('✅ Página principal carregando corretamente');
    } else {
      console.log('❌ Erro ao carregar página principal');
    }
  } catch (error) {
    console.log('❌ Erro ao acessar página principal');
  }

  console.log('\n🎯 Resumo dos testes:');
  console.log('📋 Para verificar se os dados chegaram ao Google Sheets:');
  console.log('   1. Abra sua planilha do Google Sheets');
  console.log('   2. Verifique se há uma nova linha com os dados de teste');
  console.log('   3. Se não houver dados, verifique a configuração do Google Apps Script');
  
  console.log('\n🔧 Próximos passos se houver problemas:');
  console.log('   1. Verifique se a URL do Google Apps Script está correta no server.js');
  console.log('   2. Confirme se o Google Apps Script está configurado como "Web app"');
  console.log('   3. Verifique se as permissões estão como "Anyone"');
  console.log('   4. Execute a função configurarCabecalho() no Google Apps Script');
}

// Executar testes
testarSistema().catch(console.error); 