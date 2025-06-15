import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Product, RootState } from "../interface/interface";
import { BACKEND_URL } from "../config";

function ProductPage() {
  const { productId } = useParams();

  let currentProduct: Product | undefined = undefined;

  const { items: productData } = useSelector(
    (state: RootState) => state.product
  );

  if (productId) {
    currentProduct = productData.find(
      (item) => item.productId === parseInt(productId)
    );
  }

  const discountedPrice = currentProduct
    ? (
        currentProduct.price *
        (1 - currentProduct.discountPercentage / 100)
      ).toFixed(2)
    : "0.00";

  return (
    <div className="container mt-4 mb-5">
      {currentProduct ? (
        <>
          <div className="row g-4">
            {/* Image Carousel */}
            <div className="col-md-6">
              <div
                id="productCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner border rounded">
                  {currentProduct.images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className={`carousel-item ${idx === 0 ? "active" : ""}`}
                    >
                      <img
                        src={BACKEND_URL + img}
                        className="d-block w-100"
                        alt={`Product ${idx}`}
                        style={{ objectFit: "cover", height: "400px" }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon"></span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon"></span>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="col-md-6">
              <h2>{currentProduct.title}</h2>
              <p className="text-muted">{currentProduct.description}</p>

              <h4>
                ₹{discountedPrice}{" "}
                <small className="text-decoration-line-through text-danger ms-2">
                  ₹{currentProduct.price}
                </small>
                <span className="badge bg-success ms-2">
                  -{currentProduct.discountPercentage}%
                </span>
              </h4>

              <p>
                <strong>Rating:</strong> {currentProduct.rating} ★
              </p>
              <p>
                <strong>Availability:</strong>{" "}
                <span
                  className={
                    currentProduct.availabilityStatus
                      .toLowerCase()
                      .includes("out")
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {currentProduct.availabilityStatus}
                </span>
              </p>
              <p>
                <strong>Shipping:</strong> {currentProduct.shippingInformation}
              </p>
              <p>
                <strong>Warranty:</strong> {currentProduct.warrantyInformation}
              </p>
              <p>
                <strong>Return Policy:</strong> {currentProduct.returnPolicy}
              </p>

              <button
                className="btn btn-primary"
                disabled={currentProduct.stock === 0}
              >
                {currentProduct.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>

          {/* Meta & Reviews */}
          <div className="row mt-5 g-4">
            <div className="col-lg-6">
              <h5>Product Details</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>SKU:</strong> {currentProduct.sku}
                </li>
                <li className="list-group-item">
                  <strong>Brand:</strong> {currentProduct.brand}
                </li>
                <li className="list-group-item">
                  <strong>Tags:</strong> {currentProduct.tags.join(", ")}
                </li>
                <li className="list-group-item">
                  <strong>Weight:</strong> {currentProduct.weight} kg
                </li>
                <li className="list-group-item">
                  <strong>Dimensions:</strong> {currentProduct.dimensions.width}{" "}
                  x {currentProduct.dimensions.height} x{" "}
                  {currentProduct.dimensions.depth} mm
                </li>
                <li className="list-group-item">
                  <strong>Barcode:</strong> {currentProduct.meta.barcode}
                </li>
                <li className="list-group-item">
                  <img
                    src={BACKEND_URL + currentProduct.meta.qrCode}
                    alt="QR Code"
                    style={{ width: "80px" }}
                  />
                </li>
              </ul>
            </div>

            <div className="col-lg-6">
              <h5>Customer Reviews</h5>
              {currentProduct.reviews.map((review: any, idx: number) => (
                <div key={idx} className="border rounded p-2 mb-3">
                  <p className="mb-1 fw-semibold">
                    {review.reviewerName} – {review.rating} ★
                  </p>
                  <p className="mb-1">{review.comment}</p>
                  <small className="text-muted">
                    {new Date(review.date).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>No Product Selected</div>
      )}
    </div>
  );
}

export default ProductPage;
