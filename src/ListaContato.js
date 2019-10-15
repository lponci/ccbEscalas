import React, { Component } from 'react'
import { Button, Icon, Table, Modal, Radio, Form } from 'semantic-ui-react'
import axios from 'axios'

const host = 'http://localhost:3001/api'

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
    openEdit: false,
    openDelete: false,
    name: '',
    cargo: '',
    submittedName: [],
    submittedPhone: '',
    submittedCargo: '',
    phone: '',
    itemSelected: '',
    optionsCargo: [],

  }

  componentDidMount() {
    this.getDataFromDb();
    this.getCargoFromDb();
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
    fetch(host + "/getContato")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  }

  getCargoFromDb = () => {
    fetch(host + "/getCargo")
      .then(cargo => cargo.json())
      .then(res => this.setState({ optionsCargo: res.cargo }));
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true })

  close = () => this.setState({ open: false, name: '', phone: '', cargo: '' })

  toDelete = (dimmer) => () => {
    !this.state.value ? alert("Selecione um registro para deletar") : this.setState({ dimmer, openDelete: true })
  }

  toEdit = (dimmer) => () => {
    !this.state.value ? alert("Selecione um registro para editar") : (
      axios.get(host + "/getContatoById/" + this.state.value)
        .then(res => (
          this.setState({
            dimmer,
            openEdit: true,
            name: res.data.data.nome,
            phone: res.data.data.phone,
            cargo: res.data.data.cargo
          })
        ))
    )
  }

  closeDelete = () => this.setState({ openDelete: false })

  closeEdit = () => this.setState({ openEdit: false, name: '', phone: '', cargo: '' })

  handleChangeRadio = (e, { value }) => {
    this.setState({ value })
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handlePutData = () => {
    const { name, phone, cargo } = this.state
    axios.post(host + "/putContato", {
      nome: name,
      cargo: cargo,
      phone: phone
    }).then(response => {
      response.data.success ? this.close() : alert(response.data.error)
    });
  }

  handleDeleteData = () => {
    axios.delete(host + "/deleteContato", {
      data: {
        id: this.state.value
      }
    }).then(response => {
      response.data.success ? this.closeDelete() : alert(response.data.error)
    });
  }

  handleUpdateData = () => {
    const { name, phone, cargo } = this.state
    axios.post(host + "/updateContato", {
      id: this.state.value,
      update: {
        nome: name,
        cargo: cargo,
        phone: phone
      }
    }).then(response => {
      response.data.success ? this.closeEdit() : alert(response.data.error)
    });
  }

  handlePhoneChange = ({ target: { value } }) => {
    const normalized = normalizeInput(value, this.state.phone);
    this.setState({ phone: normalized });
  }

  render() {
    const { open, openEdit, openDelete, dimmer, data, name, cargo, phone, optionsCargo } = this.state
    return (
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Telefone</Table.HeaderCell>
              <Table.HeaderCell>Cargo</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(dat => (
              <Table.Row key={dat._id}>
                <Table.Cell width='1'>
                  <Radio
                    name='radioGroup'
                    value={dat._id}
                    checked={this.state.value === dat._id}
                    onChange={this.handleChangeRadio}
                  />
                </Table.Cell>
                <Table.Cell>{dat.nome}</Table.Cell>
                <Table.Cell>{dat.phone}</Table.Cell>
                <Table.Cell>{dat.cargo.map(dc => (dc.text))}</Table.Cell>
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
                <Button size='small' onClick={this.toEdit('blurring')}>
                  <Icon name='edit' />
                  Editar
                  </Button>
                <Button size='small' color='red' onClick={this.toDelete('blurring')}>
                  <Icon name='remove user' />
                  Deletar
                  </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        {/* ADICIONAR NOVO CONTATO */}
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Novo Cadastro</Modal.Header>
          <Modal.Content>
            <Form success>
              <Form.Group widths='equal'>
                <Form.Input required fluid name='name' label='Nome' placeholder='Nome' value={name} onChange={this.handleChange} />
                <Form.Input fluid name='phone' label='Telefone' placeholder='(xx)xxxxx-xxxx' value={phone} onChange={this.handlePhoneChange} />
                <Form.Select
                  clearable
                  required
                  fluid
                  name='cargo'
                  label='Cargo'
                  value={cargo}
                  onChange={this.handleChange}
                  options={optionsCargo}
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
                onClick={this.handlePutData}
              />
            </Button.Group>
          </Modal.Actions>
        </Modal>

        {/* EDITAR CONTATO */}
        <Modal dimmer={dimmer} open={openEdit} onClose={this.closeEdit}>
          <Modal.Header>Editar Cadastro</Modal.Header>
          <Modal.Content>
            <Form success>
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
                  options={optionsCargo}
                  placeholder='Cargo'
                />
              </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button.Group>
              <Button color='red' onClick={this.closeEdit}>
                Cancelar
            </Button>
              <Button.Or text='ou' />
              <Button
                positive
                icon='checkmark'
                labelPosition='right'
                content="Salvar"
                onClick={this.handleUpdateData}
              />
            </Button.Group>
          </Modal.Actions>
        </Modal>

        {/* DELETAR CONTATO */}
        <Modal size='mini' dimmer={dimmer} open={openDelete} onClose={this.closeDelete}>
          <Modal.Header>Atenção!</Modal.Header>
          <Modal.Content>Deseja deletar o registro?</Modal.Content>
          <Modal.Actions>
            <Button.Group>
              <Button color='red' onClick={this.closeDelete}>
                Não
            </Button>
              <Button.Or text='ou' />
              <Button
                positive
                icon='checkmark'
                labelPosition='right'
                content="Sim"
                onClick={this.handleDeleteData}
              />
            </Button.Group>
          </Modal.Actions>
        </Modal>
        {/* {optionsCargo.map(opt => {opt.text})} */}
        {/* id:{this.state.value}<br />
        response: {submittedName.nome}<br />
        response: {data.map(dat => (dat.nome))} */}


      </div>
    )
  }
}

