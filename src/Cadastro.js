import React, { Component } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from "axios";

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

  state = {
    name: '',
    cargo: '',
    submittedName: '',
    submittedPhone: '',
    submittedCargo: '',
    phone: ''
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, phone, cargo } = this.state
    this.setState({ submittedName: name, submittedPhone: phone, submittedCargo: cargo })
  }

  handlePhoneChange = ({ target: { value } }) => {
    const normalized = normalizeInput(value, this.state.phone);
    this.setState({ phone: normalized });
  };

  render() {
    const { name, cargo, phone, submittedName, submittedPhone, submittedCargo } = this.state
    return (
<div>
      <Modal.Header>Novo Cadastro</Modal.Header>
      <Modal.Content>
        
          <Form>
            <Form.Group widths='equal'>
              <Form.Input required fluid name='name' label='Nome' placeholder='Nome' value={name} onChange={this.handleChange} />
              <Form.Input required fluid name='phone' label='Telefone' placeholder='(xx)xxxxx-xxxx' value={phone} onChange={this.handlePhoneChange} />
              <Form.Select
                clearable
                required
                fluid
                name='cargo'
                label='Cargo'
                value={cargo}
                onChange={this.handleChange}
                options={options}
                placeholder='Cargo'
              />

            </Form.Group>
          </Form>
        
      </Modal.Content>
      <Modal.Actions>
        <Button.Group>
          <Button color='red' onClick={this.close}>
            Cancelar
            </Button>
          <Button.Or text='ou' />
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content="Salvar"
            onClick={this.close}
          />
        </Button.Group>

      </Modal.Actions>
      </div>
      //   <strong>onChange:</strong>
      //   <pre>{JSON.stringify({ name, phone, cargo }, null, 2)}</pre>
      //   <strong>onSubmit:</strong>
      //   <pre>{JSON.stringify({ submittedName, submittedPhone, submittedCargo }, null, 2)}</pre>
      
    )
  }
}
