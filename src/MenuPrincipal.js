import React, { Component } from 'react'
import { Grid, Image, Menu, Icon, Segment, Sidebar, Header, Divider, Container } from 'semantic-ui-react'
import AuxPorta from './AuxPorta'
import OrgRJM from './OrgRJM'
import Porteiros from './Porteiros';
import ListaContato from './ListaContato';
import Configuracoes from './Configuracoes';

export default class MenuPrincipal extends Component {
  constructor() {
    super()
    this.state = {
      showMeAuxPorta: false,
      showMeRJM: false,
      showMeCadastro: false,
      showMePorteiros: false,
      showMeContatos: false,
      showMeConfigs: false,
      visible: false
    }
  }

  showAux = (e, { name }) => this.setState({ visible: false, activeItem: name, showMeConfigs: false, showMeContatos: false, showMePorteiros: false, showMeCadastro: false, showMeRJM: false, showMeAuxPorta: true });

  showRJM = (e, { name }) => this.setState({ visible: false, activeItem: name, showMeConfigs: false, showMeContatos: false, showMePorteiros: false, showMeCadastro: false, showMeAuxPorta: false, showMeRJM: true });

  showPorteiros = (e, { name }) => this.setState({ visible: false, activeItem: name, showMeConfigs: false, showMeContatos: false, showMeRJM: false, showMeCadastro: false, showMeAuxPorta: false, showMePorteiros: true });

  showCadastro = (e, { name }) => this.setState({ visible: false, activeItem: name, showMeConfigs: false, showMeContatos: false, showMePorteiros: false, showMeAuxPorta: false, showMeRJM: false, showMeCadastro: true });

  showContatos = (e, { name }) => this.setState({ visible: false, activeItem: name, showMeConfigs: false, showMePorteiros: false, showMeAuxPorta: false, showMeRJM: false, showMeCadastro: false, showMeContatos: true });

  showConfigs = (e, { name }) => this.setState({ visible: false, activeItem: name, showMePorteiros: false, showMeAuxPorta: false, showMeRJM: false, showMeCadastro: false, showMeContatos: false, showMeConfigs: true });

  setVisible = (boolean) => () => this.setState({ visible: boolean })

  render() {
    const { activeItem, visible } = this.state

    return (
      <div>
     
     
            <Sidebar.Pushable  >




              <Sidebar
                as={Menu}
                animation='push'
                icon='labeled'
                inverted
                onHide={this.setVisible(false)}
                vertical
                visible={visible}
                width='thin'
              >
                {/* <Segment raised> */}
                {/* <Menu fluid vertical > */}
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
                <Menu.Item
                  name='configs'
                  active={activeItem === 'configs'}
                  onClick={this.showConfigs}
                >
                  <Icon name='settings' />
                  Configurações
            </Menu.Item>
              </Sidebar>
              <Sidebar.Pusher
               dimmed={visible}
               style={{ minHeight: "100vh" }}>


  <Menu inverted>

                  <Menu.Item onClick={this.setVisible(true)}>
                    <Icon name='bars' />
                  </Menu.Item>
                      <Menu.Item>
                    <Image size='mini' src='https://cdn0.iconfinder.com/data/icons/economico-a-business-icon-set/74/calendar-calender-timetable-512.png' style={{ marginRight: '1.5em' }} />
                    Escalas PJ3
                  </Menu.Item>
                </Menu>

                
              {/* <Container fluid> */}

               
                {/* </Container> */}
                {/* </Menu> */}
                {/* </Segment> */}

                {/* </Grid.Column> */}
                {/* </Responsive> */}

                {/* <Grid.Column mobile={16} computer={10} > */}
                {this.state.showMeAuxPorta ?
                  <Container >
                    <Divider horizontal>
                      <Header as='h4'>
                        Auxiliares da Porta
                      </Header>
                    </Divider>
                    <AuxPorta />
                  </Container>
                  : null
                }
                {this.state.showMeRJM ?
                  <Container >
                    <OrgRJM />
                  </Container >
                  : null
                }
                {this.state.showMePorteiros ?
                  <Segment raised>
                    <Porteiros />
                  </Segment>
                  : null
                }
                {this.state.showMeContatos ?
                  <Container >
                    <ListaContato />
                  </Container >
                  : null
                }
                {this.state.showMeConfigs ?
                  <Container >
                    <Configuracoes />
                  </Container >
                  : null
                }

              </Sidebar.Pusher>
            </Sidebar.Pushable>
            </div>
    
    )
  }
}
