import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Card,
  Text,
  Image,
  Group,
  Badge,
  Button,
  Notification,
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
import { DateInput } from "@mantine/dates";
import classes from "./PackageCard.module.css";

interface PackageCardProps {
  packageName: string;
  packageDuration: string;
  flightDetails: string;
  country: string;
  stayDetails: string;
  activities: string[];
  packagePrice: number;
  packageId: string;
  packageImage: string;
}

export function PackageCard({
  packageName,
  packageDuration,
  flightDetails,
  country,
  stayDetails,
  activities,
  packagePrice,
  packageId,
  packageImage,
}: PackageCardProps) {
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const user = {
    userType: "user",
  };

  const handleDelete = async () => {
    <Notification
      icon={<IconCheck size="1.1rem" />}
      withBorder
      radius="md"
      color="green"
      title={`Package ${packageId} deleted!`}
    />;
  };

  const handleAdd = () => {
    <Notification
      icon={<IconX size="1.1rem" />}
      withBorder
      radius="md"
      color="red"
      title={`Package already added to cart`}
    />;
  };

  const features = activities.map((activity) => (
    <Badge color="dark" key={activity}>
      {activity}
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
            <tbody>
              <tr>
                <td>
                  <Text fz="lg" fw={"bold"}>
                    Package Name
                  </Text>
                </td>
                <td>
                  <Text fz="lg" fw={"bold"}>
                    {packageName}
                  </Text>
                </td>
              </tr>
              <tr>
                <td>Package Duration</td>
                <td>{packageDuration}</td>
              </tr>
              <tr>
                <td>Flight Details</td>
                <td>{flightDetails}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{country}</td>
              </tr>
              <tr>
                <td>Stay Details</td>
                <td>{stayDetails}</td>
              </tr>
              <tr>
                <td>
                  <Text fz="md" fw={500}>
                    Package Price
                  </Text>
                </td>
                <td>
                  <Text fz="md" fw={500}>
                    {packagePrice}
                  </Text>
                </td>
              </tr>
            </tbody>
          </Table>
          <DateInput
            allowDeselect
            value={dateValue}
            label="Select your date"
            placeholder="Date input"
            onChange={setDateValue}
            leftSection={<IconCalendar />}
            maw={400}
            mx="auto"
            mt={rem(25)}
          />
          <Button radius="md" mt={rem(20)} fullWidth onClick={handleAdd}>
            Add to Cart
          </Button>
        </Container>
      </Modal>
    </>
  );
}
