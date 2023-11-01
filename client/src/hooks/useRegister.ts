import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAuthStore } from "store/auth";
import { Role } from "store/types";
import { SERVER_API_REGISTER_URL } from "utils/globals";

export const useRegister = () => {
  const { loginUser } = useAuthStore();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    await axios
      .post(SERVER_API_REGISTER_URL, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then((resp: AxiosResponse) => {
        if (resp.status === 200) {
          // add zod validation
          loginUser({
            email: resp.data.email,
            isCreator: resp.data.role === "CREATOR",
            role: resp.data.role === "CREATOR" ? Role.ADMIN : Role.USER,
            firstName: resp.data.firstName,
            lastName: resp.data.lastName,
          });
        } else {
          setError(true);
        }
      })
      .catch((e: AxiosResponse) => {
        setError(true);
      });
    setLoading(false);
  };
  return { loading, setLoading, error, setError, handleSubmit };
};
