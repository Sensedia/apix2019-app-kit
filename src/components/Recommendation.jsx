import { Dropdown } from 'react-bootstrap';
import React, { useState } from 'react';

export const Recommendation = ({
    id,
    recom,
    index,
    selected,
    handleSelect,
    handleParcelas
}) => {
    const [parcelas, setParcelas] = useState(1)

    const handleSetParcelas = num => {
        setParcelas(num);
        handleParcelas(id, index, num);
    }
    if (!recom || recom.length === 0) {
        return <p>Recomendação ainda não disponível</p>
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
            <div style={{border: '2px solid'}} className={"text-center container border-" + (camisa.chosen || (selected[id] && selected[id][index] && selected[id][index].selected) ? 'success' : 'dark') + " rounded"}>
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
                {!camisa.chosen &&
                <div>
                    Preço total: <b>R$ {sum.toFixed(2)}</b>
                    <button
                        className={"btn btn-" + ((selected[id] && selected[id][index] && selected[id][index].selected ) ? 'success' : 'dark') + ' m-2'}
                        onClick={e => handleSelect(id, index)}
                    >Selecionar</button>
                    { selected[id] && selected[id][index] && selected[id][index].selected &&
                    <div className="d-flex justify-content-center mb-2">
                        Número de parcelas:
                        <Dropdown>
                            <Dropdown.Toggle size="sm" className="ml-2" variant="primary" id="dropdown-payday">
                            {parcelas}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="overflow-auto" style={{height: 200}}>
                            {[1,2,3,4,5,6,7,8,9,10,11,12].map((num, i) => <Dropdown.Item key={i} onClick={() => {
                                handleSetParcelas(num)
                                }}>{num}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>}
                </div>}
                {camisa.chosen &&
                <div>
                    <h4 className="text-center text-success">Comprado</h4>
                </div>}
            </div>
        </li>
    )
}