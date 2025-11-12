import { useQuery } from "@apollo/client/react";
import { GET_FACILITIES, GET_FACILITY } from "../graphql/queries";
import type {
  FacilitiesInput,
  FacilitiesResponse,
  FacilityInput,
  FacilityResponse,
  FacilityList,
  FacilityListItem,
  Facility,
  Port,
} from "../types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { cacheUtils } from "../utils/cache";

// Utility function to extract unique addresses from ports
const getUniqueAddresses = (ports: Port[]): string => {
  if (!ports || ports.length === 0) return "";

  const addressStrings = ports
    .map((port) => {
      const street = port.address?.streetAddress?.fi || "";
      const city = port.address?.city?.fi || "";
      return street && city ? `${street}, ${city}` : street || city;
    })
    .filter(Boolean); // Remove empty strings

  // Get unique addresses
  const uniqueAddresses = [...new Set(addressStrings)];

  return uniqueAddresses.join(" / ");
};

export const useFacilities = (variables: FacilitiesInput) => {
  const { data, loading, error } = useQuery<{ facilities: FacilitiesResponse }>(
    GET_FACILITIES,
    {
      variables,
    }
  );

  return {
    facilities: data?.facilities,
    loading,
    error,
  };
};

export const useFacility = (variables: FacilityInput) => {
  const { data, loading, error } = useQuery<{
    facilityUtilization: FacilityResponse | FacilityResponse[];
  }>(GET_FACILITY, {
    variables,
  });

  const facilityData = Array.isArray(data?.facilityUtilization)
    ? data.facilityUtilization[0]
    : data?.facilityUtilization;

  return {
    facility: facilityData,
    loading,
    error,
  };
};

export const useFacilityList = (args: FacilitiesInput) => {
  const { facilities, loading: facilitiesLoading } = useFacilities(args);
  const [facilityDetails, setFacilityDetails] = useState<FacilityListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!facilities || facilitiesLoading) return;

    const fetchDetails = async () => {
      const promises = facilities.facilities.map(async (facility: Facility) => {
        // Fetch utilization data
        const utilizationResponse = await fetch(
          new URL("graphql", "https://parking.fintraffic.fi/proxy/graphql/").toString(),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                query facilityUtilization($id: ID!) {
                  facilityUtilization(id: $id) {
                    facilityId
                    capacityType
                    usage
                    timestamp
                    spacesAvailable
                    capacity
                    openNow
                  }
                }
              `,
              variables: { id: facility.id },
            }),
          }
        );

        // Fetch details data
        const detailsResponse = await fetch(
          new URL("graphql", "https://parking.fintraffic.fi/proxy/graphql/").toString(),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                query facilityDetails($id: ID!) {
                  facilityDetails(id: $id) {
                    ports {
                      address {
                        streetAddress {
                          fi
                        }
                        city {
                          fi
                        }
                      }
                    }
                  }
                }
              `,
              variables: { id: facility.id },
            }),
          }
        );

        const utilizationResult = await utilizationResponse.json();
        const detailsResult = await detailsResponse.json();

        const facilityData = utilizationResult.data?.facilityUtilization;
        const facilityDetails = detailsResult.data?.facilityDetails;

        // Extract unique addresses
        const address = facilityDetails?.ports ? getUniqueAddresses(facilityDetails.ports) : "";

        // Handle multiple usage types by creating separate entries
        // Filter to show only PARK_AND_RIDE facilities
        const dataArray = Array.isArray(facilityData) ? facilityData : facilityData ? [facilityData] : [];

        return dataArray
          .filter((data) => data.usage === "PARK_AND_RIDE")
          .map((data) => ({
            id: `${facility.id}-${data.usage}`,
            name: facility.name.fi,
            builtCapacityCar: facility.builtCapacity?.CAR,
            builtCapacityElectricCar: facility.builtCapacity?.ELECTRIC_CAR || 0,
            spacesAvailable: data.spacesAvailable,
            capacity: data.capacity,
            usage: data.usage,
            timestamp: data.timestamp ? dayjs(data.timestamp).format("DD.MM.YYYY HH:mm") : "",
            address,
          }));
      });

      const results = await Promise.all(promises);
      // Flatten array of arrays into single array
      setFacilityDetails(results.flat());
      setLoading(false);
    };

    fetchDetails();
  }, [facilities, facilitiesLoading]);

  return {
    items: facilityDetails,
    loading,
  };
};

