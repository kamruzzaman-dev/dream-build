import ProductCard from "./ProductCard";

export default function FeaturedProduct({ randomProducts }) {
  return (
    <div className="m-6 md:m-12">
      <h1 className="text-center text-4xl mb-2 font-semibold">
        Featured <span className="text-[#52ab98]">Products</span>
      </h1>
      <p className="text-center text-xl mb-10">
        Check & Get Your Desired Product!
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {randomProducts &&
          randomProducts.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
      </div>
    </div>
  );
}
