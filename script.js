document.addEventListener('DOMContentLoaded', () => {
    const btnSalvarRegistro = document.getElementById("registrarMovimentacao");
    const tabela = document.getElementById('comodatoTable').getElementsByTagName('tbody')[0];

    let indiceEdicao = null; // Para armazenar o índice do registro em edição

    // CARREGAR REGISTROS DO LOCALSTORAGE
    carregarRegistros();

    // SALVAR REGISTRO OU EDIÇÃO
    btnSalvarRegistro.addEventListener('click', () => {
        const equipamento = document.getElementById('equipamento').value;
        const emprestado = document.getElementById('emprestadoPor').value;
        const retirado = document.getElementById('retiradoPor').value;
        const data = document.getElementById('data').value;
        const status = document.getElementById('status').value;
        
      
        if (equipamento && emprestado && retirado && data) {
            const registro = { equipamento, emprestado, retirado, data, status };
            const registros = JSON.parse(localStorage.getItem('registros')) || [];

            if (indiceEdicao === null) {
                // Se não estiver editando, adiciona novo registro
                registros.push(registro);
            } else {
                // Se estiver editando, atualiza o registro no índice correto
                registros[indiceEdicao] = registro;
                limparCampos();
                indiceEdicao = null;
                btnSalvarRegistro.innerText = "Salvar Registro"; // Voltar o nome do botão
            }

            localStorage.setItem('registros', JSON.stringify(registros));

            // Limpar campos e recarregar tabela
            limparCampos();
            carregarRegistros();
            indiceEdicao = null;
        } else {
            alert('Por favor, preencha todos os campos.');
        }

        
    });


    document.getElementById("abrirModalRegistro").addEventListener("click", () => {
        limparCampos();  // Limpa os inputs antes de abrir o modal
        indiceEdicao = null; // Garante que estamos criando um novo registro
    });

    function carregarRegistros() {
        tabela.innerHTML = '';
        const registros = JSON.parse(localStorage.getItem('registros')) || [];

        registros.forEach((registro, index) => {
            const row = tabela.insertRow();
            row.insertCell(0).innerText = registro.equipamento;
            row.insertCell(1).innerText = registro.emprestado;
            row.insertCell(2).innerText = registro.retirado;
            row.insertCell(3).innerText = registro.data;
            row.insertCell(4).innerText = registro.status;

            const acaoCell = row.insertCell(5);

            // Botão Editar
            const editarBtn = document.createElement('button');
            editarBtn.innerText = '';
            editarBtn.className = 'btn btn-warning btn-sm bi bi-pencil';
            editarBtn.style.marginRight = "3px";
            editarBtn.onclick = () => editarRegistro(index);
            acaoCell.appendChild(editarBtn);

            // Botão Excluir
            const excluirBtn = document.createElement('button');
            excluirBtn.innerText = '';
            excluirBtn.className = 'btn btn-danger btn-sm bi bi-trash';
            excluirBtn.onclick = () => excluirRegistro(index);
            acaoCell.appendChild(excluirBtn);
        });
    }

    function editarRegistro(index) {
        const registros = JSON.parse(localStorage.getItem('registros')) || [];
        const registro = registros[index];

        // Preencher os campos do formulário com os valores do registro selecionado
        document.getElementById('equipamento').value = registro.equipamento;
        document.getElementById('emprestadoPor').value = registro.emprestado;
        document.getElementById('retiradoPor').value = registro.retirado;
        document.getElementById('data').value = registro.data;
        document.getElementById('status').value = registro.status;

        // Definir o índice do registro em edição
        indiceEdicao = index;

        var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();

    }

    function excluirRegistro(index) {
        const registros = JSON.parse(localStorage.getItem('registros')) || [];
        registros.splice(index, 1);
        localStorage.setItem('registros', JSON.stringify(registros));
        carregarRegistros();
    }

    function limparCampos() {
        document.getElementById('equipamento').value = '';
        document.getElementById('emprestadoPor').value = '';
        document.getElementById('retiradoPor').value = '';
        document.getElementById('data').value = '';
        document.getElementById('status').value = 'ativo';

        indiceEdicao = null;
    }
});
