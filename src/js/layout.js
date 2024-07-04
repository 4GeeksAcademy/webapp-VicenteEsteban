import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { ContactList } from "./views/ContactList";
import { Single } from "./views/single";
import { AddContact } from "./views/AddContact";
import { EditContact } from "./views/EditContact";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<ContactList />} />
            {/* <Route exact path="/demo" element={<Demo />} /> */}
            <Route exact path="/AddContact" element={<AddContact />} />
            <Route exact path="/single/:theid" element={<Single />} />
            <Route exact path="/edit/:theid" element={<EditContact />} />
            <Route exact path="*" element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
