import { Container, Title, Text, Button } from "@mantine/core";
import classes from "./HeroHeader.module.css";

const HeroHeader = () => {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "orange", to: "red" }}
              >
                fully featured
              </Text>{" "}
              Travel Booking System
            </Title>

            <Text className={classes.description} mt={30}>
              Embark on Extraordinary Adventures with{" "}
              <Text
                component="span"
                inherit
                c="white"
                style={{ fontWeight: "bold" }}
              >
                Travelo
              </Text>{" "}
              <br /> Discover, Customize, and Explore the World Like Never
              Before!
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Discover Now
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroHeader;
