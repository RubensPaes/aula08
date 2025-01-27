const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let usuarios = [];

app.post('/usuarios', (req, res) => {
    const { nome, tamanho, tipo, preco, cor, marca, peso } = req.body;


    if (!nome || !tamanho || !tipo || !preco || !cor || !marca || !peso) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios: nome, tamanho, tipo, preço, cor, marca, peso.' });
    }

    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        tamanho,
        tipo,
        preco,
        cor,
        marca,
        peso,
    };
    usuarios.push(novoUsuario);

    res.status(201).json(novoUsuario);
});

app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find(u => u.id === parseInt(id));

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, tamanho, tipo, preco, cor, marca, peso } = req.body;

    const usuario = usuarios.find(u => u.id === parseInt(id));

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuario.nome = nome || usuario.nome;
    usuario.tamanho = tamanho || usuario.tamanho;
    usuario.tipo = tipo || usuario.tipo;
    usuario.preco = preco || usuario.preco;
    usuario.cor = cor || usuario.cor;
    usuario.marca = marca || usuario.marca;
    usuario.peso = peso || usuario.peso;

    res.status(200).json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const index = usuarios.findIndex(u => u.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuarios.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
