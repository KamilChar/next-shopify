import { GetLocationsQueryVariables, ShopifyService } from '@app/services/shopify.service';

export namespace LocationsService {
  export interface Address {
    address1: string | null;
    city: string | null;
    country: string | null;
    countryCode: string | null;
    zip: string | null;
  }

  export interface Location {
    id: string;
    name: string;
    address: Address;
  }

  export interface AllLocations {
    locations: Location[];
  }

  export async function getAllLocations(variables?: GetLocationsQueryVariables): Promise<AllLocations> {
    const { locations } = await ShopifyService.getLocations(variables);
    console.log(locations);

    const locationsList: Location[] = locations.nodes.map(({ id, name, address }) => ({
      id,
      name,
      address: {
        address1: address.address1 ?? null,
        city: address.city ?? null,
        country: address.country ?? null,
        countryCode: address.countryCode ?? null,
        zip: address.zip ?? null,
      },
    }));

    return { locations: locationsList };
  }
}
