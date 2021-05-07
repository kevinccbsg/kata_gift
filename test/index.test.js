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
  getData: () => Promise.resolve([
    {
      lastName: 'Jimenez',
      firstName: 'Carlos test',
      dateOfBirth: '20/12/2020',
      email: 'test@test.com',
    },
    {
      lastName: 'Jimenez',
      firstName: 'Carlos test',
      dateOfBirth: '29/02/2020',
      email: 'test@test.com',
    },
  ])
};

describe('GiftCard controller', () => {
  let sender;
  beforeEach(() => {
    sender = {
      send: jest.fn(),
    };
  });
  it('send basic info', async () => {
    const { giftYourFriends } = controller({ store, sender });
    await giftYourFriends();
    expect(sender.send).toHaveBeenCalledTimes(2);
  });

  it('validate dateOfContact', async () => {
    const { giftYourFriends } = controller({ store, sender });
    await giftYourFriends();
    const message = `Subject: Happy birthday! \n\nHappy birthday, dear Carlos test!`
    const options = { dateOfContact: '28/02/2020' };
    expect(sender.send).toHaveBeenCalledTimes(2);
    expect(sender.send).toHaveBeenLastCalledWith(message, options);
  });
});

