import Http from './Http';

const getToken = () => localStorage.getItem('token');
const isLoggedIn = () => getToken() !== null;

const connect = async (username, password) => {
  console.log("cred", username);
  const credentials = {
    username,
    password
  };
  const response = await Http.getAxiosClient().post(`${Http.baseApi}/login_check`, credentials);
  localStorage.setItem('token', response.data.token)
}

const Auth = {
  getToken,
  connect,
  isLoggedIn
};

export default Auth;
