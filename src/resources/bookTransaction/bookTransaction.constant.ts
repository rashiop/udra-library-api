import config from '../../config';

const errorLanguage = {
  EN: {
    userRequired: 'User must be filled',
    bookRequired: 'Book must be choosen',
    transactionNotFound: 'transaction ID not found, you might have returned it before'
  }
}

export const error = errorLanguage[config.language]