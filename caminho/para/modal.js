document.addEventListener('DOMContentLoaded', function() {
    // Elementos dos modais
    const modalCadastro = document.getElementById('formulario-modal');
    const modalCadastroOpcaoAliado = document.getElementById('formulario-modal-opcao-aliado');
    const modalCadastroOpcaoAliante = document.getElementById('formulario-modal-opcao-aliante');
    const modalIndicacao = document.getElementById('modal-indicacao');// NOVO
    const modalConfirmacao = document.getElementById('modal-confirmacao');
    const formCadastro = document.getElementById('granulado');
    const formCadastroOpcaoAliado = document.getElementById('granulado-opcao-aliado');  
    const formCadastroOpcaoAliante = document.getElementById('granulado-opcao-aliante');
    const formIndicacao = document.getElementById('form-indicacao');
    const modalConfirmacao2 = document.getElementById('modal-confirmacao-2');
    const formConfirmacao2 = document.getElementById('form-confirmacao-2');
    const modalMuitoObrigado2= document.getElementById('modal-muito-obrigado');
    const modalOpcaoSim = document.getElementById('modal-opcao-sim');
    const modalOpcaoNao = document.getElementById('modal-opcao-nao');
    const formOpcaoSim = document.getElementById('form-opcao-sim');
    const formOpcaoNao = document.getElementById('form-opcao-nao');
    const modalObrigadoEmpresa = document.getElementById('modal-obrigado-empresa');
    const modalFaleConosco = document.getElementById('modal-fale-conosco');
    const formFaleConosco = document.getElementById('form-fale-conosco');
    const espaco = document.getElementById('espaco');
    const modalObrigadoFale= document.getElementById('modal-fale-obrigado');


  

    modalObrigadoFale.addEventListener('submit', function(e) {
      e.preventDefault();
      // Aqui você pode adicionar a lógica para o envio do formulário ObrigadoFale

      abrirModal(modalObrigadoFale); // Abre o modal de agradecimento   
    
    });
    
    
    formFaleConosco.addEventListener('submit', async function(e) { 
      e.preventDefault();

        fecharModal(modalFaleConosco);
        abrirModal(modalObrigadoFale); // Abre o modal de agradecimento  

    });

    formOpcaoSim.addEventListener('submit', function(e) {
        e.preventDefault();
        fecharModal(modalOpcaoSim); // Fecha o modal de opção sim
        abrirModal(modalObrigadoEmpresa); // Abre o modal de agradecimento para empresa
    });

    formOpcaoNao.addEventListener('submit', function(e) {
        e.preventDefault();
        fecharModal(modalOpcaoNao); // Fecha o modal de opção não
        abrirModal(modalObrigadoEmpresa); // Abre o modal de agradecimento para aliados
    });
    
    formConfirmacao2.addEventListener('submit', function(e) {   
        e.preventDefault();
    
        // 1. Armazena os dados do form principal
        const formData = new FormData(this);
        sessionStorage.setItem('dadosFormPrincipal', JSON.stringify(Object.fromEntries(formData)));
    
        // 2. Fecha o modal principal (sem abrir outros modais)
        if (espaco.value === 'sim') {
            fecharModal(modalConfirmacao2); 
            abrirModal(modalOpcaoSim); // Modal para ALIADOS
         } else if (espaco.value === 'não') {
             fecharModal(modalConfirmacao2); 
             abrirModal(modalOpcaoNao); // Modal para ALIANTES
         }  
     
    });
 

    
    formIndicacao.addEventListener('submit', function(e) {
        e.preventDefault();
        // Fecha o modal de indicação
        fecharModal(modalIndicacao); // Apenas fecha o modal de indicação
        abrirModal(modalMuitoObrigado2); // Modal para agradecimento
        formIndicacao.reset();
    });
    

// Função para abrir modal 
function abrirModal(modal) {
  console.log('abrirModal chamado para:', modal);

  if (!modal) {
      console.warn('Nenhum modal foi passado para abrirModal!');
      return;
  }

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  console.log('Modal aberto com sucesso');
}

// Função para fechar modal
function fecharModal(modal) {
  console.log('fecharModal chamado para:', modal);

  if (!modal) {
      console.warn('Nenhum modal foi passado para fecharModal!');
      return;
  }

  modal.style.display = 'none';
  document.body.style.overflow = 'auto';

  if (modal === modalCadastro) {
      console.log('Resetando formCadastro');
      formCadastro.reset();
      document.getElementById('comunidade-select').classList.remove('campo-invalido');
  }

  if (modal === modalIndicacao) {
      console.log('Resetando formIndicacao');
      formIndicacao.reset();
  }

  console.log('Modal fechado com sucesso');
}


    // ABRIR MODAL CADASTRO
    document.querySelectorAll('.abrir-form-cadastro').forEach(botao => {
        botao.addEventListener('click', function() {
            formCadastro.reset();
            abrirModal(modalCadastro);
        });
    });
    
    // ABRIR MODAL CADASTRO OPÇÃO ALIADO
    document.querySelectorAll('.abrir-form-cadastro-opcao-aliado').forEach(botao => {
        botao.addEventListener('click', function() {
            formCadastro.reset();
            abrirModal(modalCadastroOpcaoAliado);
        });
    });

    // ABRIR MODAL CADASTRO OPÇÃO ALIANTE
    document.querySelectorAll('.abrir-form-cadastro-opcao-aliante').forEach(botao => {
        botao.addEventListener('click', function() {
            formCadastro.reset();
            abrirModal(modalCadastroOpcaoAliante);
        });
    });

    // ABRIR MODAL FORM FINALf Form-fale-conosco
    document.querySelectorAll('.fale-conosco').forEach(botao => {
      botao.addEventListener('click', function() {
        abrirModal(modalFaleConosco);
      });
    });

    // ABRIR MODAL INDICAÇÃO 
    document.querySelectorAll('.abrir-modal-indicacao').forEach(botao => {
        botao.addEventListener('click', function() {
        fecharModal(modalConfirmacao);
        abrirModal(modalIndicacao);
    })
    });

    // FECHAR com botão de fechar
    document.querySelectorAll('.botao-fechar').forEach(function(botao) {
        botao.addEventListener('click', function() {
            const modal = this.closest('.modal');
            fecharModal(modal);
        });
    });

    // FECHAR clicando fora do conteúdo
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            fecharModal(e.target);
        }
    });

    // FECHAR com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modaisAbertos = document.querySelectorAll('.modal[style="display: block;"]');
            modaisAbertos.forEach(fecharModal);
        }
    });

    // SUBMISSÃO DO CADASTRO
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();

        const comunidade = document.getElementById('comunidade-select');
        if (!comunidade.value) {
            comunidade.classList.add('campo-invalido');
            alert('Por favor, selecione uma opção para Comunidade.');
            comunidade.focus();
            return;
        }
    // Abre o modal correspondente
    if (comunidade.value === 'ALIADO') {
        fecharModal(modalCadastro); 
        abrirModal(modalConfirmacao2); // Modal para ALIANTES
    } else if (comunidade.value === 'ALIANTE') {
        fecharModal(modalCadastro); 
        abrirModal(modalConfirmacao); // Modal para ALIADOS
    }


    });

    // SUBMISSÃO DO CADASTRO OPÇÃO ALIADO
    formCadastroOpcaoAliado.addEventListener('submit', function(e) {
        e.preventDefault();
        fecharModal(modalCadastroOpcaoAliado);
        abrirModal(modalConfirmacao2); // Modal para ALIADOS
    });

    // SUBMISSÃO DO CADASTRO OPÇÃO ALIANTE
    formCadastroOpcaoAliante.addEventListener('submit', function(e) {
        e.preventDefault();
        fecharModal(modalCadastroOpcaoAliante);
        abrirModal(modalConfirmacao); // Modal para ALIANTES
    });

 /*    // SUBMISSÃO DA INDICAÇÃO (validação básica)
    formIndicacao.addEventListener('submit', function(e) {
        e.preventDefault();

       const estado = document.getElementById('estado');
        const cidade = document.getElementById('cidade');

        if (!estado.value) {
            estado.classList.add('campo-invalido');
            alert('Por favor, selecione um estado.');
            estado.focus();
            return;
        }

        if (!cidade.value) {
            cidade.classList.add('campo-invalido');
            alert('Por favor, selecione uma cidade.');
            cidade.focus();
            return;
        }

        // Aqui você pode enviar os dados via fetch ou outro método

        alert('Indicação enviada com sucesso!');
        fecharModal(modalIndicacao);
    });*/
});

