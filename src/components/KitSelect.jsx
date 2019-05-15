import React from "react";
import { connect } from "react-redux";
import { Dropdown } from 'react-bootstrap';
import "./style.css";

const COLORS = ["Preto","Branco","Rosa","Azul","Anil","Verde","Amarelo","Vermelho"];

class KitSelectPure extends React.Component {
  constructor(args) {
    super(args);

    this.state = {
      camisa: {
        isSelected: false
      },
      calca: {
        isSelected: false
      },
      sapato: {
        isSelected: false
      }
    };
  }

  select(which) {
    let st = { ...this.state };
    st.camisa.isSelected = false;
    st.calca.isSelected = false;
    st.sapato.isSelected = false;
    st[which].isSelected = true;
    this.setState(st);
  }

  setColor(color, which) {
    let st = { ...this.state };
    st[which]["color"] = color;
    this.setState(st);
  }

  setSize(size, which) {
    let st = { ...this.state };
    st[which]["size"] = size;
    this.setState(st)
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Escolha do Kit</h1>
        <div className="row">
          <div className="col-sm">
            <div className="table">
              <div className="row justify-content-center">
                <img
                  ref={input => (this.state.camisa["element"] = input)}
                  tabIndex="-1"
                  onClick={e => {
                    e.preventDefault();
                    this.state.camisa["element"].focus();
                    this.select("camisa");
                  }}
                  className="kit-image"
                  src="https://picsum.photos/150/250"
                />
              </div>
              <div className="row justify-content-center">
                <img
                  ref={input => (this.state.calca["element"] = input)}
                  tabIndex="-1"
                  onClick={e => {
                    e.preventDefault();
                    this.state.calca["element"].focus();
                    this.select("calca");
                  }}
                  className="kit-image"
                  src="https://picsum.photos/150/200"
                />
              </div>
              <div className="row justify-content-center">
                <img
                  ref={input => (this.state.sapato["element"] = input)}
                  tabIndex="-1"
                  onClick={e => {
                    e.preventDefault();
                    this.state.sapato["element"].focus();
                    this.select("sapato");
                  }}
                  className="kit-image"
                  src="https://picsum.photos/200/100"
                />
              </div>
            </div>
          </div>
          <div className="col-sm">
            {this.state.camisa.isSelected && (
              <div className="container">
                <Dropdown>
                  <Dropdown.Toggle variant="success" className={this.state["camisa"]["color"] ? this.state["camisa"]["color"] : ""} id="dropdown-color">
                    {this.state["camisa"]["color"] ? this.state["camisa"]["color"] : "Cor" }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {COLORS.map((color, i) => <Dropdown.Item className={color} onClick={() => {
                        this.setColor(color, "camisa")
                      }}>{color}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
                <input
                  type="number"
                  className="form-control w-25 m-2 tamanho"
                  placeholder="Tamanho"
                  onChange={e => this.setSize(e.target.value, "camisa")}
                />
              </div>
            )}
            {this.state.calca.isSelected && <h1>calça</h1>}
            {this.state.sapato.isSelected && <h1>sapato</h1>}
          </div>
        </div>
      </div>
    );
  }
}

export const KitSelect = connect(
  state => state,
  undefined
)(KitSelectPure);
