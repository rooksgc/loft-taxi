export const getInitialState = () => {
  return {
    loggedIn: false,
    profile:  null
  }
}

export const initLocalStore = () => {
  const localstate = localStorage.getItem('state');
  if (!localstate) {
    const initialState = JSON.stringify(getInitialState());
    localStorage.setItem('state', initialState);
  }
}

export const getLocalState = () => {
  const localstate = localStorage.getItem('state');
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
