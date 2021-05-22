import axios from "axios"
import { useEffect, useState } from "react"
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useHistory } from 'react-router-dom'
import ConfirmDialog from '../ui/ConfirmDialog'


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableRow: {
        '& button': {       // linha da tabela em estado 'normal'
            visibility: 'hidden'
        },
        '&:hover': { // linha da tabela com mouse sobreposto
            backgroundColor: theme.palette.action.hover
        },
        '&:hover button': { // botões da linha com mouse sobreposto
            visibility: 'visible'
        }
    },
    toolbar: {
        justifyContent: 'flex-end',
        paddingRight: 0
    }
}))

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function KarangosList() {
    const classes = useStyles()
    const history = useHistory()

    // é importante que este estado seja setado com um array vazio
    const [karangos, setKarangos] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false) // sempre false para ela não aparecer na DOM
    const [deletable, setDeletable] = useState() // cód do registro a ser excluído

    function handleDialogClose(result) {
        setDialogOpen(false)
        alert(result)
    }

    function handleDeleteClick(id) {
        setDeletable(id)
        setDialogOpen(true)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axios.get('https://api.faustocintra.com.br/karangos?by=marca,modelo')
                setKarangos(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        getData()
    }, []) // dependências vazias, esse useEffect executa só uma vez

    return (
        <>
            <ConfirmDialog isOpen={dialogOpen} onClick={handleDialogClose}>
                Deseja realmente excluir este karango?
            </ConfirmDialog>
            <h1>Listagem de karangos</h1>
            <Toolbar className={classes.toolbar}>
                <Button color='secondary' variant='contained' size="large"
                    startIcon={<AddBoxIcon />} onClick={() => history.push('/new')}>
                    Novo Karango
                </Button>
            </Toolbar>

            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Cód.</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Modelo</TableCell>
                            <TableCell>Cor</TableCell>
                            <TableCell align="center">Ano</TableCell>
                            <TableCell align="center">Importado?</TableCell>
                            <TableCell align="center">Placa</TableCell>
                            <TableCell align="right">Preço</TableCell>
                            <TableCell align="center">Editar</TableCell>
                            <TableCell align="center">Deletar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            karangos.map(karango =>
                                <TableRow key={karango.id} className={classes.tableRow}>
                                    <TableCell align="right">{karango.id}</TableCell>
                                    <TableCell>{karango.marca}</TableCell>
                                    <TableCell>{karango.modelo}</TableCell>
                                    <TableCell>{karango.cor}</TableCell>
                                    <TableCell align="center">{karango.ano_fabricado}</TableCell>
                                    <TableCell align="center">
                                        <Checkbox checked={karango.importado === '1'} readOnly />
                                    </TableCell>
                                    <TableCell align="center">{karango.placa}</TableCell>
                                    <TableCell align="right">
                                        {Number(karango.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleDeleteClick(karango.id)}>
                                            <DeleteIcon color='error' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}