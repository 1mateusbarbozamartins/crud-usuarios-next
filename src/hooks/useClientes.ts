import ColecaoCliente from "@/backend/db/ColecaoCliente";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { useEffect, useState } from "react";
import useTabelaOuForm from "./useTabelaOuForm";

export default function useClientes() {
    const repo: ClienteRepositorio = new ColecaoCliente()

    const { 
        tabelaVisivel, 
        exibirFormulario, 
        exibirTabela 
    } = useTabelaOuForm()

    const [clientes, setClientes] = useState<Cliente[]>([])
    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

    useEffect(() => {
        obterTodos()
    }, [])
    
    function obterTodos() {
    repo.obterTodos().then(clientes => {
        setClientes(clientes);
        exibirTabela()
    })
    }

    function selecionarCliente(cliente: Cliente) {
        setCliente(cliente)
        exibirFormulario()
    }

    async function excluirCliente(cliente: Cliente) {
        await repo.excluir(cliente)
        obterTodos()
    }

    async function salvarCliente(cliente: Cliente) {
        await repo.salvar(cliente)
        obterTodos()
    }

    async function novoCliente() {
        setCliente(Cliente.vazio());
        exibirFormulario();
    }

    return {
        cliente,
        clientes,
        novoCliente,
        salvarCliente,
        excluirCliente,
        selecionarCliente,
        obterTodos,
        tabelaVisivel,
        exibirTabela,
    }
}