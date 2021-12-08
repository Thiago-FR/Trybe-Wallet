// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import InputDropdwon from './InputDropdwon';
import InputMoedas from './InputMoedas';
import Button from './Button';
import { walletAction, thunkWallet,
  walletEditCamp, walletConfirmEditCamp } from '../actions';
import '../css/Form.css';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: '',
  tag: '',
};

const btnAdd = 'Adicionar despesa';
const btnEdit = 'Editar despesa';

class InputDespesas extends React.Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.checkReduxState = this.checkReduxState.bind(this);
  }

  componentDidMount() {
    const { dispatchThunk } = this.props;
    dispatchThunk();
  }

  componentDidUpdate() {
    const { getEditValues } = this.props;
    if (getEditValues) this.checkReduxState();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleAdd(event) {
    event.preventDefault();
    const { dispatchState, dispatchThunk, expenses } = this.props;
    const rates = await dispatchThunk();
    dispatchState({ id: expenses.length, ...this.state, exchangeRates: rates.payload });
    this.setState(INITIAL_STATE);
  }

  handleEdit(event) {
    event.preventDefault();
    const { walletConfirmCamp, editor } = this.props;
    walletConfirmCamp(this.state, editor);
    this.setState(INITIAL_STATE);
  }

  checkReduxState() {
    const { expenses, idToEdit, walletEditCampAction } = this.props;
    walletEditCampAction();
    this.setState(expenses.filter((dispesa) => {
      if (dispesa.description === idToEdit) {
        return dispesa;
      }
      return null;
    })[0]);
  }

  render() {
    const { value, description, method, tag } = this.state;
    const { editor } = this.props;
    return (
      <form className="form-container">
        <label className="label-column left" htmlFor="valor-input">
          Valor
          <input
            className="tm-1 input-padrao"
            type="text"
            data-testid="value-input"
            id="valor-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            autoComplete="off"
          />
        </label>
        <label className="label-column" htmlFor="descricao-input">
          Descrição
          <input
            className="tm-3 input-padrao"
            type="text"
            data-testid="description-input"
            id="descricao-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            autoComplete="off"
          />
        </label>
        <InputMoedas
          handleChange={ this.handleChange }
        />
        <InputDropdwon
          handleChange={ this.handleChange }
          method={ method }
          tag={ tag }
        />
        { !editor ? (
          <Button handleAdd={ this.handleAdd } name={ btnAdd } className="btn-form" />
        ) : (
          <Button handleAdd={ this.handleEdit } name={ btnEdit } className="btn-form" />
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  getEditValues: state.wallet.getEditValues,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchState: (value) => dispatch(walletAction(value)),
  dispatchThunk: () => dispatch(thunkWallet()),
  walletEditCampAction: (value) => dispatch(walletEditCamp(value)),
  walletConfirmCamp: (value, editor) => dispatch(walletConfirmEditCamp(value, editor)),
});

InputDespesas.propTypes = {
  dispatchState: PropTypes.func.isRequired,
  dispatchThunk: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.string.isRequired,
  getEditValues: PropTypes.bool,
  walletEditCampAction: PropTypes.func.isRequired,
  walletConfirmCamp: PropTypes.func.isRequired,
};

InputDespesas.defaultProps = {
  expenses: [],
  getEditValues: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputDespesas);
