import { SecureStore } from 'expo';

export const saveConnectedUser = (value) => {
  return SecureStore.setItemAsync('user', JSON.stringify(value));
}
export const getConnectedUser = () => {
  return SecureStore.getItemAsync('user')
    .then(value => value && JSON.parse(value));
}
export const deleteConnectedUser = () => {
  return SecureStore.deleteItemAsync('user');
}
