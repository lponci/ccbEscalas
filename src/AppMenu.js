import React, { Component } from 'react'
import { Grid, Menu, Icon, Dropdown, Segment } from 'semantic-ui-react'

import AuxPorta from './AuxPorta'
import OrgRJM from './OrgRJM'

export default class MenuExampleSubMenu extends Component {
  constructor(){
    super()
    this.state={
      showMeAuxPorta: false,
      showMeRJM: false
      
    }
  }
    
  showAux = (e, { name }) => this.setState({ activeItem: name, showMeAuxPorta: true});

  showRJM = (e, { name }) => this.setState({ activeItem: name, showMeRJM: true});

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
              onClick={this.showAux}
            >
              Auxiliares da Porta
            </Menu.Item>
            <Menu.Item
              name='orgRjm'
              active={activeItem === 'orgRjm'}
              onClick={this.showRJM}
            >
              Organistas da Reunião de Jovens e Menores
            </Menu.Item>
            <Menu.Item
              name='orgOficial'
              active={activeItem === 'orgOficial'}
              onClick={this.showAux}
            >
              Organistas do Culto Oficial
            </Menu.Item>
            <Menu.Item
              name='porteiros'
              active={activeItem === 'porteiros'}
              onClick={this.showRJM}
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
        {this.state.showMeAuxPorta?
        <Grid.Column width={12} >
        <Segment raised>
          <AuxPorta/>
          </Segment>
      </Grid.Column>
      :null
        } 
        {this.state.showMeRJM?
        <Grid.Column width={12} >
        <Segment raised>
          <OrgRJM/>
          </Segment>
      </Grid.Column>
      :null
        } 

      
    </Grid>
      
    )
  }
}
