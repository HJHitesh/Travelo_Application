import { useNavigate } from "react-router-dom";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  Container,
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Select,
  Anchor,
  Stack,
  Notification,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

const AuthenticationForm = () => {
  const navigate = useNavigate();
  // const [value, setValue] = useState(null);
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      isAgent: {
        userType: "",
        pwd: "",
      },
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
      isAgent: (val) =>
        val.userType === "agent"
          ? val.pwd === "t#t#Px*8hfgQPX["
            ? null
            : "Error"
          : null,
    },
  });

  const handleAuth = async (values: {
    email: string;
    password: string;
    name: string;
    isAgent: { userType: string; pwd: string };
  }) => {
    if (type === "register") {
      try {
        <Notification
          icon={<IconCheck size="1.1rem" />}
          withBorder
          radius="md"
          color="green"
          title={`User Registered!`}
        />;
        navigate("/");
      } catch (error) {
        <Notification
          icon={<IconX size="1.1rem" />}
          withBorder
          radius="md"
          color="red"
          title={`${(error as Error).name} \n ${(error as Error).message}`}
        />;
      }
    } else if (type === "login") {
      try {
        <Notification
          icon={<IconCheck size="1.1rem" />}
          withBorder
          radius="md"
          color="green"
          title={`Login Successful!`}
        />;
        navigate("/");
      } catch (error) {
        <Notification
          icon={<IconX size="1.1rem" />}
          withBorder
          radius="md"
          color="red"
          title={`${(error as Error).name} \n ${(error as Error).message}`}
        />;
      }
    }
  };

  return (
    <Container size={"xl"} mt={70}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg">Welcome to Travelo, {type} with</Text>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit((values) => handleAuth(values))}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <>
                <Select
                  required
                  withAsterisk
                  label="Select user type"
                  description="If agent, enter secret key as password"
                  value={form.values.isAgent.userType}
                  onChange={(event) =>
                    form.setFieldValue("isAgent", {
                      userType: event || "",
                      pwd: form.values.password,
                    })
                  }
                  data={[
                    { value: "user", label: "User" },
                    { value: "agent", label: "Agent" },
                  ]}
                  error={form.errors.isAgent && "Secret key doesn't match"}
                />
              </>
            )}
          </Stack>

          <Group mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthenticationForm;
