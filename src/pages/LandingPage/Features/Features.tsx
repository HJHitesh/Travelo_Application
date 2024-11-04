import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconMapPins,
  IconStack2,
  IconHeart,
  IconArrowGuide,
  IconCreditCard,
  IconHeadset,
} from "@tabler/icons-react";
import classes from "./Features.module.css";

const mockdata = [
  {
    icon: IconMapPins,
    title: "Explore Exciting Destinations",
    description:
      "Discover captivating destinations for unforgettable journeys and lasting memories.",
  },
  {
    icon: IconStack2,
    title: "Customizable Tour Packages",
    description:
      "Tailor your travel experience to your preferences with flexible options.",
  },
  {
    icon: IconHeart,
    title: "Hassle-Free Travel Planning",
    description:
      "Let us handle logistics, transportation, and itinerary management.",
  },
  {
    icon: IconArrowGuide,
    title: "Expert Tour Guides",
    description:
      "Knowledgeable guides ensure a seamless travel experience and local insights.",
  },
  {
    icon: IconCreditCard,
    title: "Easy Booking and Payment Options",
    description:
      "User-friendly website with secure booking and payment methods.",
  },
  {
    icon: IconHeadset,
    title: "24/7 Customer Support",
    description:
      "Dedicated support team available to assist with queries and requests.",
  },
];

export function Features() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl" pt={70}>
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Travel Package Management
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Unlock the Essence of Travel
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        At our travel company, we believe that travel is more than just visiting
        new places; its about unlocking the essence of each destination. Immerse
        yourself in local cultures, savor authentic flavors, and create
        connections that will last a lifetime.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
