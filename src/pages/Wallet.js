import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import InputDespesas from '../components/InputDespesas';
import TabelaDespesas from '../components/TabelaDespesas';

class Wallet extends React.Component {
  render() {
    const { login, history } = this.props;
    return (
      <div>
        {
          login !== '' ? (
            <>
              <Header />
              <InputDespesas />
              <TabelaDespesas />
            </>
          ) : (
            history.push('404')
          )
        }
      </div>
    );
  }
}

Wallet.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
