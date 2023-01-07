import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button } from "@material-ui/core"
import {Box} from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import './ModalPostagem.css';
import CadastroPost from '../cadastroPost/CadastroPost';

/* A função "getModalStyle" é responsável por centralizar o Modal.*/
/* A const top está sendo aplicada a propriedade top do css e a mesma coisa acontece com a const left, que está aplicada a propriedade left do css. */
/* Então está sendo definido 50% do topo e 50% da esquerda. E com isso, eu uso a propriedade "transform", que movimenta o elemento no eixo X, Y ou Z(no caso, ela vai movimentar no eixo X ou no Y.) */
/* Então, com essas movimentações, eu consigo trazer o meu Modal pro centro da tela. */

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

/* E essa função(getModalStyle), ela é inserida dentro de um outro Statel, que é um State chamado de "modalStyle". */
/* Inicializamos o estado naturalmente com essa função, ou seja, esse State(modalStyle) está guardando as informações que devem centralizar o nosso modal. */
/* Então esse State(modalStyle) é aplicada na const body. */
function ModalPostagem () {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  /* O que essa função(handleOpen) faz? */
  /* Ela altera o State "Open", atravéz da função "setOpen" pra true. Isso quer dizer que? */
  /* Se olharmos o atributo "open" do Modal, se true ele abre o Modal. Então quando o valor do meu State é alterado para true, ou seja, pra verdadeiro, então o Modal é aberto. Isso, logicamente, representa como o Modal é aberto ou fechado. */

  const handleOpen = () => {
    setOpen(true);
  };

  /* Se eu clicar pra fechar ela vai setar um valor falso para o "setOpen", que é uma State.(as variáveis "open" e "setOpen" são inicializadas com o valor "false".) */
  /* Então, quando se clica no ícone para fechar, ela vai acionar essa função "handleClose" e vai alterar o valor do State "Open" para false, e vai efetivar o fechamento do Modal. */
  /* Mas essa função(handleClose) também é acionada quando eu clico fora do Modal. Se eu clicar fora do quadrado do Modal, também vai acionar a função "handleClone" e também vai fechar o Modal. */
  /* Então são 2 maneiras de fechar o Modal. */
  /* Considerando então que a função "handleClose", já começa com o valor "false", eu estou então atribuindo pro State Open o valor false. */
  const handleClose = () => {
    setOpen(false);
  };

  /* Esse Box terá um ícone para fechar o modal, vai aparecer um X para fechar o modal. */
  /* O "X" vem da tag "CloseIcon". */
  /* A constante chamada "Body" ela contém, além do botão para poder fechar o nosso modal, ela contém uma importação de uma tag chamada "CadastroPost", que justamente é o nosso arquivo "CadastroPost.tsx". */
  /* Ou seja, toda a tela de cadastro que foi construída, foi importada dentro dessa constante "Body", ou seja, ela vai ficar dentro do corpo do nosso modal. */
  /* Essa constante "Body", contendo todo esse conteúdo(botão de fechamento, tela de cadastro), ela vai ser renderizada dentro da tag chamada "Modal". */
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box display="flex" justifyContent="flex-end" className="cursor">
        <CloseIcon onClick={handleClose}/>
      
      </Box>
      
      <CadastroPost/>
      
    </div>
  );

  /* O botão com o texto "Nova Postagem" será renderizado no nosso arquivo "Home" em nossa tela principal, que vai nos permitir iniciar o cadastro de uma nova postagem. */
  /* Dentro da tag chamada "Modal" será renderizada e sendo acionada a constante "Body".  */
  /* O atributo "OnClose", vai acionar uma função chamada "handleClose", que é a mesma função que está sendo acionada no ícone(const body). */
  /* Nesse Modal existe o atributo chamado "Open", se passar o mouse por cima desse atributo, aparece "se verdadeiro, o Modal é aberto.". Então o que isso quer dizer? */
  /* Se estiver com o valor falso, o Modal permanece fechado. Logo, se eu estou iniciando o valor da minha função(handleClose) com o valor falso, ele então vai atribuir o valor falso dentro da variável "open", pro atributo "open". */
  /* Então ele vai manter o Modal fechado. */
  /* Agora, se por exemplo, eu clico no botão nova Postagem, ele está acionando ali uma outra função chamada "handleOpen" a partir da click. */
  return (
    <div>
      <Button
        variant="outlined"
        className="btnModal"
        onClick={handleOpen}>Nova Postagem</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
export default ModalPostagem;