import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Categoria from '../../../models/Categoria';
import './ListaCategproa.css';
import {useNavigate} from 'react-router-dom';
import { busca } from '../../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

function ListaCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  let navigate = useNavigate();
  const token = useSelector<TokenState,TokenState['tokens']>(
    (state) => state.tokens
  );

  useEffect(()=>{
    if(token == ''){
      toast.error("Você precisa estar logado", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
        progress: undefined,
      });
      navigate("/login")
    }
  }, [token])


  async function getCategoria(){
    await busca("/categorias/all", setCategorias, {
      headers: {
        'Authorization': token
      }
    })
  }


  useEffect(()=>{
    getCategoria()
  }, [categorias.length])

  return (
    <>
    {
      categorias.map(categoria =>(
      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Categoria
            </Typography>
            <Typography variant="h5" component="h2">
             {categoria.tipo}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioCategoria/${categoria.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarCategoria/${categoria.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
      ))
      }
    </>
  );
}


export default ListaCategoria;