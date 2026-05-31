import express from 'express';

//Liberar para CORS para todo mundo
import cors from 'cors'; // CORS: Politica de restrição
const app = express();
app.use(cors()); // liberar para CORS para todo mundo
app.use(express.json()); // Habilitar o parsing de JSON no corpo das requisições

//Aqui está meu CRUD de Produtos

const produtos =[]

const p1 = {
    id: 1,
    nome: 'Alienware M15 R7',
    tipo: 'Notebook',
    status: 'Disponivel',
    descricao: 'Notebook gamer.',
}

const p2 = {
    id: 2,
    nome: 'PlayStation 5',
    tipo: 'Console',
    status: 'Manutenção',
    descricao: 'Console de última geração da Sony.',
}

const p3 = {
    id: 3,
    nome: 'Acer Predator Helios 300',
    tipo: 'Notebook',
    status: 'Disponivel',
    descricao: 'Notebook gamer ultima geraçao.',
}

const p4 = {
    id: 4,
    nome: 'Epson Power Lite W39',
    tipo: 'Projetor',
    status: 'Emprestado',
    descricao: 'Projetor portátil com resolução WXGA.',
}

const p5 = {
    id: 5,
    nome: 'Mouse Gamer Logitech G502',
    tipo: 'Mouse',
    status: 'Disponivel',
    descricao: 'Mouse Gamer.',
}

const p6 = {
    id: 6,
    nome: 'Teclado Mecânico Razer BlackWidow',
    tipo: 'Teclado',
    status: 'Manutenção',
    descricao: 'Teclado mecânico para jogos.',
}

const p7 = {
    id: 7,
    nome: 'Monitor LG UltraGear 27GN950',
    tipo: 'Monitor',
    status: 'Disponivel',
    descricao: 'Monitor gamer 4K com alta taxa de atualização.',
}

const p8 = {
    id: 8,
    nome: 'Headset HyperX Cloud II',
    tipo: 'Headset',
    status: 'Emprestado',
    descricao: 'Headset gamer com som surround.',
}

const p9 = {
    id: 9,
    nome: 'Webcam Logitech C920',
    tipo: 'Webcam',
    status: 'Disponivel',
    descricao: 'Webcam Full HD para streaming e videoconferências.',
}

const p10 = {
    id: 10,
    nome: 'Microfone Blue Yeti',
    tipo: 'Microfone',
    status: 'Manutenção',
    descricao: 'Microfone USB de alta qualidade para gravação e streaming.',
}

produtos.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);

//Endpoint para listar todos os produtos

// LISTAR PRODUTOS
app.get('/produtos', (req, res) => {

    const { status, tipo, busca } = req.query;

    let resultado = produtos;

    if(status){
        resultado = resultado.filter(
            p => p.status.toLowerCase() === status.toLowerCase()
        );
    }

    if(tipo){
        resultado = resultado.filter(
            p => p.tipo.toLowerCase() === tipo.toLowerCase()
        );
    }

    if(busca){
        resultado = resultado.filter(
            p =>
            p.nome.toLowerCase().includes(busca.toLowerCase()) ||
            p.descricao.toLowerCase().includes(busca.toLowerCase())
        );
    }

    res.json(resultado);
});

// CADASTRAR PRODUTO
app.post('/produtos', (req, res) => {

    const { nome, tipo, status, descricao } = req.body;

    if (!nome || !tipo) {
        return res.status(400).json({
            erro: 'Nome e tipo são obrigatórios.'
        });
    }

    const statusValidos = [
        'disponivel',
        'emprestado',
        'manutencao'
    ];

    if (!statusValidos.includes(status.toLowerCase())) {
        return res.status(400).json({
            erro: 'Status inválido.'
        });
    }

    const novo = {
        id: Math.max(0, ...produtos.map(p => p.id)) + 1,
        nome,
        tipo,
        status,
        descricao
    };

    produtos.push(novo);

    return res.status(201).json(novo);
});

// ler produto por id
app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const prod = produtos.find(p => Number(p.id) === id);
    if (!prod) return res.status(404).json({ error: 'Produto não encontrado.' });
    res.json(prod);
});

// atualizar produto por id
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const idx = produtos.findIndex(p => Number(p.id) === id);
    if (idx === -1) return res.status(404).json({ error: 'Produto não encontrado.' });

    const { nome, tipo, status, descricao } = req.body || {};
    if (nome !== undefined) produtos[idx].nome = nome;
    if (tipo !== undefined) produtos[idx].tipo = tipo;
    if (status !== undefined) produtos[idx].status = status;
    if (descricao !== undefined) produtos[idx].descricao = descricao;

    res.json(produtos[idx]);
});

// deletar produto por id
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const idx = produtos.findIndex(p => Number(p.id) === id);
    if (idx === -1) return res.status(404).json({ error: 'Produto não encontrado.' });

    produtos.splice(idx, 1);
    res.status(204).end();
});














const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});