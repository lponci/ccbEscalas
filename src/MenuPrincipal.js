import React, { Component } from 'react'
import { Grid, Menu, Icon, Segment, Responsive } from 'semantic-ui-react'
import AuxPorta from './AuxPorta'
import OrgRJM from './OrgRJM'
import Porteiros from './Porteiros';
import ListaContato from './ListaContato';

export default class MenuPrincipal extends Component {
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

  showCadastro = (e, { name }) => this.setState({ activeItem: name, showMeContatos: false, showMePorteiros: false, showMeAuxPorta: false, showMeRJM: false, showMeCadastro: true });

  showContatos = (e, { name }) => this.setState({ activeItem: name, showMePorteiros: false, showMeAuxPorta: false, showMeRJM: false, showMeCadastro: false, showMeContatos: true });

  render() {
    const { activeItem } = this.state

    return (
      <Grid columns='2' style={{ padding: '5em 1em' }}>
        {/* <Responsive doubling minWidth={768}> */}
        <Grid.Column>
          <Segment raised>
            <Menu vertical >
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
            </Menu>
          </Segment>
        </Grid.Column>

        <Grid.Column >
          {this.state.showMeAuxPorta ?
            <Segment raised>
              <AuxPorta />
            </Segment>
            : null
          }
          {this.state.showMeRJM ?
            <Segment raised>
              <OrgRJM />
            </Segment>
            : null
          }
          {this.state.showMePorteiros ?
            <Segment raised>
              <Porteiros />
            </Segment>
            : null
          }
          {this.state.showMeContatos ?
            <Segment raised>
              <ListaContato />
            </Segment>
            : null
          }
        </Grid.Column>
      </Grid>
    )
  }
}
