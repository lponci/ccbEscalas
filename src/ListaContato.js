import React, { Component } from 'react'
import { Button, Icon, Table, Modal, Image, Header } from 'semantic-ui-react'
import Cadastro from './Cadastro';

export default class ListaContato extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Table basic='very' >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Telefone</Table.HeaderCell>
              <Table.HeaderCell>Cargo</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>John Lilki</Table.Cell>
              <Table.Cell>September 14, 2013</Table.Cell>
              <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie Harington</Table.Cell>
              <Table.Cell>January 11, 2014</Table.Cell>
              <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill Lewis</Table.Cell>
              <Table.Cell>May 11, 2014</Table.Cell>
              <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
                <Button
                  floated='right'
                  icon
                  labelPosition='left'
                  primary
                  size='small'
                  onClick={this.show('blurring')}
                >
                  <Icon name='user' /> Add User
          </Button>
                <Button size='small'>Approve</Button>
                <Button disabled size='small'>
                  Approve All
          </Button>

              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Novo Cadastro</Modal.Header>
          <Modal.Content>
          <Cadastro />
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.close}>
              Cancelar
    </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Salvar"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
       
    )
  }
}
