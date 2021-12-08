import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userAction } from '../actions';
import '../css/Login.css';
import logoTrybe from '../img/trybe.png';
import carteira from '../img/carteira.png';
import Button from '../components/Button';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      isPasswordVisible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubimit = this.handleSubimit.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.passwordsVisible = this.passwordsVisible.bind(this);
  }

  // Exemplo de validação de email com Regex utilizado no Stackoverslow
  // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  emailValidation() {
    const { email, senha } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const charLenght = 6;
    if (regex.exec(email) && senha.length >= charLenght) {
      return false;
    }
    return true;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubimit(event) {
    event.preventDefault();
    const { email } = this.state;
    const { history, dispatchState } = this.props;
    dispatchState(email);
    history.push('/carteira');
  }

  passwordsVisible(event) {
    event.preventDefault();
    const { isPasswordVisible } = this.state;
    this.setState({ isPasswordVisible: !isPasswordVisible });
  }

/* eslint-disable */
  render() {
    const { email, senha, isPasswordVisible } = this.state;
    const isBtnDisable = this.emailValidation();
    return (
      <div className="login-container">
        <div className="logo-login-container">
          <img className="logo-login-trybe" src={ logoTrybe } alt="" />
          <img className="carteira-login-trybe" src={ carteira } alt="" />
        </div>
        <form className="form-login" onSubmit={ this.handleSubimit }>
          <label htmlFor="email-id">
            <input
              className="input-login img-login"
              type="text"
              data-testid="email-input"
              name="email"
              value={ email }
              id="email-id"
              onChange={ this.handleChange }
              autoComplete="off"
              placeholder="Email"
            />
          </label>
          <label htmlFor="senha-id">
            <input
              className="input-login img-password input-password"
              type={ isPasswordVisible ? 'text' : 'password'}
              data-testid="password-input"
              name="senha"
              value={ senha }
              id="senha-id"
              onChange={ this.handleChange }
              placeholder="Senha"
            />
            <Button
              className={ `olho-login-${isPasswordVisible}` }
              name="."
              handleAdd={ this.passwordsVisible }
            />
          </label>
          <button
            className="btn-login"
            type="submit"
            disabled={ isBtnDisable }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchState: (value) => dispatch(userAction(value)),
});

Login.propTypes = {
  dispatchState: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
