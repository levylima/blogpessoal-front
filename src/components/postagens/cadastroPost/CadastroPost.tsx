import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroPost.css';
import {useNavigate, useParams } from 'react-router-dom'
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import { busca, buscaId, post, put } from '../../../services/Service';

function CadastroPost() {
    let navigate = useNavigate(); /* Usado para fazer o redirect de página. */
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([])
    const [token, setToken] = useLocalStorage('token');

    /* Verificação do 'token' */
    /* Se o 'token' estiver gravado no "LocalStorage" isso indica que o usuário está logado e ele pode fazer as requisições. */
    /* Se ele não estiver gravado no "LocalStorage", significa que o usuário não está autenticado. Logo, o "UseEffect" vai ficar monitorando esse 'token' e vai fazer essa validação. */
    /* Se não tiver autenticado, ou seja, se o 'token' estiver vazio, o "useNavigate" será acionado para direcionar o usuário para a tela de login. */
    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")

        }
    }, [token])

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: ''
        })
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        tema: null
    })
    /* Esse "useEffect" vai ficar monitorando o State "Tema", vai verificar se tem um Tema específico no State "Tema", daí ele irá preencher o State "Postagem", se eu estiver mexendo no select de temas.*/
    /* Na nossa interface, existe um Select de temas, que está atrelado ao nosso State "Tema". Logo, se eu seleciono qualquer um dos temas da lista, ele vai ter uma alteração no valor desse State, ou seja, a variável que armazena "Tema" vai modificar  de acordo com a seleção de um tema pra outro. */
    /* Se eu selecionar um tema, ela vai ficar com o valor daquele tema, se eu selecionar outro, ela vai ficar com o valor daquele outro tema. */
    /* Feito isso, se ela perceber esse tipo de alteração novamente na variável "Tema", então ela vai acionar o "setPostagem", que por sua vez vai pegar esse tema que eu selecionei e vai atribuir ao meu State "Postagem". Ela vai preencher esse campo "tema" com o valor do tema que eu selecionei. */
    useEffect(() => { 
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    /* Esse "useEffect" vai acionar uma função chamada "getTemas". */
    /* Ele ficará monitorando o Id(id que é passado como parâmetro na URL) da Postagem, se ocorrer uma modificação desse Id da Postagem, ele vai acionar a função "getTemas". */
    /* Essa função "getTemas" é assíncrona e faz uma busca na rota "Tema", daí as informações que ela retorna, todos os temas que são retornados da API, ela armazena naquele State "Temas". */
    /* Dai o esse "useEffect" aciona essa função para trazer todos os nossos temas(getTemas) que estão cadastrados, daí ela faz uma verificação: */
    /* Se esse Id for diferente de "undefined", significa então que eu tenho um Id. Logo, se eu tenho um Id, eu vou fazer uma busca(findByIdPostagem). Eu vou pesquisar uma postagem por meio de um Id, daí é passado um Id que está sendo monitorando como parâmetro dessa função(findByIdPostagem).*/
    /* Essa função "findByIdPostagem" faz uma busca na nossa API só que pelo Id. Então ela vai na rota de postagens, aí ela coloca, depois da barra, o Id daquela Postagem específica. Aí as informações dessa Postagem que são retornadas vão ser armazenadas no State "Postagem"(que é o "setPostagem"). Então é possível armazenar as informações de cada Postagem dos campos acima. */
    /* Então o State "Postagem" */

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/tema", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    /* A função "updatedPostagem" irá preencher o State "Postagem" com os temas, se você estiver mexendo no input de título ou texto(input do HTML) */
    /* A partir do momento que eu estiver mexendo num desses 2, ela irá acionar a função "updatedPostagem", que por sua vez vai preencher o nosso State "Postagem". */
    /* Ou seja, ela vai montar um objeto com as informações que o usuário está digitando. */
    /* A "OnSubmit" é para o envio das informações que o usuário preencher na Postagem. */
    /* A função "Back" irá direcionar para a rota de Postagem, onde são listadas todas as postagens. */
    /* */
    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Postagem atualizada com sucesso');
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Postagem cadastrada com sucesso');
        }
        back()

    }

    function back() {
        navigate('/posts')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/tema/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPost;