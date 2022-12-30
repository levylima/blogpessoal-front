import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://blogpessoal-ruy2.onrender.com'
})

    export const cadastroUsuario = async(url: any, dados: any, setDado: any) => {
        const resposta = await api.post(url, dados)
        setDado(resposta.data)
    }

    export const login = async(url: any, dados: any, setDado: any) => {
        const resposta = await api.post(url, dados)
        setDado(resposta.data.token)
    }

    export const busca = async(url: any,setDado: any, header: any) => { 
        const resposta = await api.get(url,header)
        setDado(resposta.data)
    }
    export const buscaId = async(url: any,setDado: any, header: any) => { 
        const resposta = await api.get(url,header)
        setDado(resposta.data)
    }

    export const post = async(url: any, dados: any, setDado: any, header: any) => { 
        const resposta = await api.post(url,dados,header) /* O Post é o cadastro das informações na nossa API. */
        setDado(resposta.data)
    }

    /* Irá atualizar as informações. */
    /* É necessário passar um token nessa requisição para saber se é um usuário válido. Se for, faz a atualização do Tema ou da Postagem. */
    export const put = async(url: any, dados: any, setDado: any, header: any) => { 
        const resposta = await api.put(url,dados,header)
        setDado(resposta.data)
    }

    /* Será passado o token, se o token for válido, ele irá excluir de nossa API a Postagem ou o Tema. */
    export const deleteId = async(url: any,header: any) => { 
        await api.delete(url,header)
    }