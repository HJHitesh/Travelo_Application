import { Container, Grid } from "@mantine/core";
import SearchBar from "./SearchBar/SearchBar";
import { PackageCard } from "../../components/Package/PackageCard/PackageCard";
import { getAllPackages } from "../../utils/data/PackageAPI";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

type Activity = {
  id: number;
  activityName: string;
  activityDescription: string; // Added activityDuration for each activity
};

type Package = {
  id: string;
  packageId: string;
  packageDuration: string;
  packageName: string;
  stayDetails: string;
  country: string;
  flightDetails: string;
  packagePrice: string;
  packageImage: string;
  activities: Activity[];
};

const AllPackages = () => {
  const user = useSelector(
    (state: { user: { jwtToken: string; userType: string } }) => state.user
  );

  const [packages, setPackages] = useState<Package[]>([]);

  const navigate = useNavigate();

  // Function to fetch all packages
  const fetchData = useCallback(async () => {
    const packages = await getAllPackages(user.jwtToken, user.userType);
    if (typeof packages === "string") {
      notifications.show({
        title: "Error",
        message: packages,
        icon: <IconX size="1.1rem" />,
        color: "red",
      });
      navigate("/auth");
    } else {
      setPackages(packages);
    }
  }, [user.jwtToken, user.userType, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container size={"xl"}>
      <SearchBar />
      <h1>All Packages</h1>
      <Grid gutter={{ base: "xl" }} p={35}>
        {packages?.map((pack, index) => (
          <Grid.Col key={index} span={4}>
            <PackageCard
              key={pack.packageId}
              id={pack.id}
              packageName={pack.packageName}
              packageDuration={pack.packageDuration}
              flightDetails={pack.flightDetails}
              country={pack.country}
              stayDetails={pack.stayDetails}
              activities={pack.activities}
              packagePrice={pack.packagePrice}
              packageId={pack.packageId}
              packageImage={pack.packageImage}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default AllPackages;
