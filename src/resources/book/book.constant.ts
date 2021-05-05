import config from '../../config';

const errorLanguage = {
  EN: {
    authorRequired: 'Author must be filled',
    genreRequired: 'Genre must be filled',
    publisherRequired: 'Publisher must be filled',
    titleRequired: 'Title must be filled',
    titleMinLength: 'Title must be more than 1 character length',
    titleMaxLength: 'Title must be less than 1000 characters length',
    descriptionMinLength: 'Description must be filled',
    descriptionMaxLength: 'Description must not more than 1000 characters',
    transactionNotFound: 'Transaction ID not found',
  }
}
export const error = errorLanguage[config.language]

export const bookUrl = '/book';