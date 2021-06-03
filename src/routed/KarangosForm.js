import { Button, FormControlLabel, InputAdornment, makeStyles, MenuItem, NativeSelect, Snackbar, TextField, Toolbar } from '@material-ui/core';
import { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputMask from 'react-input-mask'
import Checkbox from '@material-ui/core/Checkbox'
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

// padrão:
//const useStyle = makeStyles(() => ({}))
const useStyle = makeStyles(() => ({
    form: {
        maxWidth: '90%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        '& .MuiFormControl-root': {
            minWidth: '200px',
            maxWidth: '500px',
            marginBottom: '24px'
        }
    },
    toolbar: {
        marginTop: '36px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    checkbox: {
        alignItems: 'center'
    }
}))

/* Classes de caracteres de entrada para a mascara do campo placa
    1) posições do 1 ao 3: letras de [A-Za-z]
    2) posições numéricas (1ª, 3ª e 4ª depois do traço): [0-9]
    3) 2ª posição após o traço pode ter digitos ou letras: [0-9A-Ja-j]
*/

// Representando as classes de caracteres da máscara como um objeto
const formatChars = {
    'A': '[A-Za-z]',
    '0': '[0-9]',
    '#': '[0-9A-Ja-j]'
}

//Finalmente, a máscara de entrada do campo placa
const placaMask = 'AAA-0#00'

//

export default function KarangosForm() {

    const classes = useStyle()

    const [karango, setKarango] = useState({
        id: null,
        marca: '',
        modelo: '',
        cor: '',
        ano_fabricacao: (new Date()).getFullYear(), // ano corrente
        importado: '0',
        placa: '',
        preco: 0
    })

    const [currentId, setCurrentId] = useState() //
    const [importadoChecked, setImportadoChecked] = useState()

    function years() {
        let result = []
        for (let i = (new Date()).getFullYear(); i >= 1900; i--) result.push(i)
        return result
    }

    function handleInputChange(event, property) {

        // FACILITANDO AO CRIAR CARRO NO REACT <-> BANCO:
        /* quando o nome de uma propriedade de um objeto aparece entre [],
            isso se chama 'propriedade calculada'. O nome da propriedade vai
            corresponder à avaliação da expressão entre os colchetes
            
            mas para isso dar certo é preciso que:
            o nome da propriedade do estado == id do componente (por exemplo o TextField aqui)
        */

        /* se houver id no event.target, ele será o nome da propriedade
            senão usaremos o valor do segundo parâmetro
        */

        if (event.target.id) property = event.target.id


        if (property === 'importado') {
            const newState = !importadoChecked
            setKarango({ ...karango, importado: (newState ? '1' : '0') })
            setImportadoChecked(newState)
        } else if (property === 'placa') {
            setKarango({ ...karango, [property]: event.target.value.toUpperCase() })
        } else {



            setCurrentId(event.target.id) // usado para auxiliar na propriedade calculada
            setKarango({ ...karango, [property]: event.target.value })
        }


    }

    async function saveData() {
        try {
            await axios.post('https://api.faustocintra.com.br/karangos', karango)
            alert('dados salvos com sucesso!') // isso vai virar um snackbar
            // A FAZER: retonar página de listagem
        } catch (error) {
            alert('ERRO: ' + error.message) // isso vai virar um snackbar
        }
    }

    function handleSubmit(event) {
        event.preventDefault() // evita recarregamento da página
        saveData()
    }

    return (
        <>
            <h1>cadastrar novo karango</h1>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField fullWidth id="marca" label="Marca" placeholder="Digite a marca"
                    variant="filled" value={karango.marca} onChange={handleInputChange} />

                <TextField fullWidth id="modelo" label="Modelo" placeholder="Digite o modelo"
                    variant="filled" value={karango.modelo} onChange={handleInputChange} />

                <TextField fullWidth id='cor' label='Cor' variant='filled' value={karango.cor}
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

                <TextField fullWidth id="ano_fabricacao" label="Ano"
                    variant="filled" value={karango.ano_fabricacao}
                    onChange={event => handleInputChange(event, 'ano_fabricacao')} select>
                    {years().map(year => <MenuItem value={year}>{year}</MenuItem>)}
                </TextField>

                <InputMask formatChars={formatChars} mask={placaMask} id="placa"
                    value={karango.placa} onChange={(event) => handleInputChange(event, 'placa')} >
                    {() => <TextField fullWidth label="Placa" placeholder="Digite a placa"
                        variant="filled" />}
                </InputMask>

                <TextField fullWidth id="preco"
                    label="Preço" placeholder="Digite o Preço"
                    variant="filled" type='number'
                    value={karango.preco} onChange={handleInputChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                    onFocus={event => event.target.select()} //selecionar todo input a clicar
                />

                <FormControl fullWidth className={classes.checkbox}>
                    <FormControlLabel
                        control={<Checkbox checked={importadoChecked}
                            onChange={handleInputChange} id='importado' />}
                        label="Importado?"
                    />
                </FormControl>

                <Toolbar className={classes.toolbar}>
                    <Button variant='contained' color='secondary'
                        type='submit'>Enviar</Button>
                    <Button variant='contained'>Voltar</Button>
                </Toolbar>


                <div>
                    {JSON.stringify(karango)}
                    <br />
                    currentId: {currentId}
                </div>
            </form>
        </>
    )
}