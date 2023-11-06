import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPassword, IconUser } from "@tabler/icons-react";
import { useRegister } from "hooks/useRegister";

function Register() {
  const { loading, error, handleSubmit } = useRegister();

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

  return (
    <div className="flex w-full max-w-3xl flex-col items-center">
      <h1 className="text-4xl font-bold">Sign up now!</h1>
      <form
        onSubmit={form.onSubmit(({ firstName, lastName, email, password }) =>
          handleSubmit(firstName, lastName, email, password)
        )}
        className="mt-4 flex w-full max-w-md flex-col items-center gap-4"
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
          styles={{ label: { color: 'white' } }}
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
          styles={{ label: { color: 'white' } }}
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
          styles={{ label: { color: 'white' } }}
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
          styles={{ label: { color: 'white' } }}
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
          styles={{ label: { color: 'white' } }}
        />
        <Button
          color="indigo"
          loading={loading}
          type="submit"
          fullWidth
          className="mt-1"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
