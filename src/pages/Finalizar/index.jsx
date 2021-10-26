import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


export const Finalizar = () => {

    const history = useHistory();
    function Voltar() {
        history.push('/carrinho');
    }


    function formatarPagseguro(valor) {
        valor = parseFloat(valor);
        var total = valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
        total = String(total);
        total = total.replace(".","");
        total = total.replace(",",".");
        return total;
    }


    const [produtos, getProdutos] = useState(null);

        useEffect(()=>{
            var carrinho = localStorage.getItem('carrinho');
            var produtos = null;
            if ( typeof carrinho == 'string' ) {
                produtos = JSON.parse(carrinho);
            }

            if ( produtos ) getProdutos(produtos);
        },[]);


    return(
        <>
            <h1 className="text-center">Finalizar Compra</h1>

            <form name="pagseguro" method="post" className="container" action="https://pagseguro.uol.com.br/v2/checkout/payment.html">
                <h4>Seus dados</h4>
                <input type="hidden" name="receiverEmail" value="suporte@lojamodelo.com.br"/>
                <input type="hidden" name="currency" value="BRL"/>
                <input type="text" name="senderName" className="form-control" placeholder="Digite seu nome completo" required/>
                <input type="email" name="senderEmail" className="form-control" placeholder="Digite seu e-mail" required/>
                
                    {
                        produtos ? produtos.map((item,index) => (
                                <div>
                                    <input type="hidden" value={item.id} name={'itemId'+(index+1)}/>

                                    <input type="hidden" value={item.produto} name={'itemDescription'+(index+1)}/>

                                    <input type="hidden" value={formatarPagseguro(item.valor)} name={'itemAmount'+(index+1)}/>

                                    <input type="hidden" value={item.quantidade} name={'itemQuantity'+(index+1)}/>

                                </div>
                            )
                        )
                        :
                        <p>Não existem itens</p>
                        
                    }  
                    <br/> 
                <button type="submit" className="btn btn-success float-start">Pagamento</button>
                <button type="button" className="btn btn-danger float-end" onClick={()=>Voltar()}>Voltar</button>
                <br/>
            </form>
        </>
    )
}