// ---------------------------
// CARREGAR ESTADOS E CIDADES
// ---------------------------




let dadosEstados = [];

function carregarJSON(caminho) {
  return fetch(caminho)
    .then(res => {
      if (!res.ok) throw new Error(`Erro ao carregar ${caminho}`);
      return res.json();
    });
}

carregarJSON('estados-cidades.json')
  .catch(() => carregarJSON('../estados-cidades.json'))
  .then(data => {
    dadosEstados = data.estados;

    const estadoSelects = document.querySelectorAll('.estado');

    estadoSelects.forEach(estadoSelect => {
      // Preenche os estados
      dadosEstados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.sigla;
        option.textContent = estado.nome;
        estadoSelect.appendChild(option.cloneNode(true));
      });

      // Ao mudar o estado
      estadoSelect.addEventListener('change', function () {
        const siglaSelecionada = this.value;

        const form = this.closest('form');
        const cidadeSelect = form.querySelector('.cidade');

        if (!cidadeSelect) {
          console.warn('Select .cidade não encontrado!');
          return;
        }

        cidadeSelect.innerHTML = '<option value="" selected disabled hidden>SELECIONE UMA CIDADE</option>';
        cidadeSelect.disabled = true;

        const estadoSelecionado = dadosEstados.find(estado => estado.sigla === siglaSelecionada);

        if (estadoSelecionado) {
          estadoSelecionado.cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade;
            option.textContent = cidade;
            cidadeSelect.appendChild(option);
          });

          cidadeSelect.disabled = false;
        }
      });
    });
  })
  .catch(erro => {
    console.error('Erro ao carregar estados e cidades:', erro);
  });



 
  /* abaixo menu com overlay versao mobile*/ 
  
  let btnMenu = document.getElementById('btn-abrir-menu')
  let menu = document.getElementById('menu-mobile')
  let overlay = document.getElementById('overlay-menu')
  
  btnMenu.addEventListener('click',()=>{
      menu.classList.add('abrir-menu')
  })
  
  menu.addEventListener('click',()=>{
      menu.classList.remove('abrir-menu')
  })
  
  overlay.addEventListener('click',()=>{
      menu.classList.remove('abrir-menu')
  })
  

