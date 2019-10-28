import ReactDOM from 'react-dom';
import './index.css';
import React from 'react'
import MenuPrincipal from './MenuPrincipal'
import ReactNotifications from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import {
  Container,
  List,
  Segment,
} from 'semantic-ui-react'

const FixedMenuLayout = () => (
  <div>
  
  <ReactNotifications />
    <MenuPrincipal />

    <Segment inverted vertical>
      <Container textAlign='center'>
      {/* <Image centered size='mini' src='https://cdn0.iconfinder.com/data/icons/economico-a-business-icon-set/74/calendar-calender-timetable-512.png'/> */}
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
