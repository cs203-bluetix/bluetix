import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUser, IconPassword } from "@tabler/icons-react";
import axios, { AxiosResponse } from "axios";
import { env } from "env.mjs";
import React, { useState } from "react";
import { useAuthStore } from "store/auth";
import { Role } from "store/types";

function Register() {
  const { loginUser } = useAuthStore();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      firstName: (value) =>
        value.length > 0 ? null : "Please enter a first name",
      lastName: (value) =>
        value.length > 0 ? null : "Please enter a last name",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 7
          ? null
          : "Passwords must be at least 8 characters long",
      confirmPassword: (val, formVal) =>
        val === formVal.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    const endpoint = `${env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup/customer`;
    const body = {
      firstName: form.values.firstName,
      lastName: form.values.lastName,
      email: form.values.email,
      password: form.values.password,
    };
    await axios
      .post(endpoint, body)
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
  return (
    <div className="flex w-full max-w-3xl flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="mt-8 flex w-full max-w-md flex-col items-center gap-4"
      >
        {error && (
          <div className="w-full">
            <span className="text-red-500">Email is taken!</span>
          </div>
        )}
        <TextInput
          size="md"
          radius="md"
          label="First Name"
          labelProps={{ className: "mb-1" }}
          className="w-full"
          icon={<IconUser size={"16"} />}
          placeholder="First Name"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          size="md"
          radius="md"
          label="Last Name"
          labelProps={{ className: "mb-1" }}
          className="w-full"
          icon={<IconUser size={"16"} />}
          placeholder="Last Name"
          {...form.getInputProps("lastName")}
        />
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
        <PasswordInput
          size="md"
          radius="md"
          label="Confirm Password"
          labelProps={{ className: "mb-1" }}
          className="w-full"
          icon={<IconPassword size={"16"} />}
          placeholder="Confirm Password"
          {...form.getInputProps("confirmPassword")}
        />
        <Button loading={loading} type="submit" fullWidth className="mt-1">
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
