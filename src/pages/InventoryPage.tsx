import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { H1, H2 } from '../components/atoms/Headers';
import { Card } from '../components/molecules/Card';
import { Input } from '../components/atoms/Input';

import { Product } from '../types/api/products';
import { fetchProducts } from '../services/products';
import { Loader } from '../components/atoms/Loader';
import HorizontalLine from '../components/atoms/HorizontalLine';
import { Pagination } from '../components/molecules/Pagination';

const Container = styled.div`
  padding: 10px;
`;

const SearchSection = styled.div`
  margin-left: 1rem;
`;

const ProductSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(250px, 1fr));
  padding: 10px;
}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 5px 0;
`;

const Select = styled.select``;

const Option = styled.option``;

interface InventoryPageProps {}

export const InventoryPage: FC<InventoryPageProps> = () => {
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [inventory, setInventory] = useState<Product[]>([]);

  // Pagination
  const [page, setPage] = useState<number>(0);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [numberOfProducts, setNumberOfProducts] = useState<number>(15);

  // Filters
  const [productSearch, setProductSearch] = useState<string>('');
  const [productType, setProductType] = useState<Product['type']>('');

  // Fetch products on mount
  useEffect(() => {
    setIsLoadingProducts(true);
    (async () => {
      const productData = await fetchProducts();
      setInventory(productData);
    })();
    setIsLoadingProducts(false);
  }, []);

  // Used to show filtered products
  let filteredProducts = inventory;

  const handleProductSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductSearch(e.target.value);
  };

  // Filter products based on search
  if (productSearch.length) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase())
    );
  }

  // Filter products based on type
  if (productType) {
    filteredProducts =
      productType === 'ALL'
        ? filteredProducts
        : filteredProducts.filter((product) => product.type === productType);
  }

  // Pagination
  useEffect(() => {
    const validProducts = filteredProducts.length
      ? filteredProducts
      : inventory;

    setNumberOfPages(Math.ceil(validProducts.length / numberOfProducts));
  }, [filteredProducts, inventory, inventory.length, numberOfProducts]);

  const handlePageChange = (e: number) => setPage(e);

  const renderProducts = useCallback(() => {
    let validProducts = filteredProducts.length ? filteredProducts : inventory;

    validProducts = validProducts.sort((a, b) => (a.name > b.name ? 1 : -1));

    if (!validProducts.length) return 'No products found based on search';

    const chunkedProducts = _.chunk(validProducts, numberOfProducts);

    return chunkedProducts[page].map((product, ix) => (
      <Card
        key={ix}
        name={product.name}
        cyTag={`product-card-${ix}`}
        price={product.price}
        type={product.type}
        image={product.image}
        storeName={product.storeName}
        brandName={product.brandName}
      />
    ));
  }, [filteredProducts, inventory, numberOfProducts, page]);

  const validTypes = inventory.length
    ? ['ALL', ...new Set(inventory.map((product) => product?.type))]
    : [];

  return (
    <Container>
      <H1>Inventory</H1>
      <HorizontalLine />
      <H2>Products</H2>
      <Loader isLoading={isLoadingProducts}>
        {inventory.length ? (
          <>
            <SearchSection>
              <Form>
                <Label htmlFor="type">
                  Product Type:
                  <Select
                    style={{ marginLeft: '10px' }}
                    name="type"
                    data-cy="product-type"
                    value={productType}
                    onChange={(e) =>
                      setProductType(e.target.value as Product['type'])
                    }
                  >
                    {validTypes.map((applicableProductType, ix) => (
                      <Option key={ix} value={applicableProductType}>
                        {applicableProductType}
                      </Option>
                    ))}
                  </Select>
                </Label>
                <Label htmlFor="search">
                  Search:
                  <Input
                    style={{ marginLeft: '10px' }}
                    name="search"
                    data-cy="input-search"
                    placeholder="Search for a product"
                    type="text"
                    value={productSearch}
                    onChange={handleProductSearchChange}
                  />
                </Label>
                <Label htmlFor="page">
                  Items per Page:
                  <Select
                    style={{ marginLeft: '10px' }}
                    name="itemsPerPage"
                    data-cy="items-per-page"
                    value={numberOfProducts}
                    onChange={(e) => setNumberOfProducts(+e.target.value)}
                  >
                    {[15, 20, 25, 30].map((number, ix) => (
                      <Option key={`${number}-${ix}`} value={number}>
                        {number}
                      </Option>
                    ))}
                  </Select>
                </Label>
              </Form>
            </SearchSection>
            <ProductSection data-cy="products-section">
              {renderProducts()}
            </ProductSection>
            <Pagination
              numberOfPages={numberOfPages}
              currentPage={page}
              setCurrentPage={handlePageChange}
            />
          </>
        ) : (
          'No products found'
        )}
      </Loader>
    </Container>
  );
};
