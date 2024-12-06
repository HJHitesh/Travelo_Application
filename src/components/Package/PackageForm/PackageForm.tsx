import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPackage,
  getAllPackages,
  updatePackage,
} from "../../../utils/data/PackageAPI";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import { IconPlus, IconX as IconRemove } from "@tabler/icons-react";

type Activity = {
  activityName: string;
  activityDuration: string;
};

type Package = {
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

interface PackageFormProps {
  type: "Create" | "Modify";
}

const PackageForm = ({ type }: PackageFormProps) => {
  const navigate = useNavigate();
  const { packageId } = useParams();
  const user = useSelector(
    (state: { user: { jwtToken: string; userType: string } }) => state.user
  );

  const [allPackages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, [navigate, user.jwtToken, user.userType]);

  const packIds = allPackages.map((pack) => pack.packageId);

  // Define the form
  const form = useForm<Package>({
    initialValues: {
      packageId: "", // Ensure it's an empty string instead of undefined
      packageName: "",
      packageDuration: "",
      packageImage: "",
      flightDetails: "",
      country: "",
      stayDetails: "",
      activities: [], // Ensure this is an empty array, not undefined
      packagePrice: "",
    },
    validate: {
      packageId: (val) =>
        type === "Create" && packIds.includes(val)
          ? "Package id must be unique"
          : null,
      packagePrice: (val) =>
        !val || isNaN(parseFloat(val)) ? "Invalid price" : null,
    },
  });

  useEffect(() => {
    if (type === "Modify" && packageId) {
      const selectedPackage = allPackages.find(
        (pack) => pack.packageId === packageId
      );
      if (
        selectedPackage &&
        selectedPackage.packageId !== form.values.packageId
      ) {
        form.setValues(selectedPackage); // Only update if the data has changed
      }
    }
  }, [packageId, allPackages, type, form]);

  const handlePackageForm = async (packDetails: Package) => {
    if (type === "Create") {
      await createPackage(packDetails, user.jwtToken);
      notifications.show({
        title: "Package Created!",
        message: "The package has been successfully created.",
        icon: <IconX size="1.1rem" />,
        color: "green",
      });
      navigate("/all-packages");
    } else if (type === "Modify") {
      await updatePackage(packDetails, user.jwtToken);
      notifications.show({
        title: "Package Modified!",
        message: "The package has been successfully modified.",
        icon: <IconX size="1.1rem" />,
        color: "green",
      });
      navigate("/all-packages");
    }
  };

  const addActivity = () => {
    form.setFieldValue("activities", [
      ...form.values.activities,
      { activityName: "", activityDuration: "" },
    ]);
  };

  const removeActivity = (index: number) => {
    const updatedActivities = form.values.activities.filter(
      (_, i) => i !== index
    );
    form.setFieldValue("activities", updatedActivities);
  };

  const handleActivityChange = (
    value: string,
    index: number,
    field: "activityName" | "activityDuration"
  ) => {
    const updatedActivities = [...form.values.activities];
    updatedActivities[index] = {
      ...updatedActivities[index],
      [field]: value,
    };
    form.setFieldValue("activities", updatedActivities);
  };

  return (
    <Container size={450} my={40}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="xl" fw={500}>
          {type} Package
        </Text>
        <Text mt={20} size="lg" fw={600}>
          {type === "Create"
            ? "Create a new package"
            : "Modify an existing package"}
        </Text>
        <form
          onSubmit={form.onSubmit((values) => {
            handlePackageForm(values as Package);
          })}
        >
          <Stack mt={10}>
            <TextInput
              label="Package Id"
              placeholder="Enter the package id"
              value={form.values.packageId}
              onChange={(event) =>
                form.setFieldValue("packageId", event.currentTarget.value)
              }
              radius="md"
              error={form.errors.packageId}
              required
            />
            <TextInput
              label="Package Name"
              placeholder="Enter the package name"
              value={form.values.packageName}
              onChange={(event) =>
                form.setFieldValue("packageName", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Package Duration"
              placeholder="Enter the package duration"
              value={form.values.packageDuration}
              onChange={(event) =>
                form.setFieldValue("packageDuration", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Package Image"
              placeholder="Enter the package image URL"
              value={form.values.packageImage}
              onChange={(event) =>
                form.setFieldValue("packageImage", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Flight Details"
              placeholder="Enter the flight details"
              value={form.values.flightDetails}
              onChange={(event) =>
                form.setFieldValue("flightDetails", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Country"
              placeholder="Enter the country name"
              value={form.values.country}
              onChange={(event) =>
                form.setFieldValue("country", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Stay Details"
              placeholder="Enter the stay details"
              value={form.values.stayDetails}
              onChange={(event) =>
                form.setFieldValue("stayDetails", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <div>
              <Text size="sm" fw={500}>
                Activities
              </Text>
              {form.values.activities.map((activity, index) => (
                <Group key={index} mt={10}>
                  <TextInput
                    label="Activity Name"
                    placeholder="Enter activity name"
                    value={activity.activityName}
                    onChange={(e) =>
                      handleActivityChange(
                        e.currentTarget.value,
                        index,
                        "activityName"
                      )
                    }
                    radius="md"
                    required
                  />
                  <TextInput
                    label="Activity Duration"
                    placeholder="Enter activity duration"
                    value={activity.activityDuration}
                    onChange={(e) =>
                      handleActivityChange(
                        e.currentTarget.value,
                        index,
                        "activityDuration"
                      )
                    }
                    radius="md"
                    required
                  />
                  <ActionIcon
                    color="red"
                    onClick={() => removeActivity(index)}
                    mt={10}
                  >
                    <IconRemove size={18} />
                  </ActionIcon>
                </Group>
              ))}
              <Button
                variant="outline"
                color="blue"
                leftSection={<IconPlus />}
                mt={10}
                onClick={addActivity}
              >
                Add Activity
              </Button>
            </div>
            <TextInput
              label="Price"
              placeholder="Enter the package price"
              value={form.values.packagePrice}
              onChange={(event) =>
                form.setFieldValue("packagePrice", event.currentTarget.value)
              }
              radius="md"
              required
            />
          </Stack>

          <Group mt="xl">
            <Button type="submit" radius="xl">
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default PackageForm;
