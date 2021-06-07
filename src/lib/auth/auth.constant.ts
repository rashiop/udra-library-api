import config from '../../config';

const errorLanguage = {
  EN: {
    incompleteData: 'Incomplete Data'
  }
}
export const error = errorLanguage[config.language]

export const signupUrl = '/signup'