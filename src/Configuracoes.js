import React, { Component } from 'react';
import { Header, Button, Icon, Divider, Grid, Table } from 'semantic-ui-react'
import { axios } from 'axios'

const nomes = ["Jessica", "Nayra", "Ana", "Rute"];

function fillMonths(qtMonths) {
  const datas = [];
  const mesAtual = new Date();
  for (var i = 0; i < qtMonths; i++) {
    datas.push(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + i, 1));
  }
  return datas;
};

function getNomeMes(dt) {
  return dt.toLocaleString(navigator.language, { month: 'long' });
};

function diaSemana(dt) {
  return dt.toLocaleString(navigator.language, { weekday: 'narrow' });
};

function getNome(index) {
  return nomes[index];
};

function createCells(now) {
  var index = 0;
  const daysOfYear = [];
  var dtInicio = new Date(now.getFullYear(), now.getMonth(), 1);
  var dtFim = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  for (var d = dtInicio; d <= dtFim; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === 0) {
      daysOfYear.push(
        <Table.Row>
          <Table.Cell width='4' negative textAlign="center">{d.getDate()}</Table.Cell>
          <Table.Cell width='4' negative textAlign="center">{diaSemana(d)}</Table.Cell>
          <Table.Cell textAlign="center">{getNome(index)}</Table.Cell>
        </Table.Row>
      );
    }
    index++
    if (index >= nomes.length) {
      index = 0;
    }
  }

  return daysOfYear;
};

const host = 'http://localhost:3001/api'

export default class OrgRJM extends Component {
  state = {
    data: [],
    mesesTabela: fillMonths(8)
  }

  handleButton = () => {
      this.getDataFromDb()
  }

  getDataFromDb = () => {
    fetch(host + "/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  }

  render() {
    const { mesesTabela, data} = this.state
    return (
      <div>
        <React.Fragment>
          <Divider horizontal>
            <Header as='h4'>
              Popular Escalas
           </Header>
          </Divider>
        </React.Fragment>
        <Button size='small' onClick={this.handleButton}>Aux Porta</Button>
        <Button size='small'>Org RJM</Button>
        <Button size='small' >Org Oficial</Button>
        <Button size='small'>Porteiros</Button>
        <br/>
        {data.map(dt=>(dt.nome))}
        <Grid>
          {mesesTabela.map(data => (
            <Grid.Column width='4'>
              <React.Fragment>
                <Divider horizontal>
                  <Header as='h4'>
                    {getNomeMes(data)}
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
                  {createCells(data)}
                </Table.Body>
              </Table>
            </Grid.Column>
          ))
          }
        </Grid>
      </div>
    )
  }
}
