import { Container, Grid } from "@mantine/core";
import SearchBar from "./SearchBar/SearchBar";
import { PackageCard } from "../../components/Package/PackageCard/PackageCard";

const AllPackages = () => {
  const packageInfo = [
    {
      packageName: "Package 1",
      packageDuration: "5 Days",
      flightDetails: "Emirates EK 123",
      country: "Dubai",
      stayDetails: "5 Star Hotel",
      activities: ["Desert Safari", "Burj Khalifa", "Dubai Mall"],
      packagePrice: 500,
      packageId: "1",
      packageImage:
        "https://images.unsplash.com/photo-1489516408517-0c0a15662682",
    },
    {
      packageName: "Package 2",
      packageDuration: "7 Days",
      flightDetails: "Qatar Airways QR 456",
      country: "Maldives",
      stayDetails: "Water Villa",
      activities: ["Snorkeling", "Scuba Diving", "Island Hopping"],
      packagePrice: 800,
      packageId: "2",
      packageImage:
        "https://plus.unsplash.com/premium_photo-1666286163385-abe05f0326c4?q=80&w=2875",
    },
    {
      packageName: "Package 3",
      packageDuration: "10 Days",
      flightDetails: "Singapore Airlines SQ 789",
      country: "Singapore",
      stayDetails: "Marina Bay Sands",
      activities: ["Studios", "Gardens by the Bay", "Sentosa"],
      packagePrice: 1000,
      packageId: "3",
      packageImage:
        "https://plus.unsplash.com/premium_photo-1697730373939-3ebcaa9d295e?q=80&w=2940",
    },
    {
      packageName: "Package 4",
      packageDuration: "14 Days",
      flightDetails: "British Airways BA 101",
      country: "London",
      stayDetails: "The Ritz London",
      activities: ["London Eye", "Buckingham Palace", "Tower of London"],
      packagePrice: 1500,
      packageId: "4",
      packageImage:
        "https://plus.unsplash.com/premium_photo-1671734045770-4b9e1a5e53a0?q=80&w=2874",
    },
  ];
  return (
    <Container size={"xl"}>
      <SearchBar />
      <h1>All Packages</h1>
      <Grid gutter={{ base: "xl" }} p={35}>
        {packageInfo.map((pack) => (
          <Grid.Col span={4}>
            <PackageCard
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
