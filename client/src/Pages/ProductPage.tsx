import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Product, RootState } from "../interface/interface";
import { BACKEND_URL } from "../config";
import { useState, useEffect } from "react";

function ProductPage() {
  const { category, productId, productSlug } = useParams();
  const navigate = useNavigate();

  const productData = useSelector((state: RootState) => state.product.items);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId || !productData.length) return;

    const selected = productData.find(
      (item) => item.productId === parseInt(productId)
    );

    if (selected) {
      setProduct(selected);

      const expectedSlug = slugify(selected.title);

      if (productSlug !== expectedSlug) {
        navigate(`/product/${category}/${productId}/${expectedSlug}`, {
          replace: true,
        });
      }
    }
  }, [productId, productSlug, category, navigate, productData]);

  if (!product) return <div>Loading...</div>;

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="container mt-4 mb-5">
      {product ? (
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
                  {product.images.map((img: string, idx: number) => (
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
              <h2>{product.title}</h2>
              <p className="text-muted">{product.description}</p>

              <h4>
                ₹{discountedPrice}{" "}
                <small className="text-decoration-line-through text-danger ms-2">
                  ₹{product.price}
                </small>
                <span className="badge bg-success ms-2">
                  -{product.discountPercentage}%
                </span>
              </h4>

              <p>
                <strong>Rating:</strong> {product.rating} ★
              </p>
              <p>
                <strong>Availability:</strong>{" "}
                <span
                  className={
                    product.availabilityStatus.toLowerCase().includes("out")
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {product.availabilityStatus}
                </span>
              </p>
              <p>
                <strong>Shipping:</strong> {product.shippingInformation}
              </p>
              <p>
                <strong>Warranty:</strong> {product.warrantyInformation}
              </p>
              <p>
                <strong>Return Policy:</strong> {product.returnPolicy}
              </p>

              <button
                className="btn btn-primary"
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>

          {/* Meta & Reviews */}
          <div className="row mt-5 g-4">
            <div className="col-lg-6">
              <h5>Product Details</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>SKU:</strong> {product.sku}
                </li>
                <li className="list-group-item">
                  <strong>Brand:</strong> {product.brand}
                </li>
                <li className="list-group-item">
                  <strong>Tags:</strong> {product.tags.join(", ")}
                </li>
                <li className="list-group-item">
                  <strong>Weight:</strong> {product.weight} kg
                </li>
                <li className="list-group-item">
                  <strong>Dimensions:</strong> {product.dimensions.width} x{" "}
                  {product.dimensions.height} x {product.dimensions.depth} mm
                </li>
                <li className="list-group-item">
                  <strong>Barcode:</strong> {product.meta.barcode}
                </li>
                <li className="list-group-item">
                  <img
                    src={BACKEND_URL + product.meta.qrCode}
                    alt="QR Code"
                    style={{ width: "80px" }}
                  />
                </li>
              </ul>
            </div>

            <div className="col-lg-6">
              <h5>Customer Reviews</h5>
              {product.reviews.map((review: any, idx: number) => (
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

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export default ProductPage;
