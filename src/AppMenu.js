import React, { Component } from 'react'
import { Input, Menu, Icon, Dropdown } from 'semantic-ui-react'
import App from './App'

export default class MenuExampleTabularOnTop extends Component {
  state = { activeItem: 'escalas' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing>
          <Menu.Item
            name='escalas'
            active={activeItem === 'escalas'}
            onClick={this.handleItemClick}
          >
              <Icon name='calendar alternate outline' />
              Escalas
              </Menu.Item>
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='contatos'
            active={activeItem === 'contatos'}
            onClick={this.handleItemClick}
          />
          <Dropdown item text='More' simple>
              <Dropdown.Menu>
                  <Dropdown.Item icon='edit' text='Cadastro' />
                  <Dropdown.Item icon='settings' text='Configurações' />
                </Dropdown.Menu>
            </Dropdown>
            
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>

        <App/>
      </div>
    )
  }
}
