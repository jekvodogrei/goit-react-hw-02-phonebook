import "./App.css";
import React from "react";
import ContactForm from "../ContactForm";
import ContactList from "../ContactList";
import ContactItem from "../ContactItem";
import Filter from "../Filter";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

class App extends React.Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  formSubmitHandler = (newContact) => {
    const checkedContact = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (!checkedContact) {
      newContact.id = nanoid();

      this.setState((prevState) => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    } else {
      console.log("Contact name matches", newContact.name);
      alert(newContact.name + " already in contacts.");
    }
  };

  deleteContact = (ContactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== ContactId
      ),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;

    const toLowerCaseFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(toLowerCaseFilter)
    );

    return (
      <div className="App">
        <h1 className="headerOptions">Phonebook</h1>
        <ContactForm
          className="ContactForm"
          onSubmit={this.formSubmitHandler}
        />

        <h2 className="headerOptions">Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          className="ContactList"
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        >
          <ContactItem />
        </ContactList>
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.arrayOf(
    PropTypes.shape({
      contacts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
        })
      ),
      filter: PropTypes.string.isRequired,
    })
  ),
};

export default App;
