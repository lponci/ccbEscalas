import React, { Component } from 'react'
import { Grid, Menu, Icon, Dropdown, Segment } from 'semantic-ui-react'

import AuxPorta from './AuxPorta'

export default class MenuExampleSubMenu extends Component {
  state = { }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name }, this.sayHello(this));

  sayHello(e){
    alert(`Hello ${this.props.name}`);
  }

    render() {
    const { activeItem } = this.state

    return (
        <Grid columns={2} padded='horizontally'>
          <Grid.Column width={3}>
        <Menu vertical>
          <Menu.Item>
              <Icon name='calendar alternate outline' />
              Escalas
              <Menu.Menu>
            <Menu.Item
              name='auxPorta'
              active={activeItem === 'auxPorta'}
              onClick={this.handleItemClick}
            >
              Auxiliares da Porta
            </Menu.Item>
            <Menu.Item
              name='orgRjm'
              active={activeItem === 'orgRjm'}
              onClick={this.handleItemClick}
            >
              Organistas da Reunião de Jovens e Menores
            </Menu.Item>
            <Menu.Item
              name='orgOficial'
              active={activeItem === 'orgOficial'}
              onClick={this.handleItemClick}
            >
              Organistas do Culto Oficial
            </Menu.Item>
            <Menu.Item
              name='porteiros'
              active={activeItem === 'porteiros'}
              onClick={this.handleItemClick}
            >
              Porteiros
            </Menu.Item>
          </Menu.Menu>
          </Menu.Item>
          <Menu.Item
            name='contatos'
            active={activeItem === 'contatos'}
            onClick={this.handleItemClick}
          >
          <Icon name='address book outline' />
              Contatos
          </Menu.Item>

          <Dropdown item text='More'>
              <Dropdown.Menu>
                  <Dropdown.Item icon='add user' text='Cadastro' />
                  <Dropdown.Item icon='settings' text='Configurações' />
                </Dropdown.Menu>
            </Dropdown>
        </Menu>
        </Grid.Column>
        <Grid.Column width={12} >
        <Segment raised>
          <AuxPorta/>
          </Segment>
      </Grid.Column>
       
    </Grid>
      
    )
  }
}
