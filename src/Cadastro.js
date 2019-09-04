import React, { Component } from 'react'
import { Form, Icon } from 'semantic-ui-react'

const options = [
  { key: 'a', text: 'Auxiliar da Porta', value: 'auxiliarPorta' },
  { key: 'rjm', text: 'Organista RJM', value: 'orgRJM' },
  { key: 'o', text: 'Organista Oficial', value: 'orgOficial' },
  { key: 'p', text: 'Porteiro', value: 'porteiro' },
]

const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    if (!previousValue || value.length > previousValue.length) {
      if (currentValue.length <= 2) return currentValue;
      if (currentValue.length === 2) return `(${currentValue})`;
      if (currentValue.length <= 6) return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2)}`;
      if (currentValue.length === 6) return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2)}-`
      return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2, 3)} ${currentValue.slice(3, 7)}-${currentValue.slice(7, 11)}`;
    }
  };

  export default class Cadastro extends Component {
    constructor() {
        super();
        this.state = { phone: "", error: "" };
        this.handleChange = this.handleChange.bind(this);
      }

  handleChange({ target: { value } }) {
    const normalized = normalizeInput(value, this.state.phone);
    
    this.setState({ phone: normalized });
  };

  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input required fluid label='Nome' placeholder='Nome' />
          <Form.Input required fluid label='Telefone' placeholder='(xx)xxxxx-xxxx' value={this.state.phone} onChange={this.handleChange}/>
          <Form.Select
            clearable
            required
            fluid
            label='Cargo'
            options={options}
            placeholder='Cargo'
          />
        </Form.Group>
      </Form>
    )
  }
}
