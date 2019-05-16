import React from "react";
import { connect } from "react-redux";
import { Dropdown } from 'react-bootstrap';
import { images } from '../assets'; 
import "./style.css";

const COLORS = ["Preto","Azul","Marrom","Verde","Cinza","Laranja","Rosa","Roxo","Vermelho","Branco","Amarelo"];

class KitSelectPure extends React.Component {
  constructor(args) {
    super(args);
    
    // Initial state
    this.state = {
      camisa: {
        isSelected: true,
        color: "Branco",
        size: "",
        gender: "Masculino"
      },
      calca: {
        isSelected: false,
        color: "Branco",
        size: "",
        gender: "Masculino"
      },
      sapato: {
        isSelected: false,
        color: "Branco",
        size: "",
        gender: "Masculino"
      }
    };
  }

  componentDidMount() {
    this.state.camisa['element'].focus();
  }

  setRef = (which, ref) => {
    if (this.state[which].element == undefined) {
      let st = { ...this.state };
      st[which]["element"] = ref;
      this.setState(st);
    }
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

  setGender(gender, which) {
    let st = { ...this.state };
    st[which]["gender"] = gender;
    this.setState(st)
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Escolha do Kit</h2>
        <div className="row align-items-center">
          <div className="col-m">
            <div className="table">
              <div className="row justify-content-center frame">
                <img
                  ref={input => this.setRef("camisa", input)}
                  tabIndex="-1"
                  onClick={e => {
                    e.preventDefault();
                    this.state.camisa["element"].focus();
                    this.select("camisa");
                  }}
                  className="kit-image"
                  src={images["shirt" + (this.state.camisa["color"] ? this.state.camisa["color"] : "Branco")]}
                  alt={"Camisa"}
                />
              </div>
              <div className="row justify-content-center">
                <img
                  ref={input => this.setRef("calca", input)}
                  tabIndex="-1"
                  onClick={e => {
                    e.preventDefault();
                    this.state.calca["element"].focus();
                    this.select("calca");
                  }}
                  className="kit-image"
                  src={images["pants" + (this.state.calca["color"] ? this.state.calca["color"] : "Branco")]}
                  alt={"Calça"}
                />
              </div>
              <div className="row justify-content-center">
                <img
                  ref={input => this.setRef("sapato", input)}
                  tabIndex="-1"
                  onClick={e => {
                    e.preventDefault();
                    this.state.sapato["element"].focus();
                    this.select("sapato");
                  }}
                  className="kit-image"
                  src={images["shoes" + (this.state.sapato["color"] ? this.state.sapato["color"] : "Branco")]}
                  alt={"Calçado"}
                />
              </div>
            </div>
          </div>
          <div className="col-sm">
            {this.state.camisa.isSelected && (
              <div align="center" className="container">
                <h5 className="mb-4">Camisa</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" className={"mb-4" + (this.state.camisa["color"] ? " " + this.state.camisa["color"] : " Branco")} id="dropdown-color">
                    {this.state.camisa["color"] ? this.state.camisa["color"] : "Branco" }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {COLORS.map((color, i) => <Dropdown.Item key={i} className={color} onClick={() => {
                        this.setColor(color, "camisa")
                      }}>{color}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
                <input
                  type="text"
                  className="form-control w-25 m-2 mb-4 tamanho"
                  placeholder="Tam"
                  value={this.state.camisa["size"]}
                  onChange={e => this.setSize(e.target.value, "camisa")}
                />
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" className={"mb-4" + (this.state.camisa["gender"] ? " " + this.state.camisa["gender"] : " Masculino")} id="dropdown-gender">
                    {this.state.camisa["gender"] ? this.state.camisa["gender"] : "Masculino" }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { this.setGender("Masculino", "camisa") }}>Masculino</Dropdown.Item>
                    <Dropdown.Item onClick={() => { this.setGender("Feminino", "camisa") }}>Feminino</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            {this.state.calca.isSelected && (
              <div align="center" className="container">
                <h5 className="mb-4">Calça</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" className={"mb-4" + (this.state.calca["color"] ? " " + this.state.calca["color"] : " Branco")} id="dropdown-color">
                    {this.state.calca["color"] ? this.state.calca["color"] : "Branco" }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {COLORS.map((color, i) => <Dropdown.Item key={i} className={color} onClick={() => {
                        this.setColor(color, "calca")
                      }}>{color}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
                <input
                  type="text"
                  className="form-control w-25 m-2 mb-4 tamanho"
                  placeholder="Tam"
                  value={this.state.calca["size"]}
                  onChange={e => this.setSize(e.target.value, "calca")}
                />
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" className={"mb-4" + (this.state.calca["gender"] ? " " + this.state.calca["gender"] : " Masculino")} id="dropdown-gender">
                    {this.state.calca["gender"] ? this.state.calca["gender"] : "Masculino" }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { this.setGender("Masculino", "calca") }}>Masculino</Dropdown.Item>
                    <Dropdown.Item onClick={() => { this.setGender("Feminino", "calca") }}>Feminino</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            {this.state.sapato.isSelected && (
              <div align="center" className="container">
                <h5 className="mb-4">Calçado</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" className={"mb-4" + (this.state.sapato["color"] ? " " + this.state.sapato["color"] : " Branco")} id="dropdown-color">
                    {this.state.sapato["color"] ? this.state.sapato["color"] : "Branco" }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {COLORS.map((color, i) => <Dropdown.Item key={i} className={color} onClick={() => {
                        this.setColor(color, "sapato")
                      }}>{color}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
                <input
                  type="text"
                  className="form-control w-25 m-2 mb-4 tamanho"
                  placeholder="Tam"
                  value={this.state.sapato["size"]}
                  onChange={e => this.setSize(e.target.value, "sapato")}
                />
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" className={"mb-4" + (this.state.sapato["gender"] ? " " + this.state.sapato["gender"] : " Masculino")} id="dropdown-gender">
                    {this.state.sapato["gender"] ? this.state.sapato["gender"] : "Masculino" }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { this.setGender("Masculino", "sapato") }}>Masculino</Dropdown.Item>
                    <Dropdown.Item onClick={() => { this.setGender("Feminino", "sapato") }}>Feminino</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            <div align="center" className="container">
              <button className="btn btn-primary" onClick={this.handleSubmit}>Enviar</button>
            </div>
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
