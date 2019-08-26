const localstate = localStorage.getItem('state');

export const getInitialState = () => {
  return {
    loggedIn: false,
    profile:  null
  }
}

export const initLocalStore = () => {
  if (!localstate) {
    const initialState = JSON.stringify(getInitialState());
    localStorage.setItem('state', initialState);
  }
}

export const getLocalState = () => {
  const parsedData = JSON.parse(localstate);
  return parsedData || getInitialState();
}

export const loadFromLocalStore = key => {
  const state = getLocalState();
  if (!state.hasOwnProperty(key)) return;
  return state[key];
}

export const saveToLocalStore = (key, value) => {
  const state = getLocalState();
  if (!state.hasOwnProperty(key)) return;
  const data = JSON.stringify({...state, [key]: value});
  localStorage.setItem('state', data);
}
