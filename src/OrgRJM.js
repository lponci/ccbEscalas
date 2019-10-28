import React, { Component } from 'react';

import { Divider, Grid, Table } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'


export default class OrgRJM extends Component {

   state = {
    dataOrgRJM: [],
  }

  componentDidMount() {
    this.getDataOrgRJMFromDb()
  }

  getDataOrgRJMFromDb = () => {
    fetch("/getDataOrgRJM")
      .then(dataOrgRJM => dataOrgRJM.json())
      .then(res => {
        console.log(res.dataOrgRJM)
        this.setState({ dataOrgRJM: res.dataOrgRJM })
      });
  }


  render() {
    const { dataOrgRJM } = this.state

    return (
       <Grid>
          {dataOrgRJM.map(dtRJM => (
            <Grid.Column key={dtRJM._id} computer={4} mobile={8}>
              <React.Fragment>
                <Divider horizontal>
                  <Header as='h4'>
                    {dtRJM._id}
                  </Header>
                </Divider>
              </React.Fragment>
              <Table unstackable celled compact >
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
    )
  }
}
