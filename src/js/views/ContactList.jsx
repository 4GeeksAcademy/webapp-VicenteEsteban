import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const ContactList = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [contactIdToDelete, setContactIdToDelete] = useState(false);

  const handleDelete = (id) => {
    actions.deleteContact(id);
  };

  const showModalConfirmation = (id) => {
    setContactIdToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setContactIdToDelete(null);
  };

  const confirmDelete = () => {
    handleDelete(contactIdToDelete);
    closeModal();
  };

  useEffect(() => {
    actions.getContacts();
  }, []);

  return (
    <div className="container">
      <ul className="list-group">
        {store.contacts.map((item, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}
            >
              <div className="container text-center">
                <div className="row align-items-start">
                  <div className="col">
                    <Link to={"/single/" + index}>
                      <img
                        className="col rounded-5"
                        src="https://shorturl.at/sHTxg"
                        alt="Imagen Generada"
                        width="125px"
                      ></img>
                    </Link>
                  </div>
                  <div className="col">
                    <ul>
                      <li className="list-group align-items-start">
                        <p className="fs-5"></p>
                        {item.name}
                        <p>
                          <i className="fa-solid fa-location-dot "></i>
                          {item.address}
                        </p>
                        <p>
                          <i className="fa-solid fa-phone "></i>
                          {item.phone}
                        </p>
                        <p>
                          <i className="fa-regular fa-envelope"></i>
                          {item.email}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <Link to={`/edit/${item.id}`}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </Link>

                    <button
                      className="btn"
                      onClick={() => showModalConfirmation(item.id)}
                      // onClick={() => actions.deleteContact(item.id)}
                    >
                      <i className="fa-solid fa-delete-left fa-rotate-180"></i>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <br />

      {showModal && contactIdToDelete !== null && (
        <Modal
          show={showModal}
          onClose={closeModal}
          onConfirm={confirmDelete}
          id={contactIdToDelete}
        />
      )}
    </div>
  );
};
// };
