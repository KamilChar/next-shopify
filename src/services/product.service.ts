import formatTitle from 'title';
import { Merge } from 'type-fest';
import truncate from 'lodash/truncate';
import {
  ShopifyService,
  GetProductListQuery,
  GetProductListQueryVariables,
  GetProductListBeforeQuery,
  GetAllProductsQueryVariables,
  GetProductListBeforeQueryVariables,
  CurrencyCode,
  PaginatedProductListFragment,
  PaginatedProductListBeforeFragment,
} from './shopify.service';

export namespace ProductService {
  export interface Single {
    title: string;
    description: string;
    totalInventory: number;
    seo: {
      title: string;
      description: string;
    };
    images: {
      id: string;
      src: string;
      alt: string;
    }[];
    variants: {
      id: string;
      title: string;
      image: string;
      price: {
        amount: number;
        currencyCode: CurrencyCode;
      };
    }[];
  }

  export async function getSingle(handle: string): Promise<Single> {
    const { productByHandle } = await ShopifyService.getProductSingle({ handle });
    const { title, description, seo, images, variants, totalInventory } = productByHandle!;

    const product: Single = {
      title: formatTitle(title),
      description,
      totalInventory,
      seo: {
        title: formatTitle(seo.title || title),
        description: seo.description || truncate(description, { length: 256 }),
      },
      images: images.edges.map(({ node }) => {
        return {
          id: node.id as string,
          src: node.transformedSrc,
          alt: node.altText || '',
        };
      }),
      variants: variants.edges.map(({ node }) => {
        const variant: Single['variants'][0] = {
          id: node.id,
          title: node.title,
          image: node.image?.id!,
          price: {
            amount: Number(node.priceV2.amount),
            currencyCode: node.priceV2.currencyCode,
          },
        };

        return variant;
      }),
    };

    return product;
  }

  export interface ListItem {
    id: string;
    url: string;
    title: string;
    totalInventory: number;
    description: string;
    image: {
      src: string;
      alt: string;
    };
    price: {
      amount: number;
      currencyCode: CurrencyCode;
    };
  }

  export interface AllList {
    products: ListItem[];
  }

  export interface List {
    products: Merge<ListItem, { cursor: string }>[];
    pageInfo: GetProductListQuery['products']['pageInfo'];
  }

  export interface ListBefore {
    products: Merge<ListItem, { cursor: string }>[];
    pageInfo: GetProductListBeforeQuery['products']['pageInfo'];
  }

  export function getListFromPaginatedProductPage(fragment: PaginatedProductListFragment): List {
    const { edges, pageInfo } = fragment;
    const products: List['products'] = edges.map(({ node, cursor }) => {
      return {
        id: node.id,
        cursor: cursor,
        totalInventory: node.totalInventory,
        url: `/products/${node.handle}`,
        title: formatTitle(node.title),
        description: node.description,
        image: {
          src: node.images.edges[0].node.transformedSrc,
          alt: node.images.edges[0].node.altText || '',
        },
        price: {
          amount: Number(node.priceRange.minVariantPrice.amount),
          currencyCode: node.priceRange.minVariantPrice.currencyCode,
        },
      };
    });

    return { products, pageInfo };
  }

  export function getListBeforeFromPaginatedProductPage(fragment: PaginatedProductListBeforeFragment): ListBefore {
    const { edges, pageInfo } = fragment;

    const products: ListBefore['products'] = edges.map(({ node, cursor }) => {
      return {
        id: node.id,
        cursor: cursor,
        totalInventory: node.totalInventory,
        url: `/products/${node.handle}`,
        title: formatTitle(node.title),
        description: node.description,
        image: {
          src: node.images.edges[0].node.transformedSrc,
          alt: node.images.edges[0].node.altText || '',
        },
        price: {
          amount: Number(node.priceRange.minVariantPrice.amount),
          currencyCode: node.priceRange.minVariantPrice.currencyCode,
        },
      };
    });

    return { products, pageInfo };
  }

  export async function getList(variables?: GetProductListQueryVariables): Promise<List> {
    const { products } = await ShopifyService.getProductList(variables);
    return getListFromPaginatedProductPage(products);
  }

  export async function getListBefore(variables?: GetProductListBeforeQueryVariables): Promise<ListBefore> {
    const { products } = await ShopifyService.getProductListBefore(variables);
    return getListBeforeFromPaginatedProductPage(products);
  }

  export async function getAllProduct(variables?: GetAllProductsQueryVariables): Promise<AllList> {
    const { products } = await ShopifyService.getAllProducts(variables);
    const productList: AllList['products'] = products.edges.map(({ node }) => {
      return {
        id: node.id,
        totalInventory: node.totalInventory,
        url: `/products/${node.handle}`,
        title: formatTitle(node.title),
        description: node.description,
        image: {
          src: node.images.edges[0].node.transformedSrc,
          alt: node.images.edges[0].node.altText || '',
        },
        price: {
          amount: Number(node.priceRange.minVariantPrice.amount),
          currencyCode: node.priceRange.minVariantPrice.currencyCode,
        },
      };
    });

    return { products: productList };
  }
}
