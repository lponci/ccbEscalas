import React, { Component } from 'react';
import "./App.css";
import { Icon, Table } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'

const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "Agosto", "SET", "OUT", "NOV", "DEZ"
];

const semana = ["D", "2º", "3º", "4º", "5º", "6º", "S"];

const now = new Date();
const daysOfYear = [];

function mes() {
    return meses[now.getMonth()];
}

function diaSemana(dt) {
    return semana[dt.getDay()];
}

function teste() {
    var dtInicio = new Date(now.getFullYear(), now.getMonth(), 1);
    var dtFim = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    for (var d = dtInicio; d <= dtFim; d.setDate(d.getDate() + 1)) {
        if (d.getDay() === 1 || d.getDay() === 4){
            daysOfYear.push(
                <Table.Row>
                    <Table.Cell width='4' textAlign="center">{d.getDate()}</Table.Cell>
                    <Table.Cell width='4' textAlign="center">{diaSemana(d)}</Table.Cell>
                    <Table.Cell textAlign="center">Maria</Table.Cell>
                </Table.Row>
            );
        }

        if (d.getDay() === 0){
            daysOfYear.push(
                <Table.Row>
                    <Table.Cell width='4' negative textAlign="center">{d.getDate()}</Table.Cell>
                    <Table.Cell width='4' negative textAlign="center">{diaSemana(d)}</Table.Cell>
                    <Table.Cell textAlign="center">Maria</Table.Cell>
                </Table.Row>
            );
        }
    }
    return daysOfYear;
};

export default class Tabela extends Component{
    state = { lista: teste() }
    
 
    render (){
        const { lista } = this.state
    return (      
        <div>
            <Header  className='tabela' as='h3' dividing>
            {mes()}
            </Header>
        
            <Table celled compact >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={2} textAlign="center">Data</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Irmãs</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {lista}
                </Table.Body>
            </Table>
            </div>
            )
        }
    }
