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
