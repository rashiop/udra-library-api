import config from '../../config';

const errorLanguage = {
  EN: {
    firstNameRequired: 'Firstname must be filled',
    firstNameMaxLength: 'Firstname must be less than 1000 characters',
    lastNameRequired: 'Lastname must be filled',
    lastNameMaxLength: 'Lastname must be less than 1000 characters',
    idRequired: 'Author ID must be choosen'
  }
}
export const error = errorLanguage[config.language]

export const authorUrl = '/author'