import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  useMantineTheme,
  MantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCards,
  IconPlus,
  IconPencil,
  IconChevronDown,
  IconLogout,
} from "@tabler/icons-react";
import classes from "./NavigationBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import CartIcon from "../Cart/CartIcon/CartIcon";

const adminData = [
  {
    icon: IconCards,
    title: "All Packages",
    description: "View and Delete Packages",
    to: "/all-packages",
  },
  {
    icon: IconPlus,
    title: "Add Package",
    description: "Create a new Travel Package",
    to: "/create-package",
  },
  {
    icon: IconPencil,
    title: "Modify Package",
    description: "Modify an existing Travel Package",
    to: "/modify-package",
  },
];

const userData = [
  {
    icon: IconCards,
    title: "All Packages",
    description: "View and Delete Packages",
    to: "/all-packages",
  },
];

interface NavigationLink {
  icon: React.ElementType;
  title: string;
  description: string;
  to: string;
}

const NavigationLinks = ({
  data,
  theme,
}: {
  data: NavigationLink[];
  theme: MantineTheme;
}) => (
  <div>
    {data.map((item) => (
      <Link to={item.to} key={item.title}>
        <UnstyledButton className={classes.subLink} p="md">
          <Group wrap="nowrap" align="flex-start">
            <ThemeIcon size={34} variant="default" radius="md">
              <item.icon size={22} color={theme.colors.blue[6]} />
            </ThemeIcon>
            <div>
              <Text size="sm" fw={500} c="white">
                {item.title}
              </Text>
              <Text size="xs" c="dimmed">
                {item.description}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Link>
    ))}
  </div>
);

const NavigationBar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const user = useSelector(
    (state: { user: { username: string; userType: string } }) => state.user
  );
  const links = user?.userType === "admin" ? adminData : userData;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* Logo section */}
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Packages
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Packages</Text>
                </Group>
                <Divider my="sm" />
                <SimpleGrid cols={2} spacing={20}>
                  {user?.userType === "admin" ? (
                    <NavigationLinks data={adminData} theme={theme} />
                  ) : (
                    <NavigationLinks data={userData} theme={theme} />
                  )}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          {/* Authentication and Cart Section */}
          <Group visibleFrom="sm">
            {user.username !== null ? (
              <Group>
                {user.userType === "user" ? <CartIcon /> : <></>}
                <Button
                  variant="default"
                  onClick={handleLogout}
                  leftSection={<IconLogout />}
                >
                  Log out
                </Button>
              </Group>
            ) : (
              <Button variant="default" onClick={() => navigate("/auth")}>
                Log in/Register
              </Button>
            )}
          </Group>

          {/* Burger menu for mobile view */}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      {/* Drawer for mobile view */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <a href="/" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>
            <NavigationLinks data={links} theme={theme} />
          </Collapse>

          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            {user.username ? (
              <Button
                variant="default"
                onClick={handleLogout}
                leftSection={<IconLogout />}
              >
                Log out
              </Button>
            ) : (
              <Button variant="default" onClick={() => navigate("/auth")}>
                Log in/Register
              </Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default NavigationBar;
