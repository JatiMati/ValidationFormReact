import React, { Component } from "react";
import './App.css'

class App extends Component {
  state = {
    username: "",
    email: "",
    pass: "",
    accept: false,

    errors: {
      username: false,
      email: false,
      pass: false,
      accept: false,
    },
  }

  messages = {
    username_incorrect: 'Nazwa musi być dłuższa niż 10 znaków i nie może zawierać spacji.',
    email_incorrect: 'Brak @ w emailu.',
    password_incorrect: 'hasło musi mieć 8 znaków.',
    accept_incorrect: 'Potwierdz regulamin.',
  }

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    console.log(type);

    if (type === "text" || type === "email" || type === "password") {
      const value = e.target.value;
      this.setState({
        [name]: value,
      })

    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked
      })
    }

  }

  formValidation = () => {
    //true ok
    //false not ok
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;

    if (this.state.username.length > 10 && this.state.username.indexOf(' ') === -1) {
      username = true
    }
    if (this.state.email.indexOf("@") !== -1) {
      email = true
    }
    if (this.state.pass.length === 8) {
      password = true
    }
    if (this.state.accept) {
      accept = true
    }
    if (username && email && password && accept) {
      correct = true;
    }
    return {
      username,
      email,
      password,
      accept,
      correct,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // console.log('działa');
    const validation = this.formValidation();
    console.log(validation);

    if (validation.correct) {
      this.setState({
        username: "",
        email: "",
        pass: "",
        accept: false,
        mesage: "Formularz został wysłany",

        errors: {
          username: false,
          email: false,
          pass: false,
          accept: false,
        },
      })
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          pass: !validation.password,
          accept: !validation.accept,
        },
      })
    }
  }


  componentDidUpdate() {
    if (this.state.mesage !== "") {
      setTimeout(() => {
        this.setState({
          mesage: "",
        })
      }, 2000);
    }
  }


  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">Twoje imię:
            <input
              type="text"
              id="user"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            {this.state.errors.username && <span>{this.messages.username_incorrect}</span>}
          </label>
          <br />
          <label htmlFor="email">Twój adres email:
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}
          </label>
          <br />
          <label htmlFor="password">Twoje hasło:
            <input
              type="password"
              id="password"
              name="pass"
              value={this.state.pass}
              onChange={this.handleChange}
            />
            {this.state.errors.pass && <span>{this.messages.password_incorrect}</span>}
          </label>
          <br />
          <label htmlFor="accept">
            <input
              type="checkbox"
              id="accept"
              name="accept"
              checked={this.state.accept}
              onChange={this.handleChange}
            /> Potwierdzam regulamin
            {this.state.errors.accept && <span>{this.messages.accept_incorrect}</span>}
          </label>
          <br />
          <button>Zapisz się</button>
        </form>
        {this.state.mesage !== "" && <h1>{this.state.mesage}</h1>}
      </div>
    );
  }
}


export default App;