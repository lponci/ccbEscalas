import React, { Component } from 'react';
import "./App.css";
import { Divider, Grid, Table } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const semana = ["D", "2º", "3º", "4º", "5º", "6º", "S"];

const nomes = ["Nayra", "Jessica", "Ana", "Rute"];

function fillMonths(qtMonths) {
  const datas = [];
  const mesAtual = new Date();
  for (var i = 0; i < qtMonths; i++) {
    datas.push(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + i, 1));
  }
  return datas;
};

function getNomeMes(dt) {
  return meses[dt.getMonth()];
};

function diaSemana(dt) {
  return semana[dt.getDay()];
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
    if (index >= nomes.length){
      index = 0;
    }
  }

    return daysOfYear;
};

export default class OrgRJM extends Component {
  state = fillMonths(8);
  render() {

    return (
      <Grid>{
        this.state.map(data => (
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
    )
  }
}
