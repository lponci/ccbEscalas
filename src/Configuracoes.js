import React, { Component } from 'react';
import { Header, Button, Form, Divider, Grid, Table } from 'semantic-ui-react'
import axios from 'axios'
import { store } from 'react-notifications-component';

export default class Configuracoes extends Component {
  state = {
    dataOrgRJM: [],
    cargo: '',
    optionsCargo: [],
    numMeses: ''
  }

  componentDidMount() {
    this.getCargoFromDb()
  }

  handleButton2 = (cargoValue) => {
    this.getDataOrgRJMFromDb()
  }

  handleButton = (cargoValue, numMeses) => () => {
    if (!cargoValue) {
       store.addNotification({
         title: "Atenção!",
         message: "Um Cargo deve ser selecionado.",
         type: "warning",
         insert: "top",
         container: "bottom-center",
         animationIn: ["animated", "fadeIn"],
         animationOut: ["animated", "fadeOut"],
         dismiss: {
           duration: 3000,
         }
       });
      return
    }

    this.deleteAllDataOrgRJMFromDb()

    fetch("/getNomeContatoByCargo/" + cargoValue)
      .then(data => data.json())
      .then(res => {
        const mesAtual = new Date();
        for (var i = 0; i < numMeses; i++) {
          var dtInicio = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + i, 1);
          var nomeMes = dtInicio.toLocaleString(navigator.language, { month: 'long' });
          nomeMes = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
          var numMes = dtInicio.getMonth();
          var dtFim = new Date(dtInicio.getFullYear(), dtInicio.getMonth() + 1, 0);
          var j = 0
          for (var d = dtInicio; d <= dtFim; d.setDate(d.getDate() + 1)) {
            if (d.getDay() === 0) {
              const diaSemana = d.toLocaleString(navigator.language, { weekday: 'narrow' });
              fetch("/putDataOrgRJM", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "fullDate": d,
                  "mes": nomeMes,
                  "numMes": numMes,
                  "dia": d.getDate(),
                  "diaSemana": diaSemana,
                  "nome": res.data[j].nome
                }),
              })
              j++;
              if (j >= res.data.length) {
                j = 0;
              }
            }
          }
        }
        store.addNotification({
          title: "Sucesso!",
          message: "Tabela Organistas RJM preechida com sucesso.",
          type: "success",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
          }
        });
      });
  }

  getDataOrgRJMFromDb = () => {
    fetch("/getDataOrgRJM")
      .then(dataOrgRJM => dataOrgRJM.json())
      .then(res => {
        console.log(res.dataOrgRJM)
        this.setState({ dataOrgRJM: res.dataOrgRJM })
      });
  }

  getCargoFromDb = () => {
    fetch("/getCargo")
      .then(cargo => cargo.json())
      .then(res => this.setState({ optionsCargo: res.cargo }));
  }

  deleteAllDataOrgRJMFromDb = () => {
    axios.delete("/deleteAllDataOrgRJM").then(res => {
      console.log(res);
      console.log(res.data)
    });
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { numMeses, dataOrgRJM, cargo, optionsCargo } = this.state
    return (
      <div>
        <React.Fragment>
          <Divider horizontal>
            <Header as='h4'>
              Popular Escalas
           </Header>
          </Divider>
        </React.Fragment>
        <Form>
          <Form.Group>
          <Form.Input 
            type='number'
            style={{width: '70px'}}
            value={numMeses}
            onChange={event => this.setState({numMeses: event.target.value.replace(/\D/,'')})}/>
            {console.log(this.state.numMeses)}
          <Form.Select
              clearable
              fluid
              name='cargo'
              // label='Cargo'
              value={cargo}
              onChange={this.handleChange}
              options={optionsCargo}
              placeholder='Cargo'
            />
            <Form.Button onClick={this.handleButton(cargo, numMeses)}>Popular</Form.Button>
            <Form.Button onClick={this.handleButton2(cargo)}>Mostrar Tabela RJM</Form.Button>
          </Form.Group>
        </Form>
        
        <Grid>

          {dataOrgRJM.map(dtRJM => (
            <Grid.Column key={dtRJM._id} width='4'>
              <React.Fragment>
                <Divider horizontal>
                  <Header as='h4'>
                    {dtRJM._id}
                  </Header>
                </Divider>
              </React.Fragment>
              <Table celled compact >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan={2} textAlign="center">Data</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Irmãs</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {dtRJM.mesItem.map(dtRJMItem => (
                    <Table.Row key={dtRJMItem._id}>
                      <Table.Cell width='4' negative textAlign="center">{dtRJMItem.dia}</Table.Cell>
                      <Table.Cell width='4' negative textAlign="center">{dtRJMItem.diaSemana}</Table.Cell>
                      <Table.Cell textAlign="center">{dtRJMItem.nome}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    )
  }
}
