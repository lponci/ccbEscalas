import React from 'react';
import "./App.css";
import { Icon, Table } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        width: '25%',
        margin: theme.spacing(10),
        overflowX: 'auto',
    },
    table: {
        minWidth: 10,
    },
}));

const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
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
                    <Table.Cell textAlign="center">{diaSemana(d)}</Table.Cell>
                    <Table.Cell textAlign="center">{d.getDate()}</Table.Cell>
                    <Table.Cell textAlign="center">Maria</Table.Cell>
                </Table.Row>
            );
        }

        if (d.getDay() === 0){
            daysOfYear.push(
                <Table.Row>
                    <Table.Cell negative textAlign="center">{diaSemana(d)}</Table.Cell>
                    <Table.Cell negative textAlign="center">{d.getDate()}</Table.Cell>
                    <Table.Cell textAlign="center">Maria</Table.Cell>
                </Table.Row>
            );
        }
    }
    return daysOfYear;
};

export default function SimpleTable() {
    var lista = teste()
 
    return (        
            <Table celled className="tabela">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell collapsing colSpan={3} textAlign="center">Data</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Irmãs</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width='1' textAlign="center" rowSpan={lista.length +1}>{mes()}</Table.Cell>
                    </Table.Row>
                    {lista}
                </Table.Body>
            </Table>
        
    );
}
