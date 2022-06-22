import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    username: '',
    email: '',
    phone: '',
    pass: '',
    accept: false,
    info: '',

    errors: {
      username: false,
      email: false,
      phone: false,
      pass: false,
      accept: false,
    }
  }

  warnings = {
    username_incorrect: 'Nazwa musi mieć co najmniej 10znaków i nie moze zawierac spacji.',
    email_incorrect: 'Adres email musi zawierac znak @',
    phone_incorrect: 'Number musi liczyc 9 cyfr.',
    password_incorrect: 'Hasło musi miec 8 znaków',
    accept_incorrect: 'Brak potwierdzenia zgody.'
  }

  handleChange = (e)=> {
    const type = e.target.type;
    if(type==='text' || type==='email' || type==='number' || type==='password') {
        this.setState({
          [e.target.name]: e.target.value
        })
    } else {
      this.setState({
        [e.target.name]: e.target.checked
      })
    }
  }

  handleSubmit = (e)=> {
    e.preventDefault();

    const validation = this.formValidation();

    if(validation.correct) {
      this.setState({
        username: '',
        email: '',
        phone: '',
        pass: '',
        accept: false,
        info: 'Formularz został wysłany',

        errors: {
          username: false,
          email: false,
          phone: false,
          pass: false,
          accept: false,
        }
      }) 
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          phone:  !validation.phone,
          pass: !validation.password,
          accept: !validation.accept,
        }
      })
    }
  }

  formValidation = ()=> {
      let username = false;
      let email = false;
      let phone = false;
      let password = false;
      let accept = false;
      let correct = false;

      if(this.state.username.length >= 10 && this.state.username.indexOf(' ') === -1) {
        username = true;
      }
      if(this.state.email.indexOf('@') !== -1) {
        email = true;
      }
      if(this.state.phone.length===9) {
        phone = true;
      }
      if(this.state.pass.length === 8) {
        password = true;
      }
      if(this.state.accept) {
        accept = true;
      }
      if(username && email && phone && password && accept) {
        correct = true;
      }
      return ({correct, username, email, phone, password,accept});
  }

  componentDidUpdate() {
    if(this.state.info !=='') {
      setTimeout(()=> {
        this.setState({
          info: ''
        })
      },3000)
    }
  }

  render() {
    const {username, email, phone, pass, accept} = this.state;
    return (
      <div className='form'>
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="username">
            <input name='username' id='username' type="text" value={username} onChange={this.handleChange} placeholder='nazwa'/>
            {this.state.errors.username && <span>{this.warnings.username_incorrect}</span>}
          </label>
          <label htmlFor="email">
            <input name='email' id='email' type="email" value={email} onChange={this.handleChange} placeholder='email'/>
            {this.state.errors.email && <span>{this.warnings.email_incorrect}</span>}
          </label>
          <label htmlFor="phone">
            <input name='phone' id='phone' type="number" value={phone} onChange={this.handleChange} placeholder='numer'/>
            {this.state.errors.phone && <span>{this.warnings.phone_incorrect}</span>}
          </label>
          <label htmlFor="pass">
            <input name='pass' id='pass' type="password" value={pass} onChange={this.handleChange} placeholder='hasło'/>
            {this.state.errors.pass && <span>{this.warnings.password_incorrect}</span>}
          </label>
          <label htmlFor="accept">
            <input name='accept' id='accept' type="checkbox" checked={accept} onChange={this.handleChange}/>
            {this.state.errors.accept && <span>{this.warnings.accept_incorrect}</span>}
          </label>
          <button>Wyślij</button>
        </form>
        {this.state.info && <h3>{this.state.info}</h3>}
      </div>
    )
  }
}

export default App;
