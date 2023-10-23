import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-90ldPrMN33grZ8O6O6Ni_l4UWX7-dbE",
  authDomain: "virtual-store-b1be3.firebaseapp.com",
  projectId: "virtual-store-b1be3",
  storageBucket: "virtual-store-b1be3.appspot.com",
  messagingSenderId: "651169787742",
  appId: "1:651169787742:web:b56cc302b7a027f4a769cf",
  measurementId: "G-MHNNZF79YP",
};

initializeApp(firebaseConfig);

const API = "http://localhost:4000";

const getHeaders = () => {
  const TOKEN = window.sessionStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
};

export const get = async (endpoint) => {
  const HEADER = getHeaders();
  const url = `${API}${endpoint}`;
  return await axios.get(url, HEADER).then((response) => {
    return response;
  });
};

export const post = async (endpoint, data) => {
  const HEADER = getHeaders();
  const url = `${API}${endpoint}`;
  return await axios.post(url, data, HEADER).then((response) => {
    return response;
  });
};

export const put = async (endpoint, data) => {
  const HEADER = getHeaders();
  const url = `${API}${endpoint}`;
  return await axios.put(url, data, HEADER).then((response) => {
    return response;
  });
};

export const deleteSomething = async (endpoint, id) => {
  const HEADER = getHeaders();
  const url = `${API}${endpoint}/${id}`;
  return await axios.delete(url, HEADER).then((response) => {
    return response;
  });
};

export const signIn = async (email, _pass) => {
  const auth = getAuth();
  return await signInWithEmailAndPassword(auth, email, _pass).then(
    (userCredential) => {
      const token = userCredential.user.accessToken;
      const url = `${API}/user/email/${email}`;
      const response = axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((userData) => {
          window.sessionStorage.setItem("token", token);
          if (userData.data === "") {
            throw new Error();
          }
          return {
            ...userData,
            token: token,
          };
        });
      return response;
    }
  );
};

export const signUp = async (data, isFromDataMng) => {
  const auth = getAuth();
  const { email, password } = data;

  if (data.role === undefined) {
    data["role"] = "customer";
  }

  return await createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const token = userCredential.user.accessToken;
      const url = `${API}/user`;
      const response = axios
        .post(
          url,
          {
            ...data,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((userData) => {
          if (!isFromDataMng) {
            window.sessionStorage.setItem("token", token);
          }
          return {
            ...userData,
            token: token,
          };
        });
      return response;
    }
  );
};
