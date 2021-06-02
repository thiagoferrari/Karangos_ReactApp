import { makeStyles, MenuItem, NativeSelect, TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// padrão:
//const useStyle = makeStyles(() => ({}))
const useStyle = makeStyles(() => ({
    form: {
        backgroundColor: 'aqua', //debug
        maxWidth: '80%',
        margin: '0 auto'
    }
}))

export default function KarangosForm() {

    const classes = useStyle()

    const [karango, setKarango] = useState({
        id: null,
        marca: '',
        modelo: '',
        cor: '',
        ano_fabricacao: (new Date()).getFullYear(), // ano corrente
        importado: false,
        placa: '',
        preco: 0
    })

    const [currentId, setCurrentId] = useState() //

    function years() {
        let result = []
        for (let i = (new Date()).getFullYear(); i >= 1900; i--) result.push(i)
        return result
    }

    function handleInputChange(event, property) {

        /* se houver id no event.target, ele será o nome da propriedade
            senão usaremos o valor do segundo parâmetro
        */

        if (event.target.id) property = event.target.id

        setCurrentId(event.target.id) // usado para auxiliar na propriedade calculada


        // FACILITANDO AO CRIAR CARRO NO REACT <-> BANCO:
        /* quando o nome de uma propriedade de um objeto aparece entre [],
            isso se chama 'propriedade calculada'. O nome da propriedade vai
            corresponder à avaliação da expressão entre os colchetes
            
            mas para isso dar certo é preciso que:
            o nome da propriedade do estado == id do componente (por exemplo o TextField aqui)
        */
        setKarango({ ...karango, [property]: event.target.value })
    }

    return (
        <>
            <h1>cadastrar novo karango</h1>
            <form className={classes.form}>
                <TextField fullWidth id="marca" label="Marca" placeholder="Digite a marca"
                    variant="filled" value={karango.marca} onChange={handleInputChange} />

                <TextField fullWidth id="modelo" label="Modelo" placeholder="Digite o modelo"
                    variant="filled" value={karango.modelo} onChange={handleInputChange} />

                <TextField fullWidth id='cor' label='cor' variant='filled' value={karango.cor}
                    onChange={event => handleInputChange(event, 'cor')} select >
                    <MenuItem value="Amarelo">Amarelo</MenuItem>
                    <MenuItem value="Azul">Azul</MenuItem>
                    <MenuItem value="Bege">Bege</MenuItem>
                    <MenuItem value="Branco">Branco</MenuItem>
                    <MenuItem value="Cinza">Cinza</MenuItem>
                    <MenuItem value="Dourado">Dourado</MenuItem>
                    <MenuItem value="Laranja">Laranja</MenuItem>
                    <MenuItem value="Marrom">Marrom</MenuItem>
                    <MenuItem value="Prata">Prata</MenuItem>
                    <MenuItem value="Preto">Preto</MenuItem>
                    <MenuItem value="Roxo">Roxo</MenuItem>
                    <MenuItem value="Verde">Verde</MenuItem>
                    <MenuItem value="Vermelho">Vermelho</MenuItem>
                </TextField>

                <TextField id="ano_fabricacao" label="Ano"
                    variant="filled" value={karango.ano_fabricacao}
                    onChange={event => handleInputChange(event, 'ano_fabricacao')} select>
                    {years().map(year => <MenuItem value={year}>{year}</MenuItem>)}
                </TextField>

                <div>
                    {JSON.stringify(karango)}
                    <br />
                    currentId: {currentId}
                </div>
            </form>
        </>
    )
}