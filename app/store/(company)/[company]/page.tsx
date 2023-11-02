/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ProductCard from '@/components/store/cards/product-card';
import { useAppSelector } from '@/redux/store';

export default function StorePage() {
  const { products } = useAppSelector(state => state.storeDetailsReducer);

  function renderProductCards() {
    if (products) {
      return products.map((item: any) => (
        <div className="col-span-1" key={item._id}>
          <ProductCard item={item} />
        </div>
      ));
    }
    return null;
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-5">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {renderProductCards()}
      </div>
    </>
  );
}
