export const API_ACTIONS = {
  GET_WORD: 'GET_WORD',
  PUT_WORD: 'PUT_WORD',
}

export const PREFIXES = {
  WORD: '/word',
}

export const API_ENDPOINTS = {
  WORD: {
    SEARCH: '/search/',
  }
};

export const SUBMIT_ACTIONS = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
}

export type SubmitAction = typeof SUBMIT_ACTIONS[keyof typeof SUBMIT_ACTIONS];