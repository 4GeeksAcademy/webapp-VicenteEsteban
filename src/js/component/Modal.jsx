import React from "react";
import PropTypes from "prop-types";

export const Modal = ({ show, onClose, onConfirm, id }) => {
  if (!show) return undefined;
  return (
    <div
      className="modal show d-block"
      style={{ display: "block" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Contact</h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this contact?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onConfirm(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
