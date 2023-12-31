import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePostProductInPcBuilderMutation } from "@/redux/api/apiSlice";
import StarRatings from "react-star-ratings";
import { IoMdHeartEmpty } from "react-icons/io";
import { fixedFloatValue, getDiscountedPricePercentage } from "@/utils/helper";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/api/cartSlice";

export default function HorizontalProductCard({ product }) {
  const router = useRouter();
  const [postProduct] = usePostProductInPcBuilderMutation();
  const dispatch = useDispatch();

  const handleProduct = (product) => {
    postProduct(product);
    alert("Successfully added product");
    router.push("/pcBuilder");
  };

  const {
    _id,
    image,
    productName,
    originalPrice,
    price,
    status,
    averageRating,
  } = product;
  return (
    <div className="mx-5 border border-[#c8d9e4] min-h-[150px] px-2 my-3 md:px-0 shadow rounded">
      <div className="flex flex-col md:flex-row gap-x-6 justify-between items-left md:items-center p-2 min-h-[150px]">
        <div className="flex gap-x-6 justify-evenly items-center">
          <Link href={`/products/${_id}`} className="text-8xl">
            <Image src={image} alt="logo" width={200} height={200}></Image>
          </Link>
          <div className="w-2/3">
            <Link
              href={`/products/${_id}`}
              className="text-lg md:text-2xl hover:underline"
            >
              {productName}
            </Link>
            <div className="pt-3">
              <div className="flex gap-x-6 justify-between items-center md:justify-normal">
                <p className="text-[#358022] font-semibold">{status}</p>
                <p className="">Rating: {averageRating}</p>
                <div className="flex gap-x-2 justify-between items-center md:justify-normal">
                  <span className="hidden md:block mt-[-7px]">
                    <StarRatings
                      starDimension="20px"
                      rating={averageRating}
                      starRatedColor="#f9b115"
                      starSpacing="1px"
                      numberOfStars={5}
                      name="rating"
                    />
                  </span>
                  <button
                    className="w-fit font-semibold rounded-full p-1 text-lg border-[#ff595e] text-[#ff595e] hover:bg-[#ff595e] hover:text-[#fff] transition-transform active:scale-95 hover:opacity-75 hover:shadow"
                    onClick={() => alert("add to wish")}
                  >
                    <IoMdHeartEmpty size={24} />
                  </button>
                </div>
              </div>
              {originalPrice && (
                <div className="flex gap-3 justify-start">
                  <p className="text-base font-bold">
                    MPR:{" "}
                    <span className="line-through">
                      &#2547;{fixedFloatValue(originalPrice)}
                    </span>
                  </p>
                  <p className="text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(originalPrice, price)}% off
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-2 flex flex-col items-end justify-between gap-3">
          <div className="flex items-center mt-4 gap-4">
            <p className="mr-2 text-lg font-semibold">
              {originalPrice ? "Discount Price" : "MRP"} : &#2547;
              {fixedFloatValue(price)}
            </p>
          </div>
          <div className="flex gap-2 md:flex-col justify-between items-center md:justify-normal">
            <button
              className="md:w-full border px-4 md:px-6 md:text-2xl py-1 border-[#52ab98] text-[#52ab98] hover:bg-[#52ab98] hover:text-[#fff] transition-transform active:scale-95 hover:opacity-75 rounded shadow"
              onClick={() => handleProduct(product)}
            >
              Add To Builder
            </button>
            <button
              className="md:w-full border px-4 md:px-6 font-semibold py-1 md:text-2xl border-[#52ab98] bg-[#52ab98] text-[#fff] hover:bg-[#40a28d] hover:text-[#fff] transition-transform active:scale-95 hover:opacity-75 rounded shadow"
              onClick={() => {
                dispatch(
                  addToCart({
                    ...product,
                    oneQuantityPrice: price,
                  })
                );
              }}
            >
              Add To Cart{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
