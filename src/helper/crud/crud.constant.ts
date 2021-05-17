import config from '../../config';

const errorLanguage = {
  EN: {
    idRequired: 'No ID provided',
  }
}

const successLanguage = {
  EN: {
    create: 'Create success',
    update: 'Update success',
    delete: 'Delete success',
    fetch: 'Fetch success',
  }
}

export const error = errorLanguage[config.language]
export const success = successLanguage[config.language]