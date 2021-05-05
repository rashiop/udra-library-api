import config from '../../config';

const errorLanguage = {
  EN: {
    amountRequired: 'Amount must be filled',
    fineNotFound: 'Fine not specified yet'
  }
}

export const error = errorLanguage[config.language]