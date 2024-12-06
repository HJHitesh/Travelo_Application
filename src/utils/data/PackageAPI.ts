import axios from "axios";

type Activity = {
  id: number;
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

// Fetch all packages
export const getAllPackages = async (
  jwtToken: string,
  userType: string
): Promise<Package[]> => {
  const url =
    userType === "admin"
      ? "http://localhost:8081/api/admin/packages"
      : "http://localhost:8081/api/packages";

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return data.map((pkg: Package) => ({
      ...pkg,
      activities: pkg.activities.map(
        ({ id, activityName, activityDuration }) => ({
          id,
          activityName,
          activityDuration: activityDuration, // Assuming field meant to be activityDescription
        })
      ),
    }));
  } catch (error: any) {
    console.error(
      "Error fetching packages:",
      error?.response?.data || error.message
    );
    return []; // Return empty array if error occurs
  }
};

// Create a new package
export const createPackage = async (pkg: Package, jwtToken: string) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8081/api/admin/packages",
      { ...pkg }, // Spread operator to send package fields
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    console.error(
      "Error creating package:",
      error?.response?.data || error.message
    );
    return error.response?.data?.message || "Error creating package";
  }
};

// Update an existing package
export const updatePackage = async (pkg: Package, jwtToken: string) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8081/api/admin/packages/${pkg.packageId}`,
      { ...pkg }, // Spread operator to send package fields
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    console.error(
      "Error updating package:",
      error?.response?.data || error.message
    );
    return error.response?.data?.message || "Error updating package";
  }
};

// Delete a package
export const deletePackage = async (packageId: string, jwtToken: string) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:8081/api/admin/packages/${packageId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    console.error(
      "Error deleting package:",
      error?.response?.data || error.message
    );
    return error.response?.data?.message || "Error deleting package";
  }
};
