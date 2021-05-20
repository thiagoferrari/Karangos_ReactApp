import axios from "axios"
import { useEffect, useState } from "react"

export default function KarangosList() {
    // é importante que este estado seja setado com um array vazio
    const [karangos, setKarangos] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axios.get('https://api.faustocintra.com.br/karangos')
                setKarangos(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        getData()
    }, []) // dependências vazias, esse useEffect executa só uma vez

    return (
        <>
            <h1>Listagem de karangos</h1>
            {
                karangos.map(karango => <div key={karango.id}>{karango.modelo}</div>)
            }
        </>
    )
}