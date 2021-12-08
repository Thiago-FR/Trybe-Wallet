import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../css/Header.css';
import logoTrybe from '../img/trybe.png';
import { walletCurrenciesGlobal } from '../actions';

class Header extends React.Component {
  constructor() {
    super();

    this.totalSum = this.totalSum.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  // Formula da equação matématica consulta na PR do colega Pedro Guarize
  // PR https://github.com/tryber/sd-015-a-project-trybewallet/pull/6

  totalSum() {
    const { expenses } = this.props;
    const result = expenses.reduce((acc,
      { value, exchangeRates, currency }) => {
      if (value !== '' && currency !== '') {
        return acc + (value * exchangeRates[currency].ask);
      }
      return 0;
    }, 0);
    return result.toFixed(2);
  }

  handleChange({ target }) {
    const { CurrenciesGlobal } = this.props;
    const { value } = target;
    if (value !== '') CurrenciesGlobal(value);
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <header className="header-container">
        <div>
          <img className="img-logo" src={ logoTrybe } alt="logo trybe" />
        </div>
        <div className="header-div-data">
          <div className="header-email">
            <p className="logado">Logado</p>
            <p data-testid="email-field"><strong>{email}</strong></p>
          </div>
          <div className="header-value">
            <p><strong>Valor Total:</strong></p>
            <p data-testid="total-field"><strong>{ this.totalSum() }</strong></p>
            <p data-testid="header-currency-field"><strong>BRL</strong></p>
          </div>
          <div className="select-moeda">
            <p>Moeda</p>
            <select
              className=""
              onChange={ this.handleChange }
            >
              <option value=""> </option>
              {currencies.map((moeda) => (
                <option key={ moeda } value={ moeda }>{moeda}</option>
              ))}
            </select>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  CurrenciesGlobal: (value) => dispatch(walletCurrenciesGlobal(value)),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
  currencies: PropTypes.arrayOf(PropTypes.string),
  CurrenciesGlobal: PropTypes.func.isRequired,
};

Header.defaultProps = {
  expenses: [],
  currencies: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
