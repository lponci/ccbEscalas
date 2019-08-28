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
        marginTop: theme.spacing(5),
        overflowX: 'auto',
    },
    table: {
        // minWidth: 1,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function checkRow(rowName) {
    if (rowName) {
        return {rowName};
    }
    return {rowName};
}

const rows = [
    createData('AGO', '5º', 1, 'Maria', 4.0),
    createData('AGO', 'D', 3, 37, 4.3),
    createData('AGO', '2º', 5, 24, 6.0),
    createData('AGO', '5º', 7, 67, 4.3),
    createData('AGO', 'D', 9, 49, 3.9),
];

export default function SimpleTable() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3} align="center">Data</TableCell>
                        <TableCell colSpan={2} align="center">Irmãs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell rowSpan={5} >{row.name}</TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell align="center">{row.fat}</TableCell>
                            <TableCell align="center">{row.carbs}</TableCell>
                            <TableCell align="center">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
