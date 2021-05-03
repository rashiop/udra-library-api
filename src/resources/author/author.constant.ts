import config from '../../config';

const errorLanguage = {
  EN: {
    nameRequired: 'Author Name must be filled',
    nameMinLength: 'Author Name must be more than 4 character',
    nameMaxLength: 'Author Name must be less than 1000 characters',
  }
}

export const error = errorLanguage[config.language]