import ReactDOM from 'react-dom';
import './index.css';
import React from 'react'
import MenuPrincipal from './MenuPrincipal'
import axios from 'axios';
import {
  Container,
  Dropdown,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

const FixedMenuLayout = () => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src='https://cdn0.iconfinder.com/data/icons/economico-a-business-icon-set/74/calendar-calender-timetable-512.png' style={{ marginRight: '1.5em' }} />
          Escalas
        </Menu.Item>
        <Menu.Item as='a'>Inicio</Menu.Item>

        <Dropdown item simple text='Escalas'>
          <Dropdown.Menu>
            <Dropdown.Item>Auxiliares da Porta</Dropdown.Item>
            <Dropdown.Item>
              <i className='dropdown icon' />
              <span className='text'>Organistas</span>
              <Dropdown.Menu>
                <Dropdown.Item>Reunião de Jovens e Menores</Dropdown.Item>
                <Dropdown.Item>Culto Oficial</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>Porteiros</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>

    <MenuPrincipal />

    <Segment bottom inverted vertical style={{ padding: '4em 0em' }}>
      <Container textAlign='center'>
      {<Image centered size='mini' src='https://cdn0.iconfinder.com/data/icons/economico-a-business-icon-set/74/calendar-calender-timetable-512.png'  />
        /* <Image centered size='mini' src='/logo.png' /> */}
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            @Ponci
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
)

ReactDOM.render(
  <FixedMenuLayout />,
  document.getElementById('root')
);