const areaConfigs = {
  "001": {
    ids: [1286, 1167, 1233, 992, 1006, 1009, 990, 755, 619],
    listName: "Metro (Länsi)",
  },
  "002": {
    ids: [512, 517, 1091, 1031, 507, 497, 1090],
    listName: "Metro (Itä)",
  },
  "003": {
    ids: [473],
    listName: "Lähijuna (Länsi)",
  },
  "004": {
    ids: [751, 747, 738, 1, 308, 303, 41],
    listName: "Lähijuna (Pohjoinen)",
  },
};

export const useAllFacilityDetails = () => {
  const [lists, setLists] = useState<FacilityList[]>([]);
  const [loading, setLoading] = useState(true);
  const CACHE_KEY = 'all_facility_details';

  useEffect(() => {
    const fetchAllLists = async () => {
      const promises = Object.entries(areaConfigs).map(async ([areaId, config]) => {
        const response = await fetch(
          new URL("graphql", "https://parking.fintraffic.fi/proxy/graphql/").toString(),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                query facilities($statuses: [String], $ids: [ID]) {
                  facilities(statuses: $statuses, ids: $ids) {
                    cursor
                    totalCount
                    hasMore
                    facilities {
                      id
                      name {
                        fi
                      }
                      status
                      type
                      builtCapacity {
                        CAR
                        ELECTRIC_CAR
                      }
                    }
                  }
                }
              `,
              variables: {
                statuses: ["IN_OPERATION"],
                ids: config.ids,
              },
            }),
          }
        );

        const result = await response.json();
        const facilities = result.data?.facilities?.facilities || [];

        const detailPromises = facilities.map(async (facility: Facility) => {
          // Fetch utilization data
          const utilizationResponse = await fetch(
            new URL("graphql", "https://parking.fintraffic.fi/proxy/graphql/").toString(),
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: `
                  query facilityUtilization($id: ID!) {
                    facilityUtilization(id: $id) {
                      facilityId
                      capacityType
                      usage
                      timestamp
                      spacesAvailable
                      capacity
                      openNow
                    }
                  }
                `,
                variables: { id: facility.id },
              }),
            }
          );

          // Fetch details data
          const detailsResponse = await fetch(
            new URL("graphql", "https://parking.fintraffic.fi/proxy/graphql/").toString(),
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: `
                  query facilityDetails($id: ID!) {
                    facilityDetails(id: $id) {
                      ports {
                        address {
                          streetAddress {
                            fi
                          }
                          city {
                            fi
                          }
                        }
                      }
                    }
                  }
                `,
                variables: { id: facility.id },
              }),
            }
          );

          const utilizationResult = await utilizationResponse.json();
          const detailsResult = await detailsResponse.json();

          const facilityData = utilizationResult.data?.facilityUtilization;
          const facilityDetails = detailsResult.data?.facilityDetails;

          // Extract unique addresses
          const address = facilityDetails?.ports ? getUniqueAddresses(facilityDetails.ports) : "";

          // Handle multiple usage types by creating separate entries
          // Filter to show only PARK_AND_RIDE facilities
          const dataArray = Array.isArray(facilityData) ? facilityData : facilityData ? [facilityData] : [];

          return dataArray
            .filter((data) => data.usage === "PARK_AND_RIDE")
            .map((data) => ({
              id: `${facility.id}-${data.usage}`,
              name: facility.name.fi,
              builtCapacityCar: facility.builtCapacity?.CAR,
              builtCapacityElectricCar: facility.builtCapacity?.ELECTRIC_CAR || 0,
              spacesAvailable: data.spacesAvailable,
              capacity: data.capacity,
              usage: data.usage,
              timestamp: data.timestamp ? dayjs(data.timestamp).format("DD.MM.YYYY HH:mm") : "",
              address,
            }));
        });

        const itemsArrays = await Promise.all(detailPromises);
        // Flatten array of arrays into single array
        const items = itemsArrays.flat();

        return {
          listName: config.listName,
          areaId,
          items,
        };
      });

      const results = await Promise.all(promises);
      setLists(results);
      cacheUtils.set(CACHE_KEY, results);
      setLoading(false);
    };

    // Check cache first
    const cachedData = cacheUtils.get<FacilityList[]>(CACHE_KEY);
    if (cachedData) {
      setLists(cachedData);
      setLoading(false);
    } else {
      fetchAllLists();
    }

    // Set up auto-refresh every 1 minute
    const interval = setInterval(() => {
      fetchAllLists();
    }, 60000); // 60000ms = 1 minute

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return {
    lists,
    loading,
  };
};

export const useAreaFacilities = (areaId: string) => {
  const [list, setList] = useState<FacilityList | null>(null);
  const [loading, setLoading] = useState(true);
  const CACHE_KEY = `area_facility_${areaId}`;

  useEffect(() => {
    const config = areaConfigs[areaId as keyof typeof areaConfigs];
    if (!config) {
      setLoading(false);
      return;
    }

    const fetchAreaList = async () => {
      const response = await fetch(
        new URL("graphql", "https://parking.fintraffic.fi/proxy/graphql/").toString(),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query facilities($statuses: [String], $ids: [ID]) {
                facilities(statuses: $statuses, ids: $ids) {
                  cursor
                  totalCount
                  hasMore
                  facilities {
                    id
                    name {
                      fi
                    }
                    status
                    type
                    builtCapacity {
                      CAR
                      ELECTRIC_CAR
                    }
                  }
                }
              }
            `,
            variables: {
              statuses: ["IN_OPERATION"],
              ids: config.ids,
            },
          }),
        }
      );

      const result = await response.json();
      const facilities = result.data?.facilities?.facilities || [];

      const detailPromises = facilities.map(async (facility: Facility) => {
        // Fetch utilization data
        const utilizationResponse = await fetch(
          new URL("graphql", "https://parking.fintraffic.fi/proxy/graphql/").toString(),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                query facilityUtilization($id: ID!) {
                  facilityUtilization(id: $id) {
                    facilityId
                    capacityType
                    usage
                    timestamp
                    spacesAvailable
                    capacity
                    openNow
                  }
                }
              `,
              variables: { id: facility.id },
            }),
          }
        );

        // Fetch details data
        const detailsResponse = await fetch(
          new URL("graphql", "https://parking.fintraffic.fi/proxy/graphql/").toString(),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                query facilityDetails($id: ID!) {
                  facilityDetails(id: $id) {
                    ports {
                      address {
                        streetAddress {
                          fi
                        }
                        city {
                          fi
                        }
                      }
                    }
                  }
                }
              `,
              variables: { id: facility.id },
            }),
          }
        );

        const utilizationResult = await utilizationResponse.json();
        const detailsResult = await detailsResponse.json();

        const facilityData = utilizationResult.data?.facilityUtilization;
        const facilityDetails = detailsResult.data?.facilityDetails;

        // Extract unique addresses
        const address = facilityDetails?.ports ? getUniqueAddresses(facilityDetails.ports) : "";

        // Handle multiple usage types by creating separate entries
        // Filter to show only PARK_AND_RIDE facilities
        const dataArray = Array.isArray(facilityData) ? facilityData : facilityData ? [facilityData] : [];

        return dataArray
          .filter((data) => data.usage === "PARK_AND_RIDE")
          .map((data) => ({
            id: `${facility.id}-${data.usage}`,
            name: facility.name.fi,
            builtCapacityCar: facility.builtCapacity?.CAR,
            builtCapacityElectricCar: facility.builtCapacity?.ELECTRIC_CAR || 0,
            spacesAvailable: data.spacesAvailable,
            capacity: data.capacity,
            usage: data.usage,
            timestamp: data.timestamp ? dayjs(data.timestamp).format("DD.MM.YYYY HH:mm") : "",
            address,
          }));
      });

      const itemsArrays = await Promise.all(detailPromises);
      // Flatten array of arrays into single array
      const items = itemsArrays.flat();

      const newList = {
        listName: config.listName,
        items,
      };

      setList(newList);
      cacheUtils.set(CACHE_KEY, newList);
      setLoading(false);
    };

    // Check cache first
    const cachedData = cacheUtils.get<FacilityList>(CACHE_KEY);
    if (cachedData) {
      setList(cachedData);
      setLoading(false);
    } else {
      fetchAreaList();
    }

    // Set up auto-refresh every 1 minute
    const interval = setInterval(() => {
      fetchAreaList();
    }, 60000); // 60000ms = 1 minute

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [areaId]);

  return {
    list,
    loading,
  };
};
