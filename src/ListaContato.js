import React, { Component } from 'react'
import { Button, Icon, Table, Modal, Radio, Form } from 'semantic-ui-react'
import Cadastro from './Cadastro';


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

export default class ListaContato extends Component {
  state = {
    data: [],
    open: false,
    name: '',
    cargo: '',
    submittedName: '',
    submittedPhone: '',
    submittedCargo: '',
    phone: ''
  }

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true })

  close = () => this.setState({ open: false, name:'', phone:'', cargo:'' })

  handleChangeRadio = (e, { value }) => this.setState({ value })  

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
    const { open, dimmer, data, name, cargo, phone, submittedName, submittedPhone, submittedCargo } = this.state
    return (
      <div>
        <Table >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Telefone</Table.HeaderCell>
              <Table.HeaderCell>Cargo</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.length <= 0 ? "NO DB ENTRIES YET" : data.map(dat => (
              <Table.Row>
                <Table.Cell width='1'>  
                <Radio
                  name='radioGroup'
                  value='this'
                  checked={this.state.value === 'this'}
                  onChange={this.handleChangeRadio}
                />
                </Table.Cell>
                <Table.Cell>{dat.nome}</Table.Cell>
                <Table.Cell>{dat.phone}</Table.Cell>
                <Table.Cell>{dat.cargo}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
                <Button
                  icon
                  labelPosition='left'
                  primary
                  size='small'
                  onClick={this.show('blurring')}
                >
                  <Icon name='user' /> Novo
                </Button>
                <Button size='small'>
                  <Icon name='edit' />
                  Editar
                  </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
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
                onClick={this.handleSubmit}
              />
            </Button.Group>

          </Modal.Actions>
          {/* <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, phone, cargo }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedName, submittedPhone, submittedCargo }, null, 2)}</pre> */}
        </Modal>
      </div>

    )
  }
}
