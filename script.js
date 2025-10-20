/* A G E N D A M EN T O */

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('form');
    const inputTelefone = document.getElementById('telefone');
    const selectEspecialidade = document.getElementById('especialidade');
    const selectMedico = document.getElementById('medico');
    const inputData = document.getElementById('data');

    inputTelefone.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); 

        if (value.length > 0) {
            value = '(' + value;
        }
        if (value.length > 3) {
            value = value.substring(0, 3) + ') ' + value.substring(3);
        }
        if (value.length > 9 && value.length <= 14) { 
            value = value.substring(0, 9) + '-' + value.substring(9);
        }
        if (value.length > 14) { 
            value = value.substring(0, 10) + '-' + value.substring(10, 14);
      
            if (value.length > 15) {
                value = value.substring(0, 10) + value.substring(11, 15) + '-' + value.substring(15, 19);
            }
        }
        

        let ddd = value.substring(1, 3);
        let parte1 = value.substring(5, 9);
        let parte2 = value.substring(10, 14);

        if (value.length === 15) { 
            value = `(${ddd}) ${parte1}-${parte2}`;
        } else if (value.length === 16) {
            let noveAdicional = value.substring(5, 6);
            parte1 = value.substring(6, 10);
            parte2 = value.substring(11, 15);
            value = `(${ddd}) ${noveAdicional}${parte1}-${parte2}`;
        }


        e.target.value = value;
    });

    const medicosPorEspecialidade = {
        '': [{ value: '', text: 'Selecione o Médico' }], 
        'clinica_geral': [
            { value: 'dra_andressa_clinica', text: 'Dra. Andressa (Clínica Geral)' }
        ],
        'cardiologia': [
            { value: 'dr_fernandes_cardio', text: 'Dr. Fernandes (Cardiologista)' }
        ],
        'dermatologia': [
            { value: 'dra_emilia_dermato', text: 'Dra. Emilia (Dermatologista)' }
        ],
        'odontologia': [
            { value: 'dra_yang_odonto', text: 'Dra. Yang (Dentista)' }
        ],
        'pediatria': [
            { value: 'dr_gustavo_pediatra', text: 'Dr. Gustavo (Pediatra)' }
        ]
    };

    selectEspecialidade.addEventListener('change', function() {
        const especialidadeSelecionada = this.value;
        const medicosDisponiveis = medicosPorEspecialidade[especialidadeSelecionada] || medicosPorEspecialidade[''];

        selectMedico.innerHTML = '';

        medicosDisponiveis.forEach(medico => {
            const option = document.createElement('option');
            option.value = medico.value;
            option.textContent = medico.text;
            selectMedico.appendChild(option);
        });
    });

    function setMinDate() {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
        const ano = hoje.getFullYear();
        const dataMinima = `${ano}-${mes}-${dia}`;
        inputData.min = dataMinima;
    }

    setMinDate();

    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); 

        if (!formulario.checkValidity()) {
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            return;
        }

        const dados = new FormData(formulario);
        const agendamento = {};
        
        for (let [key, value] of dados.entries()) {
            if (key === 'servico[]') {
                if (!agendamento['servicos_adicionais']) {
                    agendamento['servicos_adicionais'] = [];
                }
                agendamento['servicos_adicionais'].push(value);
            } else {
                agendamento[key] = value;
            }
        }
        
        const mensagemSucesso = `
            ✅ Agendamento Solicitado com Sucesso! ✅

            Detalhes:
            Paciente: ${agendamento.nome}
            E-mail: ${agendamento.email}
            Telefone: ${agendamento.telefone}
            Idade: ${agendamento.idade} anos
            Data/Hora: ${agendamento.data} às ${agendamento.hora}
            Especialidade: ${agendamento.especialidade}
            Médico: ${agendamento.medico}
            Conveniado: ${agendamento.conveniado === 'sim' ? 'Sim' : 'Não'}
            Serviços Adicionais: ${agendamento.servicos_adicionais ? agendamento.servicos_adicionais.join(', ') : 'Nenhum'}
            Sintomas: ${agendamento.sintomas || 'Não relatados'}
        `;

        console.log('Dados do Agendamento:', agendamento);
        alert(mensagemSucesso);
    });

    selectEspecialidade.dispatchEvent(new Event('change'));
});




/* I N D E X */

const loginForm = document.getElementById('loginForm');
const msgErro = document.getElementById('msgErro');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value;

    if (usuario === 'admin' && senha === '12345') {

        window.location.href = 'agendamento.html';
    } else {
        msgErro.textContent = 'Usuário ou senha inválidos';
    }
});
