export interface IfacilityInput {
    id: number | string;
    after?: number;
    at?: string;
}

export interface IfacilityResponse {
    capacityType: string;
    usage: string;
    timestamp: string;
    spacesAvailable?: number;
    facilityId?: number | string;
    hubId?: number | string;
}

export interface IfacilitiesInput extends IFacilityListName {
    after?: string;
    pageSize?: number;
    sortBy?: string;
    sortDir?: string;
    statuses?: Array<string>;
    ids?: Array<number | string>;
    geometry?: string;
    maxDistance?: number;
}

export interface IfacilitiesResponse {
    cursor?: string;
    totalCount?: number;
    hasMore: boolean;
    facilities: Array<IFacility>;
}

export interface IFacility {
    id: number | string;
    name: ILocalizedObject
    status?: string;
    landings?: number;
    type?: string;
    reuse_count?: number;
    operatorId: number | string;
    builtCapacity?: ICapacity;
    authenticationMethods?: Array<string>;
    usages: Array<string>;
    location: ILocation;
    deletedAt?: string;
    softDeletedAt?: string;
    surveyOptions?: Array<string>;
}

export interface ILocalizedObject {
    fi: string
    sv?: string
    en?: string
}

export interface ICapacity {
    CAR?: number;
    ELECTRIC_CAR?: number;
    BICYCLE_SECURE_SPACE?: number;
    DISABLED?: number;
    MOTORCYCLE?: number;
    BICYCLE?: number;
}

export interface ILocation {
    crs: ICrs;
    bbox: Array<number>;
    type: string;
    coordinates: Array<Array<Array<number>>>;
}

export interface ICrs {
    type: string;
    properties: ICrsName;
}

export interface ICrsName {
    name: string;
}

export interface IFacilityListName {
    listName?: string;
}
export interface IfacilityList extends IFacilityListName { 
    items: Array<IfacilityListItem>;
}
export interface IfacilityListItem {
    id: number | string;
    name: string;
    builtCapacityCar?: number;
    builtCapacityElectricCar?: number;
    spacesAvailable?: number;
    timeStamp?: string;
}