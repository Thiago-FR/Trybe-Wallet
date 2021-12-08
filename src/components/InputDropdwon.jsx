// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import React from 'react';

class InputDropdwon extends React.Component {
  render() {
    const { handleChange, method, tag } = this.props;
    return (
      <>
        <label htmlFor="pagamento-input">
          Pagamento
          <select
            className="label-column tm-4 input-padrao cursor"
            name="method"
            data-testid="method-input"
            id="pagamento-input"
            onChange={ handleChange }
            value={ method }
          >
            <option value=""> </option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria-input">
          Tag
          <select
            className="label-column tm-3 input-padrao cursor"
            name="tag"
            data-testid="tag-input"
            id="categoria-input"
            onChange={ handleChange }
            value={ tag }
          >
            <option value=""> </option>
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>
        </label>
      </>
    );
  }
}

InputDropdwon.propTypes = {
  handleChange: PropTypes.func.isRequired,
  method: PropTypes.string,
  tag: PropTypes.string,
};

InputDropdwon.defaultProps = {
  method: '',
  tag: '',
};

export default InputDropdwon;
