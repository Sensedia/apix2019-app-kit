import React from 'react';

export const Recommendation = ({
    id,
    recom,
    index,
    selected,
    handleSelect,
}) => {
    if (!recom) {
        return <p>Recomendação não disponível</p>
    }
    let camisa = recom.find(r => r.type === "SHIRT");
    let camisahttp = (camisa.link.search('http') !== -1) ? '' : 'http://';
    let camisaimghttp = (camisa.image && camisa.image.search('http') !== -1) ? '' : 'http://';
    let calca = recom.find(r => r.type === "PANT");
    let calcahttp = (calca.link.search('http') !== -1) ? '' : 'http://';
    let calcaimghttp = (calca.image && calca.image.search('http') !== -1) ? '' : 'http://';
    let sapato = recom.find(r => r.type === "SHOES");
    let sapatohttp = (sapato.link.search('http') !== -1) ? '' : 'http://';
    let sapatoimghttp = (sapato.image && sapato.image.search('http') !== -1) ? '' : 'http://';
    let sum = recom.reduce((acc,cur) => acc += cur.price, 0);
    return (
        <li className="nav-item">
            <h4>Recomendação {index + 1}:</h4>
            <div style={{border: '2px solid'}} className={"text-center container border-" + ((selected[id] && selected[id][index]) ? 'success' : 'dark') + " rounded"}>
                <div className="row align-items-center">
                    <div className="col-sm">
                        <p>Camisa: <br/> <a href={camisahttp + camisa.link} target="_blank" rel="noopener noreferrer">{camisa.title}</a>
                        <br />Preço: <b>R$ {camisa.price.toFixed(2)}</b></p>
                    </div>
                    <div className="col-sm text-center">
                        {camisa.image && 
                        <img 
                            style={{maxHeight: 150}} 
                            className="img-fluid" 
                            src={camisaimghttp + camisa.image}
                            alt="Camisa"
                        />}
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-sm">
                        <p>Calça: <br/> <a href={calcahttp + calca.link} target="_blank" rel="noopener noreferrer">{calca.title}</a>
                        <br />Preço: <b>R$ {calca.price.toFixed(2)}</b></p>
                    </div>
                    <div className="col-sm text-center">
                        {calca.image && 
                        <img 
                            style={{maxHeight: 150}} 
                            className="img-fluid" 
                            src={calcaimghttp + calca.image}
                            alt="Calça"
                        />}
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-sm">
                        <p>Calçado: <br/> <a href={sapatohttp + sapato.link} target="_blank" rel="noopener noreferrer">{sapato.title}</a>
                        <br />Preço: <b>R$ {sapato.price.toFixed(2)}</b></p>
                    </div>
                    <div className="col-sm text-center">
                        {sapato.image && 
                        <img 
                            style={{maxHeight: 150}} 
                            className="img-fluid" 
                            src={sapatoimghttp + sapato.image}
                            alt="Calçado"
                        />}
                    </div>
                </div>
                Preço total: <b>R$ {sum.toFixed(2)}</b>
                <button
                    className={"btn btn-" + ((selected[id] && selected[id][index]) ? 'success' : 'dark') + ' m-2'}
                    onClick={e => handleSelect(id, index)}
                >Selecionar</button>
            </div>
        </li>
    )
}