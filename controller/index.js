const giftCard = require('./giftCard')

const controller = ({ store, sender }) => {
  const giftYourFriends = async () => {
    const contacts = await store.getData();
    contacts.forEach(contact => {
      const text = giftCard(contact);
      sender.send(text);
    });
  };
  return { giftYourFriends };
};

module.exports = controller;
