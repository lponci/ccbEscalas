import React, { Component } from 'react'
import { Grid, Menu, Icon, Dropdown, Segment } from 'semantic-ui-react'

import AuxPorta from './AuxPorta'
import OrgRJM from './OrgRJM'
import Cadastro from './Cadastro'
import Porteiros from './Porteiros';
import ListaContato from './ListaContato';

export default class MenuExampleSubMenu extends Component {
  constructor() {
    super()
    this.state = {
      showMeAuxPorta: false,
      showMeRJM: false,
      showMeCadastro: false,
      showMePorteiros: false,
      showMeContatos: false
    }
  }

  showAux = (e, { name }) => this.setState({ activeItem: name, showMeContatos: false, showMePorteiros: false, showMeCadastro: false, showMeRJM: false, showMeAuxPorta: true });

  showRJM = (e, { name }) => this.setState({ activeItem: name, showMeContatos: false, showMePorteiros: false, showMeCadastro: false, showMeAuxPorta: false, showMeRJM: true });

  showPorteiros = (e, { name }) => this.setState({ activeItem: name, showMeContatos: false, showMeRJM: false, showMeCadastro: false, showMeAuxPorta: false, showMePorteiros: true });

  showCadastro = (e, { name }) => this.setState({ activeItem: name,  showMeContatos: false, showMePorteiros: false, showMeAuxPorta: false, showMeRJM: false, showMeCadastro: true });

  showContatos = (e, { name }) => this.setState({ activeItem: name, showMePorteiros: false, showMeAuxPorta: false, showMeRJM: false, showMeCadastro: false, showMeContatos: true });

  render() {
    const { activeItem } = this.state

    return (
      <Grid columns='2'>
        <Grid.Column width='3'>
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
                  onClick={this.showPorteiros}
                >
                  Porteiros
            </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item
              name='contatos'
              active={activeItem === 'contatos'}
              onClick={this.showContatos}
            >
              <Icon name='address book outline' />
              Contatos
          </Menu.Item>

            <Dropdown item text='Cadastros' selection icon='angle right'>
              <Dropdown.Menu>
                <Dropdown.Item icon='add user' text='Novo' onClick={this.showCadastro} />
                <Dropdown.Item icon='edit' text='Editar' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Grid.Column>
        {this.state.showMeAuxPorta ?
          <Grid.Column width={12}>
            <Segment raised>
              <AuxPorta />
            </Segment>
          </Grid.Column>
          : null
        }
        {this.state.showMeRJM ?
          <Grid.Column width={12} >
            <Segment raised>
              <OrgRJM />
            </Segment>
          </Grid.Column>
          : null
        }
        {this.state.showMeCadastro ?
          <Grid.Column width={12} >
            <Segment raised>
              <Cadastro />
            </Segment>
          </Grid.Column>
          : null
        }
        {this.state.showMePorteiros ?
          <Grid.Column width={12} >
            <Segment raised>
              <Porteiros />
            </Segment>
          </Grid.Column>
          : null
        }

        {this.state.showMeContatos ?
          <Grid.Column width={12} >
            <Segment raised>
              <ListaContato />
            </Segment>
          </Grid.Column>
          : null
        }
      </Grid>
    )
  }
}
