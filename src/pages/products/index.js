import HorizontalProductCard from "@/components/FeaturedProduct/HorizontalProductCard";
// import ProductCard from "@/components/FeaturedProduct/ProductCard";
import RootLayout from "@/components/Layouts/RootLayouts";
import { env } from "@/env";

export default function CategoryWiseProduct({ category, data }) {
  return (
    <div className="md:max-w-[80vw] mx-auto my-12 min-h-[80vh]">
      <h1 className="text-center text-3xl font-semibold capitalize mb-12">
        catagories: <span>{category ? category : "ALL"}</span>
      </h1>
      <div className="min-h-screen">
        {data &&
          data.map((product) => (
            <HorizontalProductCard
              key={product._id}
              product={product}
            ></HorizontalProductCard>
          ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { category = "" } = context.query;
  const res = await fetch(`${env.BASE_URL}/products?category=${category}`);
  const data = await res.json();
  return {
    props: {
      category,
      data,
    },
  };
}

CategoryWiseProduct.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
