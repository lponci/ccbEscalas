import React, { Component } from 'react';
import { Header, Button, Form, Divider, Grid, Table } from 'semantic-ui-react'
import { axios } from 'axios'

const nomes = ["Jessica", "Nayra", "Ana", "Rute"];



const host = 'http://localhost:3001/api'

export default class OrgRJM extends Component {
  state = {
    data: [],
    dataOrgRJM: [],
    cargo: '',
    optionsCargo: [],
    mesesTabela: []
  }

  componentDidMount() {
    this.getCargoFromDb()
    this.fillMonths(8);
  }

  fillMonths = (qtMonths) => {
    const datas = [];
    const mesAtual = new Date();
    for (var i = 0; i < qtMonths; i++) {
      datas.push(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + i, 1));
    }
    this.setState({ mesesTabela: datas });
  };

  handleButton2 = () => {
    this.getDataOrgRJMFromDb()
  }

  handleButton = (cargoValue) => () => {
    if (!cargoValue) {
      alert("Cargo obrigatorio")
      return
    }
    axios.delete(host + "/deleteAllDataOrgRJM")

    fetch(host + "/getNomeContatoByCargo/" + cargoValue)
      .then(data => data.json())
      .then(res => {
        const mesAtual = new Date();
        for (var i = 0; i < 2; i++) {
          var dtInicio = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + i, 1);
          var nomeMes = dtInicio.toLocaleString(navigator.language, { month: 'long' });
          var dtFim = new Date(dtInicio.getFullYear(), dtInicio.getMonth() + 1, 0);
          var j = 0
          for (var d = dtInicio; d <= dtFim; d.setDate(d.getDate() + 1)) {
            if (d.getDay() === 0) {
              const diaSemana = d.toLocaleString(navigator.language, { weekday: 'narrow' });

              fetch(host + "/putDataOrgRJM", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "mes": nomeMes,
                  "dia": d.getDate(),
                  "diaSemana": diaSemana,
                  "nome": res.data[j].nome
                }),
              }).then(response => {
                console.log(response)
                response.data.success ? alert("Tabela preenchida com sucesso!") : alert(response.data.error)
              });

              j++;
              if (j >= res.data.size) {
                j = 0;
              }
            }
          }
        }
      });
  }

  getDataOrgRJMFromDb = () => {
    fetch(host + "/getDataOrgRJM")
      .then(dataOrgRJM => dataOrgRJM.json())
      .then(res => {
        console.log(res.dataOrgRJM)
        this.setState({ dataOrgRJM: res.dataOrgRJM })
      });
  }

  getNomeContatoFromDb = (cargoValue) => () => {
    fetch(host + "/getNomeContatoByCargo/" + cargoValue)
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  }

  getCargoFromDb = () => {
    fetch(host + "/getCargo")
      .then(cargo => cargo.json())
      .then(res => this.setState({ optionsCargo: res.cargo }));
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { mesesTabela, data, dataOrgRJM, cargo, optionsCargo } = this.state
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
            <Form.Select
              clearable
              required
              fluid
              name='cargo'
              // label='Cargo'
              value={cargo}
              onChange={this.handleChange}
              options={optionsCargo}
              placeholder='Cargo'
            />
            <Form.Button size='small' onClick={this.handleButton(cargo)}>Popular</Form.Button>
          </Form.Group>
        </Form>
        <Button size='small' onClick={this.handleButton2}>getTabela</Button>
        <br />
        {data.map(dt => (dt.nome))}
        <Grid>
          <Grid.Column width='4'>
            <React.Fragment>
              <Divider horizontal>
                <Header as='h4'>
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
                {dataOrgRJM.map(dtRJM => (
                  <Table.Row key={dtRJM._id}>
                    <Table.Cell width='4' negative textAlign="center">{dtRJM.dia}</Table.Cell>
                    <Table.Cell width='4' negative textAlign="center">{dtRJM.diaSemana}</Table.Cell>
                    <Table.Cell textAlign="center">{dtRJM.nome}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
