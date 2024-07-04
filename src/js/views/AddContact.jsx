import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export function AddContact() {
  const { actions } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [redirectToHome, setRedirectToHome] = useState(false);
  const handleCreateContact = (e) => {
    e.preventDefault();
    actions.AddContact(formData);
    setRedirectToHome(true);
  };
  if (redirectToHome) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 bg-grey">
          <form onSubmit={handleCreateContact}>
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
                name="name"
                placeholder="name@example.com"
              ></input>
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
                type="email"
                className="form-control"
                id="email"
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
                type="phone"
                className="form-control"
                id="phone"
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
