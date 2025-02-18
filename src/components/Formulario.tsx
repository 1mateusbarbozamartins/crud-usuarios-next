import { useState } from "react";
import Entrada from "./Entrada";
import Cliente from "@/core/Cliente";
import Botao from "./Botao";

interface FormularioProps {
    cliente: Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
    const id = props.cliente?.id ?? null
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0)

    const handleNomeChange = (valor: string | number) => {
        setNome(valor.toString());
    };

    const handleIdadeChange = (valor: string | number) => {
        setIdade(Number(valor));
    };

    return (
        <div>
            {id ? (
                <Entrada 
                    somenteLeitura
                    texto="Código" 
                    valor={id} 
                    className="mb-5"
                />
            ): false}

            <Entrada 
                texto="Nome" 
                valor={nome}
                valorMudou={handleNomeChange}
                className="mb-5"
            />

            <Entrada 
                texto="Idade" 
                tipo="number" 
                valor={idade} 
                valorMudou={handleIdadeChange}
            />

            <div className="flex justify-end mt-7">
                <Botao 
                    cor="blue" 
                    className="mr-2"
                    onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))}
                >
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}