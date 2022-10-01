const { program } = require("commander");
const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case "update":
      const updateContact = await contacts.updateContact(id, {
        name,
        email,
        phone,
      });
      console.log(updateContact);
      break;
    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "list" });

// invokeAction({ action: "get", id: "1" });

// invokeAction({
//   action: "add",
//   name: "Mary",
//   email: "86mary@mail.com",
//   phone: "124578963",
// });

// invokeAction({
//   action: "update",
//   id: "11",
//   name: "Mary",
//   email: "86mary@mail.com",
//   phone: "124578963",
// });

// invokeAction({ action: "remove", id: "11" });

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();
invokeAction(options);
