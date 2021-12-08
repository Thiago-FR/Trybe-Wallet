// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class InputMoedas extends React.Component {
  render() {
    const { handleChange } = this.props;
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="moeda-input">
          Moeda
          <select
            className="label-column tm-1 input-padrao cursor"
            name="currency"
            data-testid="currency-input"
            id="moeda-input"
            onChange={ handleChange }
          >
            {currencies.map((moeda) => (
              <option key={ moeda } value={ moeda } data-testid={ moeda }>{moeda}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

InputMoedas.propTypes = {
  handleChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
};

InputMoedas.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps)(InputMoedas);
