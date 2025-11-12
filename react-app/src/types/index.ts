export interface FacilityInput {
  id: number | string;
}

export interface FacilityResponse {
  facilityId: number | string;
  capacityType: string;
  usage: string;
  timestamp?: string;
  spacesAvailable?: number;
  capacity?: number;
  openNow?: boolean;
}

export interface FacilitiesInput extends FacilityListName {
  after?: string;
  pageSize?: number;
  sortBy?: string;
  sortDir?: string;
  statuses?: Array<string>;
  ids?: Array<number | string>;
  geometry?: string;
  maxDistance?: number;
}

export interface FacilitiesResponse {
  cursor?: string;
  totalCount?: number;
  hasMore: boolean;
  facilities: Array<Facility>;
}

export interface Facility {
  id: number | string;
  name: LocalizedObject;
  status?: string;
  landings?: number;
  type?: string;
  reuse_count?: number;
  operatorId: number | string;
  builtCapacity?: Capacity;
  authenticationMethods?: Array<string>;
  usages: Array<string>;
  location: Location;
  deletedAt?: string;
  softDeletedAt?: string;
  surveyOptions?: Array<string>;
}

export interface LocalizedObject {
  fi: string;
  sv?: string;
  en?: string;
}

export interface Capacity {
  CAR?: number;
  ELECTRIC_CAR?: number;
  BICYCLE_SECURE_SPACE?: number;
  DISABLED?: number;
  MOTORCYCLE?: number;
  BICYCLE?: number;
}

export interface Location {
  crs: Crs;
  bbox: Array<number>;
  type: string;
  coordinates: Array<Array<Array<number>>>;
}

export interface Crs {
  type: string;
  properties: CrsName;
}

export interface CrsName {
  name: string;
}

export interface FacilityListName {
  listName?: string;
  areaId?: string;
}

export interface FacilityList extends FacilityListName {
  items: Array<FacilityListItem>;
}

export interface FacilityListItem {
  id: number | string;
  name: string;
  builtCapacityCar?: number;
  builtCapacityElectricCar?: number;
  spacesAvailable?: number;
  capacity?: number;
  usage?: string;
  timestamp?: string;
  address?: string;
}

export interface Address {
  streetAddress: LocalizedObject;
  city: LocalizedObject;
}

export interface Port {
  address: Address;
}

export interface FacilityDetailsResponse {
  ports: Port[];
}
