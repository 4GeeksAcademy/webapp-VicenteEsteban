import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = (props) => {
  const { store } = useContext(Context);
  const params = useParams();
  return (
    <div className="jumbotron">
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
            <img
              className="col"
              src="https://shorturl.at/sHTxg"
              alt="Imagen Generada"
              width="125px"
            ></img>
          </div>
          <div className="col">
            <ul>
              <li className="list-group align-items-start">
                <p className="fs-5">{store.contacts[params.theid].name}</p>
                <p>
                  <i className="fa-solid fa-location-dot "></i>
                  {store.contacts[params.theid].address}
                </p>
                <p>
                  <i className="fa-solid fa-phone "></i>
                  {store.contacts[params.theid].phone}
                </p>
                <p>
                  <i className="fa-regular fa-envelope"></i>
                  {store.contacts[params.theid].email}
                </p>
              </li>
            </ul>
          </div>
          {/* <div className="col">
            <i className="fa-regular fa-pen-to-square"></i>
            <i className="fa-solid fa-delete-left fa-rotate-180"></i>
          </div> */}
        </div>
      </div>
      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
