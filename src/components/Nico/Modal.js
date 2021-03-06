import React from "react";
import * as PropTypes from 'prop-types';

const styles = {
  modal: {
    position: 'fixed',
    zIndex: 1,
    paddingTop: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgb(0,0,0)',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  'modal-content': {
    position: 'relative',
    backgroundColor: '#fefefe',
    margin: 'auto',
    padding: 20,
    border: '1px solid #888',
    width: 'min-content',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
    borderRadius: 10
  },
  esc: {
    float: 'right',
    backgroundColor: '#efc2ff',
    padding: '1px 3px 1px 3px',
    cursor: 'pointer'
  }
}

const Modal = ({ content, close }) => {

  return (
    <div style={styles.modal}>
      <div style={styles["modal-content"]}>
        <button onClick={close} style={styles.esc}>✖︎</button>
        {content}
      </div>
    </div>
  )
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  content: PropTypes.element.isRequired
}

export default Modal;