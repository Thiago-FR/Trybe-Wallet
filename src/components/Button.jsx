import PropTypes from 'prop-types';
import React from 'react';

class Button extends React.Component {
  render() {
    const { handleAdd, name, className } = this.props;
    return (
      <button
        type="submit"
        onClick={ handleAdd }
        className={ className }
      >
        { name }
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  handleAdd: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Button;
