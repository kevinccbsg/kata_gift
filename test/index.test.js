const giftCard = require('../controller/giftCard');
const controller = require('../controller');

describe('Gift card', () => {
  it('should render card with an input', () => {
    const input = {
      lastName: 'Jimenez',
      firstName: 'Carlos',
      dateOfBirth: '20/12/2020',
      email: 'test@test.com',
    };
    const result = giftCard(input);
    const expected = `Subject: Happy birthday! \n\nHappy birthday, dear Carlos!`;
    expect(result).toEqual(expected);
  });

  it('should render card with an input', () => {
    const input = {
      lastName: 'Jimenez',
      firstName: 'Carlos test',
      dateOfBirth: '20/12/2020',
      email: 'test@test.com',
    };
    const result = giftCard(input);
    const expected = `Subject: Happy birthday! \n\nHappy birthday, dear Carlos test!`;
    expect(result).toEqual(expected);
  });
});

const store = {
  getData: () => Promise.all([
    {
      lastName: 'Jimenez',
      firstName: 'Carlos test',
      dateOfBirth: '20/12/2020',
      email: 'test@test.com',
    },
  ])
};

const sender = {
  send: jest.fn(),
};

describe('GiftCard controller', () => {
  it('send basic info', () => {
    const { giftYourFriends } = controller({ store, sender });
    giftYourFriends();
    expect(sender.send).toHaveBeenCalledTimes(1);
  });
});
