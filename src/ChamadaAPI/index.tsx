import { ChangeEvent ,useState, useEffect } from 'react'
import axios from 'axios'

import "./style.css"

interface IBGEUFResponse{
    sigla: string,
};

interface IBGECITYResponde{
    nome: string,
};

function IBGEAPI(){
    const [ufs, setUfs] = useState<string[]>([]);
    const [selectedUF, setSelectedUF] = useState('0');
    const [cities, setCities] = useState<string[]>([]);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {

                //console.log(response)
                const ufInitials = response.data.map(uf => uf.sigla)

                setUfs(ufInitials);
            });
    }, []);

       //carregar as cidades sempre que a uf mudar
    useEffect(() => {
        if(selectedUF === '0'){
            return;
        }

        axios.get<IBGECITYResponde[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
            .then(response => {
                const cityName = response.data.map(city => city.nome);

                setCities(cityName);
            });

    }, [selectedUF]);

    function handleselectedUF(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;

        setSelectedUF(uf);
        //console.log('peguei o valor de entrada', event.target.value)
    };

    return(
        <form action="">
            <select name="uf" id="uf" value={selectedUF} onChange={handleselectedUF}>
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                ))};
            </select>

            <select name="uf" id="city">
                <option value="0">Selecione uma cidade</option>
                {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))};
            </select>
        </form>
    )
}

export default IBGEAPI