// ==============================================
// FUNÇÕES GERAIS
// ==============================================

/**
 * Configura envio para forms SIMPLES (antigos)
 * @param {string} nomeDoForm - ID do formulário (atributo 'name' ou 'id')
 * @param {string} scriptURL - URL do Google Apps Script
 */
function configurarEnvioFormulario(nomeDoForm, scriptURL) {
    const form = document.forms[nomeDoForm];
    if (!form) {
      console.warn(`Formulário "${nomeDoForm}" não encontrado.`);
      return;
    }
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      enviarFormulario(this, scriptURL);
    });
  }
  
  /**
   * Envia dados para o Google Sheets (usado por TODOS os forms)
   * @param {HTMLFormElement} form - Elemento do formulário
   * @param {string} url - URL do script
   */
  function enviarFormulario(form, url) {
    const formData = new FormData(form);
    // Todos os modais (independente de qual está aberto)
    const todosModais = document.querySelectorAll('.modal');
  
    // Para modais secundários: combina com dados do form principal
    if (form.name === 'form-opcao-sim' || form.name === 'form-opcao-nao') {
      const dadosPrincipal = JSON.parse(sessionStorage.getItem('dadosFormPrincipal'));
      if (dadosPrincipal) {
        for (const key in dadosPrincipal) {
          if (!formData.has(key)) {
            formData.append(key, dadosPrincipal[key]);
          }
        }
      }
    }
  
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) throw new Error('Erro no servidor, tente novamente em outro momento.');
      return response.json();
    })
    .then(data => {
      /*alert('Dados salvos com sucesso!');
      form.reset();*/
      
      // Limpa storage e fecha modal (apenas para forms secundários)
      if (form.name === 'form-opcao-sim' || form.name === 'form-opcao-nao') {
        sessionStorage.removeItem('dadosFormPrincipal');
        fecharModal(form.closest('.modal'));
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Falha ao enviar os dados. Por favor, tente novamente.');
        // Fechar todos os modais em caso de erro
        todosModais.forEach(modal => fecharModal(modal)); // Fecha todos os modais
    });
  }
  
  // ==============================================
  // CONFIGURAÇÃO DOS FORMULÁRIOS
  // ==============================================
  
  // Forms ANTIGOS (funcionam como antes)
  configurarEnvioFormulario(
    'formulario-contato',
    'https://script.google.com/macros/s/AKfycbzEIhkSbkVeoYd0_1AxGUH3Tu8DnB1CR3zUI56F5tGeFyEJejX2HQf3o1hJOHW1rU-VXQ/exec'
  );
  
  configurarEnvioFormulario(
    'formulario-contato-opcao-aliado',
    'https://script.google.com/macros/s/AKfycbzEIhkSbkVeoYd0_1AxGUH3Tu8DnB1CR3zUI56F5tGeFyEJejX2HQf3o1hJOHW1rU-VXQ/exec'
  );

  configurarEnvioFormulario(
    'formulario-contato-opcao-aliante',
    'https://script.google.com/macros/s/AKfycbzEIhkSbkVeoYd0_1AxGUH3Tu8DnB1CR3zUI56F5tGeFyEJejX2HQf3o1hJOHW1rU-VXQ/exec'
  );
  

  configurarEnvioFormulario(
    'formulario-indicacao',
    'https://script.google.com/macros/s/AKfycbw5M1YwrgDz-KBmHy5ZieEb4g4RHIOKD-_HaqLRwSNVCwEQOirjAQlSSj0JMaCdHj12/exec'
  );
  
  configurarEnvioFormulario(
    'form-fale-conosco',
    'https://script.google.com/macros/s/AKfycbzMN1GPE9tEhlrv7d_t39ZmTtaeeXtOUE0FXJBGXBWNmneIOZo3w0I3jeEKOMeOYMxiww/exec'
  );
  


  // NOVO FORM PRINCIPAL (form-confirmacao-2)
  document.forms['form-confirmacao-2']?.addEventListener('submit', function(e) {
    e.preventDefault();
  
    console.log('Form recebido:', this);
    console.log('É um formulário HTML?', this instanceof HTMLFormElement);
  
    // 1. Armazena dados do form principal
    const formData = new FormData(this);
    sessionStorage.setItem('dadosFormPrincipal', JSON.stringify(Object.fromEntries(formData)));
  
    // 2. Abre modal baseado na seleção "espaco"
    const espacoValue = document.getElementById('espaco').value;
    if (espacoValue === 'sim') {
      fecharModal(this.closest('.modal'));
      abrirModal(document.getElementById('modal-opcao-sim'));
    } else if (espacoValue === 'nao') {
      fecharModal(this.closest('.modal'));
      abrirModal(document.getElementById('modal-opcao-nao'));
    }
  });
  
  
  // Forms SECUNDÁRIOS (Sim/Não) - Usam a função geral
  configurarEnvioFormulario(
    'form-opcao-sim',
    'https://script.google.com/macros/s/AKfycbxu9KDB_AwYn1duuFbN-E0NXqyh4I0SwUpylYOnFb43kWfnLUHVKQJpB7iVWIY6UWxm/exec'
  );
  
  configurarEnvioFormulario(
    'form-opcao-nao',
    'https://script.google.com/macros/s/AKfycbxu9KDB_AwYn1duuFbN-E0NXqyh4I0SwUpylYOnFb43kWfnLUHVKQJpB7iVWIY6UWxm/exec'
  );
  
  // ==============================================
  // FUNÇÕES AUXILIARES (MODAIS)
  // ==============================================
  
  function abrirModal(modal) {
    if (modal) modal.style.display = 'block';
  }
  
  function fecharModal(modal) {
    if (modal) modal.style.display = 'none';
  }


  document.querySelectorAll('.campoTelefone').forEach(function(input) {
    input.addEventListener('input', function(e) {
        // Remove tudo que não é número
        let value = this.value.replace(/\D/g, '');
        
        // Limita a 11 dígitos (DDD + 9 números)
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        // Aplica a máscara: (00) 00000-0000
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue = `(${value.substring(0, 2)}`;
        }
        if (value.length > 2) {
            formattedValue += `) ${value.substring(2, 7)}`;
        }
        if (value.length > 7) {
            formattedValue += `-${value.substring(7, 11)}`;
        }
        
        this.value = formattedValue;
    });

    // Permite apagar sem "pular" caracteres fixos
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && this.value.length > 0) {
            // Se o último caractere é um símbolo da máscara, remove ele também
            const lastChar = this.value.slice(-1);
            if ([')', ' ', '-'].includes(lastChar)) {
                e.preventDefault();
                this.value = this.value.slice(0, -1);
            }
        }
    });
});

const textareas = document.querySelectorAll('.textarea-limitada');

textareas.forEach(textarea => {
  const contador = textarea.parentElement.querySelector('.contador-caracteres');

  textarea.addEventListener('input', () => {
    contador.textContent = `${textarea.value.length} / ${textarea.maxLength}`;
  });
});




function abrirInstagram(event) {
  event.preventDefault();

  // Variável para controlar o timeout
  let timeoutId;

  // Verifica se a página perdeu o foco (sinal de que o app foi aberto)
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      // Se a página voltou a ter foco antes do timeout, cancela o aviso
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  };

  // Tenta abrir o app do Instagram
  window.location = "instagram://user?username=atividade.preta";

  // Configura o timeout e o listener de visibilidade
  timeoutId = setTimeout(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    if (window.confirm("Não conseguimos abrir o app do Instagram. Gostaria de abrir o link no navegador?")) {
      window.open("https://www.instagram.com/atividade.preta/", "_blank");
    }
  }, 1500);

  document.addEventListener('visibilitychange', handleVisibilityChange);
}

