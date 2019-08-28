import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function createData(id, nome) {
    return {id, nome};
}

const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
];

const semana = ["D", "2º", "3º", "4º", "5º", "6º", "S"];

var dt = new Date();

function mes() {
    return meses[dt.getMonth()];
}

function diaSemana() {
    return semana[dt.getDay()];
}

function teste() {
    var now = new Date();
    var daysOfYear = [];
    for (var d = new Date(2012, 0, 1); d <= now; d.setDate(d.getDate() + 1)) {
        daysOfYear.push(new Date(d));
    }
}

const rows = [
    createData(1, 'Maria'),
    createData(2, 'Maria'),
    createData(3, 'Maria'),
    createData(4, 'Maria'),
    createData(5, 'Maria'),
];

export default function SimpleTable() {
    const classes = useStyles();
 
    return (
        <Paper className={classes.root}>
         
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3} align="center">Data</TableCell>
                        <TableCell align="center">Irmãs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center" rowSpan={6}>{mes()}</TableCell>
                    </TableRow>

                    {rows.map(row => (                        
                        <TableRow key={row.id}>
                            <TableCell align="center">{diaSemana()}</TableCell>
                            <TableCell align="center">{dt.getDate()}</TableCell>
                            <TableCell align="center">{row.nome}</TableCell>
                            <TableCell align="center">{teste()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
