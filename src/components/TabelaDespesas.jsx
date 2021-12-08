import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ButtonTable from './ButtonTable';
import '../css/TabelaDespesas.css';

class TabelaDespesas extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="table-container">
        <thead>
          <tr className="table-head-tr">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody className="table-tbody">
          {expenses
            .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
              <tr className="table-head-td" key={ `${description}-${id}` }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{exchangeRates[currency].name.split('/')[0]}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{Number(value * exchangeRates[currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <ButtonTable description={ description } />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TabelaDespesas.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
};

TabelaDespesas.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps)(TabelaDespesas);
