//meu teste
import express from "express";
import { produtos } from "./produtos.js";

const app = express();
const port = 3000;

app.use(express.json());


app.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
});


app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (produto) {
        res.status(200).json(produto);
    } else {
        res.status(404).json({ message: `Produto com ID ${id} não encontrado` });
    }
});


app.get("/produtos/categoria/:cat", (req, res) => {
    const categoria = req.params.cat;
    const produtosCategoria = produtos.filter(
        p => p.categoria.toLowerCase() === categoria.toLowerCase()
    );

    if (produtosCategoria.length > 0) {
        res.status(200).json(produtosCategoria);
    } else {
        res.status(404).json({ message: `Nenhum produto encontrado para a categoria '${categoria}'` });
    }
});

app.post("/produtos", (req, res) => {
    const { nome, preco, estoque, categoria } = req.body;

    if (!nome || preco === undefined || estoque === undefined || !categoria) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" 
        });
    }
        const novoProduto = {
            id: produtos.length+1,
            nome,
            preco: parseFloat(preco),
            estoque: parseInt(estoque),
            categoria
        };

        produtos.push(novoProduto);
        res.status(201).json(novoProduto);
    });

    app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco, estoque, categoria } = req.body;

    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            mensagem: `Produto com ID ${id} não encontrado para atualização.`
        });
    }

     if (!nome || preco === undefined || estoque === undefined || !categoria) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" 
        });
    }

    produtos[index] = {
        id,
        nome,
        preco:parseFloat(preco),
        estoque:parseInt(estoque),
        categoria
    };

    res.status(200).json(produtos[index]);
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            mensagem: `Produto com ID ${id} não encontrado para exclusão.`
        });
    }
    const [produtoRemovido] = produtos.splice(index, 1);
    res.status(200).json({
        mensagem: `Produto com ID ${id} removido com sucesso.`,
        produto: produtoRemovido
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});