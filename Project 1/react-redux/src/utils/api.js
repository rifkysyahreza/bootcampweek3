import axios from "axios";
import { useState, useEffect } from "react";

const instance = axios.create({
  baseURL: "http://104.248.154.192:3006/",
  timeout: 1000,
  headers: { authorization: localStorage.getItem("Bearer") },
});

export async function login(formLogin) {
  let isSuccess = await axios
    .post("http://104.248.154.192:3006/login", formLogin, {
      headers: {},
    })
    .then((response) => {
      let { data } = response.data;
      let bearerToken = data.token;
      localStorage.setItem("Bearer", bearerToken);
      window.location.reload(true);
      return { status: true, message: "Sukses login bos" };
    })
    .catch((error) => {
      if (error.response.status === 404) {
        return { status: false, message: "Register dulu bos" };
      }
    });

  console.log("fungsi post login");
  return { isSuccess };
}

export async function register(formRegister) {
  let isSuccess = await axios
    .post("http://104.248.154.192:3006/register", formRegister, {
      headers: {},
    })
    .then((response) => {
      let { data } = response;
      console.log(data.message);
      return { status: true };
    })
    .catch((error) => {
      console.log(`Gagal Register: ${error}`);
      return { status: false };
    });

  return { isSuccess };
}

export const useGetProfile = () => {
  const endPoint = "users";
  return instance
    .get(endPoint)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(`Gagal Fetch: ${error}`);
    });
};

export const useGetPost = () => {
  const endPoint = "post";
  const [post, setPost] = useState([]);

  useEffect(() => {
    instance
      .get(endPoint)
      .then((response) => {
        let { data } = response.data;
        setPost(data);
      })
      .catch((error) => {
        console.log(`Gagal Fetch Post: ${error}`);
      });
  }, []);
  // console.log(post);
  return { post };
};

export const useGetCategory = () => {
  const endPoint = "category";
  const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    instance
      .get(endPoint)
      .then((response) => {
        let { data } = response.data;
        setDataCategory(data);
      })
      .catch((error) => {
        console.log(`Gagal Fetch Category: ${error}`);
      });
  }, []);

  // console.log(dataCategory);
  return { dataCategory };
};

export async function createPost(formCreatePost) {
  const endPoint = "post/create";
  let isSuccess = await instance
    .post(endPoint, formCreatePost)
    .then((response) => {
      console.log(response);
      return { status: true };
    })
    .catch((error) => {
      console.log(`Gagal Create: ${error}`);
      return { status: false };
    });

  return { isSuccess };
}
