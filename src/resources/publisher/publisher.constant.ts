import config from '../../config';

const errorLanguage = {
  EN: {
    nameRequired: 'Publisher Name must be filled',
    nameMinLength: 'Publisher Name must be more than 4 character',
    nameMaxLength: 'Publisher Name must be less than 1000 characters',
  }
}

export const error = errorLanguage[config.language]