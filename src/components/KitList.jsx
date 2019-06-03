import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { history } from "../history";
import { MDBIcon, MDBBtn } from "mdbreact";
import { Recommendation } from "./Recommendation";
import { recommendationsActions } from '../actions';

const getIndexName = (index) => {
  return ['firstRecommendation','secondRecommendation','thirdRecommendation'][index];
}

const KitListPure = ({
  kits,
  getKits,
  buyRecommendations,
  getKitsErrorMessage,
  buyErrorMessage,
  buySuccessMessage,
  deleteKitErrorMessage,
  clearMessage
}) => {

  const [active, setActive] = useState(0);
  const [selectedKits, setSelectedKits] = useState({})

  useEffect(() => {
    console.log('getting kits')
    getKits();
  }, []);

  const handleSelectRecommendation = (id, index) => {
    let kit = kits.find(r => r.id === id);
    if (kit){
      if (!selectedKits[id]) {
        setSelectedKits({ 
          ...selectedKits, 
          [id]: { 
            [index]: {
              selected: true,
              parcelas: 1,
              value: kit[getIndexName(index)].reduce((acc,cur) => acc += cur.price, 0),
              description: kit[getIndexName(index)].reduce((acc, cur) => acc += cur.title + " - ","")
            }
          } 
        })
      } else {
        let k = selectedKits[id];
        if (k[index]) {
          if (!k[index].selected) {
            k[index]['selected'] = true;
          } else {
            k[index]['selected'] = false;
          }
        } else {
          k = {
            ...k,
            [index]: {
              selected: true,
              parcelas: 1,
              value: kit[getIndexName(index)].reduce((acc,cur) => acc += cur.price, 0),
              description: kit[getIndexName(index)].reduce((acc, cur) => acc += cur.title + " - ","")
            }
          }
        }
        setSelectedKits({ ...selectedKits, [id]: k });
      }
    }
  }

  const handleParcelas = (id, index, num) => {
    if (kits.filter(r => r.id === id)){
      let k = selectedKits[id];
      if (k[index]) {
        k[index]['parcelas'] = num;
      }
      setSelectedKits({ ...selectedKits, [id]: k });
    }
  }

  const handleBuySelected = e => {
    e.preventDefault();
    buyRecommendations(selectedKits);
  }

  const handleClick = (e,i) => {
    e.preventDefault();
    clearMessage();
    setActive(i);
  }

  console.log(kits)

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <h2 className="text-center">Listagem de Kits</h2>
      {(!kits || kits.length === 0) &&
      <div className="text-center">
        <h4>Não há recomendações disponíveis ainda!</h4>
        <MDBBtn size="sm" color="secondary" onClick={e => { history.push("/kit-select") }}>
          <MDBIcon icon="plus" className="m-2"/>Adicionar</MDBBtn>
        {getKitsErrorMessage && 
        <div className="alert alert-danger fade show" role="alert">
          {getKitsErrorMessage}
        </div>}
      </div>}
      {kits && kits.length > 0 && (
        <div className="row justify-content-center">
          <div className="col-">
            <p>Kits cadastrados</p>
            <ul className="nav flex-column m-2">
            {kits.map((recom, i) => 
              <li key={i} className="nav-item">
              <button className="btn btn-secondary m-2" onClick={e => handleClick(e,i)}>
                Kit {i+1}
              </button>
            </li>)}
            <li>
            <MDBBtn size="sm" color="secondary" onClick={e => { history.push("/kit-select") }}>
              <MDBIcon icon="plus" className="m-2"/>Adicionar</MDBBtn>
            </li>
            </ul>
          </div>
          <div className="col-md">
            <ul className="nav flex-column m-2">
              <Recommendation
                id={kits[active].id} 
                recom={kits[active].firstRecommendation}
                index={0}
                selected={selectedKits}
                handleSelect={handleSelectRecommendation}
                handleParcelas={handleParcelas}
              />
              <Recommendation
                id={kits[active].id} 
                recom={kits[active].secondRecommendation}
                index={1}
                selected={selectedKits}
                handleSelect={handleSelectRecommendation}
                handleParcelas={handleParcelas}
              />
              <Recommendation
                id={kits[active].id} 
                recom={kits[active].thirdRecommendation}
                index={2}
                selected={selectedKits}
                handleSelect={handleSelectRecommendation}
                handleParcelas={handleParcelas}
              />
            </ul>
            <div className="text-right">
              {buyErrorMessage && 
                <div className="alert alert-danger fade show" role="alert">
                  {buyErrorMessage}
                </div>}
              {buySuccessMessage && 
                <div className="alert alert-success fade show" role="alert">
                  {buySuccessMessage}
                </div>}
              {deleteKitErrorMessage && 
                <div className="alert alert-success fade show" role="alert">
                  {deleteKitErrorMessage}
                </div>}
              <button 
                className="btn btn-primary"
                onClick={handleBuySelected}
                >Comprar recomendações selecionadas</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export const KitList = connect(
  state => {
    return { ...state.auth, ...state.kits, ...state.recommendations };
  },
  { ...recommendationsActions }
)(KitListPure);
