import React, { Component } from 'react';

import { Divider, Grid, Table } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const semana = ["D", "2º", "3º", "4º", "5º", "6º", "S"];

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

function createCells(now) {
  const daysOfYear = [];
  var dtInicio = new Date(now.getFullYear(), now.getMonth(), 1);
  var dtFim = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  for (var d = dtInicio; d <= dtFim; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === 1 || d.getDay() === 4) {
      daysOfYear.push(
        <Table.Row>
          <Table.Cell  textAlign="center">{d.getDate()}</Table.Cell>
          <Table.Cell  textAlign="center">{diaSemana(d)}</Table.Cell>
          <Table.Cell textAlign="center">Joao</Table.Cell>
          <Table.Cell textAlign="center">Paulo</Table.Cell>
        </Table.Row>
      );
    }

    if (d.getDay() === 0) {
      daysOfYear.push(
        <Table.Row>
          <Table.Cell  negative textAlign="center">{d.getDate()}</Table.Cell>
          <Table.Cell negative textAlign="center">{diaSemana(d)}</Table.Cell>
          <Table.Cell textAlign="center">Joao</Table.Cell>
          <Table.Cell textAlign="center">Paulo</Table.Cell>
        </Table.Row>
      );
    }
  }
  return daysOfYear;
};

export default class Porteiros extends Component {
  state = fillMonths(4);
  render() {

    return (
      <div>
      <Grid columns='4'>
      
        {this.state.map(data => (
          <Grid.Column >
          
          <React.Fragment>
            <Divider horizontal>
              <Header as='h4'>
                {getNomeMes(data)}
              </Header>
            </Divider>
          </React.Fragment>

          <Table celled compact >
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan={2} textAlign="center">Data</Table.HeaderCell>
                <Table.HeaderCell colSpan={2} textAlign="center">Irmãos</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {createCells(data)}
            </Table.Body>
          </Table>
          
           </Grid.Column>
        )
        )
        }
        
      
      </Grid>
      </div>
    )
  }
}
