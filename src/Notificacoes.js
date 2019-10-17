import React, { Component } from 'react';
import { store } from 'react-notifications-component';


export default class Notificacoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isWarning: false,
      isSuccess: false,
    };
  }

  componentDidMount() {
    console.log(this.props.type)
    switch (this.props.type) {
      case 'erro':
        this.setState({ isError: true });
        break;
      case 'alerta':
        this.setState({ isWarning: true });
        break;
      case 'sucesso':
        this.setState({ isSuccess: true, });
        break;
      default:
        return     
    }
  }

  warning = () => {
    store.addNotification({
      title: "Atenção!",
      message: this.props.msg,
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
      }
    });
  }

  error = () => {
    store.addNotification({
      title: "Erro!",
      message: this.props.msg,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
      }
    });
  }

  success = () => {
    store.addNotification({
      title: "Sucesso!",
      message: this.props.msg,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
      }
    });
  }

  render() {
    const { isError, isWarning, isSuccess } = this.state
    return (
        

      <div>
        
      { isError ? this.error : null }
      { isWarning ? this.warning : null }
      { !isSuccess ? this.success : null }
      </div>
    );
  }
}