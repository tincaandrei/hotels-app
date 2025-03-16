import axios from "axios";

const createConnectAccount = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default createConnectAccount;
