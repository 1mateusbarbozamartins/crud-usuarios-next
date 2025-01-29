import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { db } from "../config";

import { 
    collection, doc, getDocs, setDoc, addDoc, deleteDoc, getDoc, QueryDocumentSnapshot, SnapshotOptions 
} from "firebase/firestore";

export default class ColecaoCliente implements ClienteRepositorio {

    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade
            };
        },
        fromFirestore(
            snapshot: QueryDocumentSnapshot,
            options: SnapshotOptions
        ): Cliente {
            const dados = snapshot.data(options);
            return new Cliente(dados.nome, dados.idade, snapshot.id);
        }
    };

    async salvar(cliente: Cliente): Promise<Cliente> {
        if (cliente?.id) {
            await setDoc(doc(this.colecao(), cliente.id), cliente);
            return cliente;
        } else {
            const docRef = await addDoc(this.colecao(), cliente);
            const docSnap = await getDoc(docRef);
            return new Cliente(docSnap.data()?.nome, docSnap.data()?.idade, docSnap.id);
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        await deleteDoc(doc(this.colecao(), cliente.id));
    }

    async obterTodos(): Promise<Cliente[]> {
        const querySnapshot = await getDocs(this.colecao());
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return new Cliente(data.nome, data.idade, doc.id);
        });
    }

    private colecao() {
        return collection(db, "clientes").withConverter(this.#conversor);
    }
}
