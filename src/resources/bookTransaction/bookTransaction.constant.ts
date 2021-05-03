import config from '../../config';

const errorLanguage = {
  EN: {
    userRequired: 'User must be filled',
    bookRequired: 'Book must be choosen',
    transactionNotFound: 'Transaction ID not found'
  }
}

export const error = errorLanguage[config.language]