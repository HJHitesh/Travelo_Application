import axios from "axios";

type Activity = {
  id: number;
  activityName: string;
  activityDescription: string;
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

export async function getAllPackages(jwtToken: string): Promise<Package[]> {
  try {
    const response = await axios.get("http://localhost:8081/api/packages", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.data;

    const packages = data.map((pkg: Package) => ({
      ...pkg,
      activities: pkg.activities.map((activity: Activity) => ({
        id: activity.id,
        activityName: activity.activityName,
        activityDuration: activity.activityDescription,
      })),
    }));

    return packages;
  } catch (error) {
    return error.response.data.message;
  }
}

export const createPackage = async (pkg: Package, jwtToken: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8081/api/admin/packages",
      {
        packageDuration: pkg.packageDuration,
        packageName: pkg.packageName,
        stayDetails: pkg.stayDetails,
        country: pkg.country,
        flightDetails: pkg.flightDetails,
        packagePrice: pkg.packagePrice,
        packageImage: pkg.packageImage,
        activities: pkg.activities,
        packageId: pkg.packageId,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const updatePackage = async (pkg: Package, jwtToken: string) => {
  console.log(pkg, jwtToken);
  try {
    const response = await axios.put(
      `http://localhost:8081/api/admin/packages/${pkg.packageId}`,
      {
        packageDuration: pkg.packageDuration,
        packageName: pkg.packageName,
        stayDetails: pkg.stayDetails,
        country: pkg.country,
        flightDetails: pkg.flightDetails,
        packagePrice: pkg.packagePrice,
        packageImage: pkg.packageImage,
        activities: pkg.activities,
        packageId: pkg.packageId,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
