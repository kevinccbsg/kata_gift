const giftCard = require('./giftCard')

const formatDate = dateValue => {
  if (dateValue.includes('29/02')) return `28/02${dateValue.substr(5, dateValue.length)}`;
  return dateValue;
}

const controller = ({ store, sender }) => {
  const giftYourFriends = async () => {
    const contacts = await store.getData();
    contacts.forEach(contact => {
      const text = giftCard(contact);
      const dateOfContact = formatDate(contact.dateOfBirth);
      sender.send(text, { dateOfContact });
    });
  };
  return { giftYourFriends };
};

module.exports = controller;
