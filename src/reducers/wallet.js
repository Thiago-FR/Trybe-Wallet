// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_ACTION, SUCCESS, DELETE,
  EDIT_REQUEST, EDIT_CAMP, CONFIRM_EDIT, CURRENCIES_GLOBAL } from '../actions';

const INITIAL_STATE = {
  idToEdit: '',
  editor: false,
  currencies: [],
  expenses: [],
};
/* eslint-disable */ 
const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case SUCCESS:
    return {
      ...state,
      rates: action.payload,
      currencies: [...Object.keys(action.payload).filter((moeda) => moeda !== 'USDT')],
    };
  case DELETE:
    return {
      ...state,
      expenses: [...state.expenses.filter((dispesas) => {
        if (dispesas.description !== action.payload) {
          // dispesas.id = index !== 0 ? index - 1 : 0;
          // Obs: Necessario adicionar o parametro index
          // e alterar dispesas.description para dispesas.id
          return dispesas;
        }
        return null;
      })],
    };
  case EDIT_REQUEST:
    return {
      ...state,
      editor: !action.payload,
      idToEdit: action.description,
      getEditValues: !action.payload,
    };
  case EDIT_CAMP:
    return {
      ...state,
      getEditValues: false,
    };
  case CONFIRM_EDIT:
    return {
      ...state,
      expenses: [...state.expenses.map((despesas) => {
        if (despesas.id === action.payload.id) return action.payload;
        return despesas;
      })],
      editor: !action.editor,
    };
  case CURRENCIES_GLOBAL:
    return {
      ...state,
      expenses: [...state.expenses.map((despesas) => {
        if (despesas.currency !== action.payload) { 
          despesas.currency = action.payload; 
          return despesas; 
        }
        return despesas;
      })],
    };
  default: return state;
  }
};

export default wallet;
