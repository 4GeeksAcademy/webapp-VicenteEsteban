const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      agenda: "VicenteEsteban",
      contacts: [],
    },
    actions: {
      getContacts: async () => {
        try {
          const agendaName = getStore().agenda;
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${agendaName}/contacts`
          );

          if (response.status == 404) {
            await getActions().createAgenda();
            return getActions().getContacts();
          }
          if (!response.ok) {
            throw "API Error: ${response.statusText}";
          }
          const data = await response.json();
          setStore({ contacts: data.contacts });
        } catch (error) {}
      },

      createAgenda: async () => {
        const agendaName = getStore().agenda;
        try {
          await fetch(
            `https://playground.4geeks.com/contact/agendas/${agendaName}`,
            {
              method: "POST",
            }
          );
          if (response.ok) {
            const newAgenda = await response.json();
            console.log("Agenda agregada correctamente:", newAgenda);
          } else {
            console.error("Error al intentar agregar una agenda");
          }
        } catch (error) {
          console.error(error);
        }
      },

      AddContact: async (contact) => {
        const agendaName = getStore().agenda;
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${agendaName}/contacts`,
            {
              method: "POST",
              body: JSON.stringify({
                ...contact,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setStore({ contacts: [...store.contacts, data] });
            return true;
          }
        } catch (error) {
          return false;
        }
      },

      editUser: async (id, contact) => {
        const agendaName = getStore().agenda;
        const updatedItem = {
          address: contact.address,
          email: contact.email,
          name: contact.name,
          phone: contact.phone,
        };
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify(updatedItem);
        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/${id}`,
            requestOptions
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();

          const store = getStore();
          const updatedContacts = store.contacts.map((contact) =>
            contact.id === id ? result : contact
          );
          setStore({ contacts: updatedContacts });
        } catch (error) {
          console.error("Error updating contact:", error);
        }
      },

      deleteContact: async (id) => {
        const agendaName = getStore().agenda;
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/${id}`,
            {
              method: "DELETE",
            }
          );
          console.log(response);
          if (response.ok) {
            getActions().getContacts();
            setStore((prevState) => {
              return prevState.filter((item, index) => item.id != id);
            });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },
    },
  };
};

export default getState;
