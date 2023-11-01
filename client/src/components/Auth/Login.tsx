import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPassword, IconUser } from "@tabler/icons-react";
import { useLogin } from "hooks/useLogin";

function Login() {
  const { loading, error, handleSubmit } = useLogin();
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

  return (
    <div className="mt-10 flex w-full max-w-3xl flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900">Welcome back!</h1>
      <form
        onSubmit={form.onSubmit(({ email, password }) =>
          handleSubmit(email, password)
        )}
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
