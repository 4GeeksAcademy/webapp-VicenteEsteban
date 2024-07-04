import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export function EditContact() {
  const params = useParams();
  const { store, actions } = useContext(Context);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  useEffect(() => {
    if (store.contacts.length === 0) {
      actions.getContacts();
    }
  }, [actions, store.contacts.length]);

  useEffect(() => {
    const contact = store.contacts.find(
      (contact) => contact.id == params.theid
    );
    if (contact) {
      setFormData({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
      });
    }
  }, [store.contacts, params.theid]);

  const [redirectToHome, setRedirectToHome] = useState(false);

  const updatedContacts = async (e) => {
    e.preventDefault();
    try {
      await actions.editUser(params.theid, formData);
      setRedirectToHome(true);
    } catch (error) {
      console.error("Error editing contact:", error);
    }
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 bg-grey">
          <form onSubmit={updatedContacts}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                onChange={(e) => {
                  setFormData((prevState) => {
                    return { ...prevState, name: e.target.value };
                  });
                }}
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                name="name"
                placeholder="name@example.com"
              >
                {/* {store.contacts[params.theid].name} */}
              </input>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => {
                  setFormData((prevState) => {
                    return { ...prevState, email: e.target.value };
                  });
                }}
                type="text"
                className="form-control"
                id="email"
                value={formData.email}
                name="email"
                placeholder="Email"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                onChange={(e) => {
                  setFormData((prevState) => {
                    return { ...prevState, phone: e.target.value };
                  });
                }}
                type="text"
                className="form-control"
                id="phone"
                value={formData.phone}
                name="phone"
                placeholder="phone"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                onChange={(e) => {
                  setFormData((prevState) => {
                    return { ...prevState, address: e.target.value };
                  });
                }}
                type="text"
                className="form-control"
                id="address"
                value={formData.address}
                name="address"
                placeholder="address"
              ></input>
            </div>

            <button type="submit" className="btn btn-primary col-12">
              Submit
            </button>
          </form>
          <div className="mt-4">
            <Link to="/">
              <button className="btn btn-primary">Back home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
