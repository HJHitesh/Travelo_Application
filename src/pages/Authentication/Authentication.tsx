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
  Anchor,
  Stack,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { createUser, loginUser } from "../../utils/data/UserAPI";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/slices/userSlice";
import { notifications } from "@mantine/notifications"; // Import Mantine Notification hook

const AuthenticationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      uname: "",
      name: "",
      password: "",
    },

    validate: {
      uname: (val) => (val.length < 3 ? "Invalid username" : null),
      password: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
  });

  const handleAuth = async (values: {
    uname: string;
    password: string;
    name: string;
  }) => {
    if (type === "register") {
      try {
        await createUser({
          uname: values.uname,
          password: values.password,
        });

        // Show success notification
        notifications.show({
          title: `User ${values.uname} created successfully!`,
          message: "You can now log in.",
          icon: <IconCheck size="1.1rem" />,
          color: "green",
        });
        navigate("/auth"); // Redirect to login after registration
      } catch (error) {
        // Show error notification
        notifications.show({
          title: "Registration Failed",
          message: `${(error as Error).name}: ${(error as Error).message}`,
          icon: <IconX size="1.1rem" />,
          color: "red",
        });
      }
    } else if (type === "login") {
      try {
        const res = await loginUser({
          uname: values.uname,
          password: values.password,
        });

        // Assuming userType is returned in the response
        const userType = values.uname == "admin_user" ? "admin" : "user"; // Use "user" as fallback if userType is undefined

        console.log(res.data.token);
        // Dispatch action to set user info
        dispatch(
          setCurrentUser({
            username: values.uname,
            jwtToken: res.data.token,
            userType: userType, // Dynamically set userType from response
          })
        );

        // Show success notification
        notifications.show({
          title: "Login Successful",
          message: `Welcome back, ${values.uname}!`,
          icon: <IconCheck size="1.1rem" />,
          color: "green",
        });

        navigate("/"); // Redirect to the homepage after successful login
      } catch (error) {
        // Show error notification
        notifications.show({
          title: "Login Failed",
          message: `${(error as Error).name}: ${(error as Error).message}`,
          icon: <IconX size="1.1rem" />,
          color: "red",
        });
      }
    }
  };

  return (
    <Container size={"xl"} mt={70}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" mb="xl">
          Welcome to Travelo
        </Text>

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
              label="Username"
              placeholder="Your Username"
              value={form.values.uname}
              onChange={(event) =>
                form.setFieldValue("uname", event.currentTarget.value)
              }
              error={form.errors.uname && "Invalid username"}
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
