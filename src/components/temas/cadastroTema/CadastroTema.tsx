import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, post, put } from '../../../services/Service';


function CadastroTema() {
    let navigate = useNavigate(); /* O "useNavigate" será o responsável para fazer o redict de página. */
    const { id } = useParams<{id: string}>(); /* O "useParams" é um hook que captura parâmetros que são enviados por uma URL. */
    const [token, setToken] = useLocalStorage('token'); /* É ele quem será o responsável por capturar o token que está dentro do LocalStorage.  */
    
    /* Se refere a uma variável "Tema" e uma função "setTema". */
    /* Irá alterar o State Tema a medida que eu tiver um Tema cadastrado. Ou seja, a descrição do Tema já tiver sido preenchida a medida que o Id for diferente de 0. */
    /* Porque quanto se vai cadastrando novos temas os Ids vão sendo modificados automaticamente. */
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })
 
    /* O "useEffect" cuida do ciclo de vida do componente. */
    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login") /* Irá redirecionar a página login caso não esteja logado. */
    
        }
    }, [token])

    /* Este "useEffect" vai ficar monitorando o nosso Id. Se tiver um Id disponível, vai acionar a função "findById". */
    /* A função "findById" é quem vai fazer a conexão com a API. Irá fazer o GET para pegar o Tema que esteja cadastrado do acordo com o Id que eu esteja enviando nessa requisição. */
    /* O IF irá verificar se o Id é igual ou diferente de "undefined". */
    /* Se há de fato um número dentro da variável Id, ou seja, diferente de "undefined", o IF será verdadeiro. */
    /* Se o IF for verdadeiro será nós vamos acionar a função findById, passandocomo parâmetro dele o próprio Id. */
    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    /* Quando é acionada a função "findById", ela recebe o parâmetro Id. */
    /* Depois de receber o Id como parâmetro, se entra no corpo da função. */
    /* O corpo da função vai acionar o buscaId que o método está dentro do Service.ts, é ele quem será o responsável por conectar com nosssa API. */
    /* É passado a rota /tema juntamente com o Id(que está no parâmetro da rota). */
    /* Feito isso, a API vai tentar localizar esse Tema se ele estiver cadastrado. */
    /* Se ele estiver cadastrado, ela vai pegar os dados que estão vindo da API e vão alterar o State "Tema" atravéz da função "setTema" */
    /* Ou seja, colocando dentro da State os valores daquele "Tema" com Id específico, se de fato ele existir. */
    /* E no terceiro parâmetro é passado o 'token'. */
    async function findById(id: string) {
        buscaId(`/tema/${id}`, setTema, {
            headers: {
              'Authorization': token
            }
          })
        }

        /* A função "updatedTema" será responsável por capturar os valores digitados do formulário e atribuílos ao "setTema". */
        /* Que por sua vez, vai fazer uma alteração no State "Tema", e aí ele vai preencher esse State com os valores que o usuário digitar no formulário. */
        /* O "ChangeEvent", que é um pacote que faz um controle desses eventos. */

        function updatedTema(e: ChangeEvent<HTMLInputElement>) {

            setTema({
                ...tema,
                [e.target.name]: e.target.value,
            })
    
        }
        /* O usuário irá preencher as informações e depois irá clicar no botão "finalizar".*/
        /* Nesse momento devemos pensar em 2 coisas: O componente "cadastroTema" será usado tanto pra atualizar temas já cadastrados, como para cadastrar novos temas, e isso vai depender se tenho o Id ou não. */
        /* O "prevendDefault" previne o comportamento do OnSubmit para não atualizar a tela. */
        /* Em seguida, ele vai imprimir no console os dados que foram armazenados no State "Tema", então os dados que o usuário digitou no campo "descricao", serão adicionados ao State, e ele vai imprimir essa informação no console.*/
        /* O componente "cadastroTema", ele vai ter 2 funções, atualizar ou cadastrar. Aí vai depender se há ou não um Id. */
        /* Por exemplo, ele irá cair no primeiro IF, ele vai verificar: Se o Id for diferente de "undefined", ou seja, se existe um Id, ele não é um valor indefinido, então ele irá tentar atualizar este "Tema". */
        /* Pois afinal de contas, ele capturou esse Id de uma rota então quer dizer que estou tentando atualizar um "Tema" já existente. */
        /* E para atualizar um "Tema" já existente, ele vai acionar o método PUT, lá do Service.ts */
        /* No PUT, ele vai informar a rota da API para fazer a atualização(/tema), juntamente com os dados que se pretende atualizar(tema), capturar o objeto atualizado que a API me retornar(setTema) */
        /* E também será passado no header, o 'token' de autenticação, validando que esta atualização é uma atualização verdadeira. */
        /* Depois, é emitida uma mensagem dizendo "Tema atualizado com sucesso". */

        /* Porém, se o Id for "undefined" e cair no ELSE, isso indica que ele não tem um Id, logo ele vai entender que ele está tentando fazer um cadastro de um novo "Tema". */
        /* Então será acionado o método POST, ele vai informar a rota da API para fazer a atualização(/tema), juntamente com os dados que se pretende cadastrar(tema), capturar o objeto cadastrado que a API me retornar(setTema) */
        /* Depois, é emitida uma mensagem dizendo "Tema cadastrado com sucesso". */
        /* Feito isso, ele vai acionar a função chamada "back", essa função vai nos redirecionar para o componente "/temas". */
        /* O componente "/temas" é onde será listado todos os componentes que estão cadastrados na nossa API. */
        /* Então, independente se estou atualizando um Tema existente ou criando um novo Tema, o próximo passo é direcionar o usuário para tela onde tem todos os temas cadastrados.*/
        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault()
            console.log("tema " + JSON.stringify(tema))
    
            if (id !== undefined) {
                console.log(tema)
                put(`/tema`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                alert('Tema atualizado com sucesso');
            } else {
                post(`/tema`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                alert('Tema cadastrado com sucesso');
            }
            back()
    
        }
    
        function back() {
            navigate('/temas')
        }

    /* O valor do "TextField" será atribuido a propriedade "descricao" contida no nosso State "Tema", */
    /* A partir que o usuário começar a mexer no campo, a digitar alguma informação, o "OnChange" ficará monitorando qualquer tipo de alteração que ocorrer nesse campo. No caso, uma digitação de texto.*/
    /* E vai acionar a função "updatedTema", que por sua vez vai capturar os valores, e vai fazer a atualização do State com os dados que o usuário digitou.  */
    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;