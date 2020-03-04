// Describing the shape of the system's slice of state
export interface TokenState {
  isFetch: boolean;
  token: string;
}

// Describing the different ACTION NAMES available
export const UPDATE_TOKEN = 'UPDATE_TOKEN';

interface UpdateTokenAction {
  type: typeof UPDATE_TOKEN;
  payload: TokenState;
}

export type TokenActionTypes = UpdateTokenAction;
