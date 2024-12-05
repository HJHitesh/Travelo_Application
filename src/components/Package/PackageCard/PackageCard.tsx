import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Card,
  Text,
  Image,
  Group,
  Badge,
  Button,
  rem,
  Modal,
  Container,
  Table,
} from "@mantine/core";
import {
  IconBeach,
  IconCalendarTime,
  IconPlaneInflight,
  IconBuilding,
  IconCalendar,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import classes from "./PackageCard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { notifications } from "@mantine/notifications";
import { addItemToCart } from "../../../store/slices/cartSlice"; // Ensure the correct path for the import

// Define the types for Activity and CartItem
type Activity = {
  id: number;
  activityName: string;
  activityDescription: string; // Added activityDuration for each activity
};

interface PackageCardProps {
  packageName: string;
  packageDuration: string;
  flightDetails: string;
  country: string;
  stayDetails: string;
  activities: Activity[]; // Updated to Activity[] instead of string[]
  packagePrice: string;
  packageId: string;
  packageImage: string;
}

export const PackageCard = ({
  packageName,
  packageDuration,
  flightDetails,
  country,
  stayDetails,
  activities,
  packagePrice,
  packageId,
  packageImage,
}: PackageCardProps) => {
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const user = useSelector(
    (state: { user: { userType: string } }) => state.user
  );

  interface CartItem {
    packageId: string;
    packageName: string;
    packagePrice: string;
    country: string;
    flightDetails: string;
    stayDetails: string;
    activities: Activity[]; // Change activities to match the new type
    bookDate: string;
    packageDuration: string;
    packageImage: string;
  }

  const cartItems = useSelector(
    (state: { cartDetails: { cartItems: CartItem[] } }) =>
      state.cartDetails.cartItems
  );
  const dispatch = useDispatch();

  const handleDelete = async () => {
    notifications.show({
      title: `Package ${packageId} deleted!`,
      message: "Package has been successfully deleted.",
      icon: <IconCheck size="1.1rem" />,
      color: "green",
    });
  };

  const handleAdd = () => {
    if (!dateValue) {
      notifications.show({
        title: `Select a date`,
        message: "Please select a booking date.",
        icon: <IconX size="1.1rem" />,
        color: "red",
      });
      return;
    }
    const presentIds = cartItems.map((item) => item.packageId);

    if (!presentIds.includes(packageId)) {
      if (user !== null) {
        const cartItem = {
          packageId,
          packageName,
          packagePrice,
          country,
          flightDetails,
          stayDetails,
          activities: activities.map((activity) => activity.activityName),
          packageDuration,
          packageImage,
          bookDate: dateValue.toDateString(),
        };
        dispatch(addItemToCart(cartItem));
        notifications.show({
          title: `Package added to cart`,
          message: "The package has been successfully added.",
          icon: <IconCheck size="1.1rem" />,
          color: "green",
        });
        close();
      } else {
        notifications.show({
          title: `Login to continue`,
          message: "Please login to add packages to your cart.",
          icon: <IconX size="1.1rem" />,
          color: "red",
        });
      }
    } else {
      notifications.show({
        title: `Package already added to cart`,
        message: "This package is already in your cart.",
        icon: <IconX size="1.1rem" />,
        color: "red",
      });
    }
  };

  // Map over activities and render badges for each activity
  const features = activities.map((activity) => (
    <Badge key={activity.id} color="dark">
      {activity.activityName}
    </Badge>
  ));

  return (
    <>
      <Card
        withBorder
        shadow="md"
        radius="md"
        p="md"
        className={classes.card}
        mt={rem(24)}
      >
        <Card.Section>
          <Image src={packageImage} height={180} />
        </Card.Section>
        <Card.Section className={classes.section} mt="md">
          <Group>
            <IconBeach />
            <Text fz="lg" fw={500}>
              {packageName}
            </Text>
            <Badge size="sm">{country}</Badge>
          </Group>
          <Group mt={"xs"}>
            <IconCalendarTime />
            <Text fz="sm">{packageDuration}</Text>
          </Group>
          <Group mt={"xs"}>
            <IconPlaneInflight />
            <Text fz="sm">{flightDetails}</Text>
          </Group>
          <Group mt={"xs"}>
            <IconBuilding />
            <Text fz="sm">{stayDetails}</Text>
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text mt="xs" className={classes.label} c="dimmed">
            Activities
          </Text>
          <Group mt={"md"}>{features}</Group>
        </Card.Section>

        <Group mt="xs">
          <Text fw={"bold"} fz="lg">
            $ {packagePrice}
          </Text>
          {user !== null && user.userType === "Agent" ? (
            <Button
              radius="md"
              color="red"
              style={{ flex: 1 }}
              onClick={handleDelete}
            >
              Delete Package
            </Button>
          ) : (
            <Button radius="md" style={{ flex: 1 }} onClick={open}>
              Select Package
            </Button>
          )}
        </Group>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Select booking date"
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Container>
          <Image src={packageImage} height={180} />
          <Table striped mt={rem(15)}>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  <Text fz="lg" fw={"bold"}>
                    Package Name
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fz="lg" fw={"bold"}>
                    {packageName}
                  </Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Package Duration</Table.Td>
                <Table.Td>{packageDuration}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Flight Details</Table.Td>
                <Table.Td>{flightDetails}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Country</Table.Td>
                <Table.Td>{country}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Stay Details</Table.Td>
                <Table.Td>{stayDetails}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <Text fz="md" fw={500}>
                    Package Price
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fz="md" fw={500}>
                    {packagePrice}
                  </Text>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <DatePickerInput
            clearable
            value={dateValue}
            onChange={setDateValue}
            label="Date input"
            placeholder="Date input"
          />
          <Button radius="md" mt={rem(20)} fullWidth onClick={handleAdd}>
            Add to Cart
          </Button>
        </Container>
      </Modal>
    </>
  );
};
