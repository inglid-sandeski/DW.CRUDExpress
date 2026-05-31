const tbody = document.querySelector('#data');

// LISTAR PRODUTOS
async function getProducts() {

    let url = 'http://localhost:3000/produtos?';

    const tipo = document.querySelector('#tipo').value;
    const status = document.querySelector('#status').value;
    const nome = document.querySelector('#nome').value;

    if (tipo !== '') url += 'tipo=' + tipo + '&';
    if (status !== '') url += 'status=' + status + '&';
    if (nome !== '') url += 'busca=' + nome + '&';

    const response = await fetch(url);
    const products = await response.json();

    tbody.innerHTML = '';

    for (const p of products) {

        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>${p.tipo}</td>
            <td>${p.status}</td>
            <td>${p.descricao}</td>
            <td>
                <button onclick="editarProduto(${p.id})">
                    Editar
                </button>

                <button onclick="excluirProduto(${p.id})">
                    Excluir
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    }
}

getProducts();

// CADASTRAR PRODUTO
async function salvarProduto() {

    const produto = {
        nome: document.querySelector('#nomeProduto').value,
        tipo: document.querySelector('#tipoProduto').value,
        status: document.querySelector('#statusProduto').value,
        descricao: document.querySelector('#descricaoProduto').value
    };

    const response = await fetch(
        'http://localhost:3000/produtos',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        }
    );

    if (response.ok) {

        alert('Produto cadastrado com sucesso!');

        limparFormulario();

        getProducts();

    } else {

        const erro = await response.json();

        alert(erro.erro || 'Erro ao cadastrar produto');
    }
}

// EXCLUIR PRODUTO
async function excluirProduto(id) {

    const confirmar = confirm(
        'Deseja realmente excluir este produto?'
    );

    if (!confirmar) return;

    const response = await fetch(
        `http://localhost:3000/produtos/${id}`,
        {
            method: 'DELETE'
        }
    );

    if (response.ok) {

        alert('Produto excluído com sucesso!');

        getProducts();

    } else {

        alert('Erro ao excluir produto');
    }
}

// CARREGAR PRODUTO PARA EDIÇÃO
async function editarProduto(id) {

    const response = await fetch(
        `http://localhost:3000/produtos/${id}`
    );

    const produto = await response.json();

    document.querySelector('#idProduto').value =
        produto.id;

    document.querySelector('#nomeProduto').value =
        produto.nome;

    document.querySelector('#tipoProduto').value =
        produto.tipo;

    document.querySelector('#descricaoProduto').value =
        produto.descricao;

    document.querySelector('#statusProduto').value =
        produto.status
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
}

// ATUALIZAR PRODUTO
async function atualizarProduto() {

    const id =
        document.querySelector('#idProduto').value;

    if (!id) {
        alert('Selecione um produto para editar.');
        return;
    }

    const produto = {
        nome: document.querySelector('#nomeProduto').value,
        tipo: document.querySelector('#tipoProduto').value,
        status: document.querySelector('#statusProduto').value,
        descricao: document.querySelector('#descricaoProduto').value
    };

    const response = await fetch(
        `http://localhost:3000/produtos/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        }
    );

    if (response.ok) {

        alert('Produto atualizado com sucesso!');

        limparFormulario();

        getProducts();

    } else {

        alert('Erro ao atualizar produto');
    }
}

// LIMPAR FILTROS
function clearFilters() {

    document.querySelector('#nome').value = '';
    document.querySelector('#tipo').value = '';
    document.querySelector('#status').value = '';

    getProducts();
}

// LIMPAR FORMULÁRIO
function limparFormulario() {

    document.querySelector('#idProduto').value = '';

    document.querySelector('#nomeProduto').value = '';

    document.querySelector('#tipoProduto').value = '';

    document.querySelector('#descricaoProduto').value = '';

    document.querySelector('#statusProduto').value =
        'disponivel';
}