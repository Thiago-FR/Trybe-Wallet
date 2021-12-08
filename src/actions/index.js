// Coloque aqui suas actions
import fetchAPI from '../services/fetchApi';

export const USER_LOGIN = 'USER_LOGIN';
export const WALLET_ACTION = 'WALLET_ACTION';
export const SUCCESS = 'SUCCESS';
export const DELETE = 'DELETE';
export const EDIT_REQUEST = 'EDIT_REQUEST';
export const EDIT_CAMP = 'EDIT_CAMP';
export const CONFIRM_EDIT = 'CONFIRM_EDIT';
export const CURRENCIES_GLOBAL = 'CURRENCIES_GLOBAL';

export const userAction = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const walletAction = (payload) => ({
  type: WALLET_ACTION,
  payload,
});

export const walletSuccess = (payload) => (
  { type: SUCCESS, payload }
);

export const walletDelete = (payload) => (
  { type: DELETE, payload }
);

export const walletEdit = (payload, description) => (
  { type: EDIT_REQUEST, payload, description }
);

export const walletEditCamp = (payload) => (
  { type: EDIT_CAMP, payload }
);

export const walletConfirmEditCamp = (payload, editor) => (
  { type: CONFIRM_EDIT, payload, editor }
);

export const walletCurrenciesGlobal = (payload) => (
  { type: CURRENCIES_GLOBAL, payload }
);

export const thunkWallet = () => (dispatch) => fetchAPI()
  .then((data) => dispatch(walletSuccess(data)));
