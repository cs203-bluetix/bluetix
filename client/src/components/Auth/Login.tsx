import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPassword, IconUser } from "@tabler/icons-react";
import axios, { AxiosResponse } from "axios";
import { env } from "env.mjs";
import { useState } from "react";
import { useAuthStore } from "store/auth";
import { Role } from "store/types";
import { SERVER_API_LOGIN_URL, SERVER_API_URL } from "utils/globals";

function Login() {
  const { loginUser } = useAuthStore();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 7
          ? null
          : "Passwords must be at least 8 characters long",
    },
  });
  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(
        SERVER_API_LOGIN_URL,
        {
          email: form.values.email,
          password: form.values.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp: AxiosResponse) => {
        if (resp.status === 200) {
          // to change based on response payload
          loginUser({
            email: resp.data.token,
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
  return (
    <div className="mt-10 flex w-full max-w-3xl flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900">Welcome back!</h1>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="mt-4 flex w-full max-w-md flex-col items-center gap-4"
      >
        {error && (
          <div className="w-full">
            <span className="text-red-500">Invalid email or password!</span>
          </div>
        )}
        <TextInput
          size="md"
          radius="md"
          label="Email"
          labelProps={{ className: "mb-1" }}
          className="w-full"
          icon={<IconUser size={"16"} />}
          placeholder="Email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          size="md"
          radius="md"
          label="Password"
          labelProps={{ className: "mb-1" }}
          className="w-full"
          icon={<IconPassword size={"16"} />}
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <Button
          color="indigo"
          loading={loading}
          type="submit"
          fullWidth
          className="mt-1"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
