import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { walletDelete, walletEdit } from '../actions';

class ButtonTable extends React.Component {
  render() {
    const { description, walletDeleted, walletEdited, editor } = this.props;
    return (
      <>
        <button
          className="btn-edit"
          type="submit"
          onClick={ () => walletEdited(editor, description) }
          data-testid="edit-btn"
          disabled={ editor }
        >
          .
        </button>
        <button
          className="btn-delet"
          type="submit"
          onClick={ () => walletDeleted(description) }
          data-testid="delete-btn"
          disabled={ editor }
        >
          .
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

const mapDispatchToProps = (dispatch) => ({
  walletDeleted: (value) => dispatch(walletDelete(value)),
  walletEdited: (editor, description) => dispatch(walletEdit(editor, description)),
});

ButtonTable.propTypes = {
  walletDeleted: PropTypes.func.isRequired,
  walletEdited: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonTable);
