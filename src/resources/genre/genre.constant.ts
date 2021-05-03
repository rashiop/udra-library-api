import config from '../../config';

const errorLanguage = {
  EN: {
    nameRequired: 'Genre Name must be filled',
    nameMinLength: 'Genre Name must be more than 4 character',
    nameMaxLength: 'Genre Name must be less than 1000 characters',
  }
}

export const initError = () => errorLanguage[config.language]
