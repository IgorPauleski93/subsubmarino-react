import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
    const [produtos,getProdutos] = useState([]);
    
    useEffect ( () = {
        axios.get('http://react.professorburnes.com.br').then((response) => {
            console.log(response.data);
        })
    })

    return(
        <>
            <h1 className="text-center">Produtos em Destaque</h1>
        </>
    )
}