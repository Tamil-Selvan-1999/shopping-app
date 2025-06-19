import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, Product, RootState } from "../interface/interface";
import { BACKEND_URL } from "../config";
import { useState, useEffect } from "react";
import { closeProduct, viewProduct } from "../store/modalSlice";

function CategoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const handleView = (item: Product) => dispatch(viewProduct(item));
  const handleClose = () => dispatch(closeProduct());
  const { isLoggedIn } = useSelector((state: RootState) => state.login);

  const { showModal, selectedProduct } = useSelector(
    (state: RootState) => state.modal
  );
  const { category } = useParams();

  const productData = useSelector((state: RootState) => state.product.items);
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    if (!category || !productData.length) return;

    const selected = productData.filter((item) => item.category === category);

    if (selected) {
      setProducts(selected);
    }
  }, [category, productData]);

  if (!products) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {products.map((item) => (
          <div className="col" key={item.productId}>
            <div className="card h-100 shadow-sm">
              <img
                src={BACKEND_URL + item.thumbnail}
                className="card-img-top"
                alt={item.title}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <button
                  type="button"
                  className="btn btn-primary mt-auto"
                  onClick={() => handleView(item)}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && selectedProduct && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isLoggedIn
                    ? selectedProduct.title
                    : "Login Required to View Product"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>

              {isLoggedIn ? (
                <div className="modal-body row g-3">
                  <div className="col-md-5">
                    <img
                      src={BACKEND_URL + selectedProduct.thumbnail}
                      alt={selectedProduct.title}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-7">
                    <p className="mb-2">{selectedProduct.description}</p>
                    <p className="mb-1">
                      <strong>Category:</strong> {selectedProduct.category}
                    </p>
                    <p className="mb-1">
                      <strong>Rating:</strong> {selectedProduct.rating} ★
                    </p>
                    <p className="mb-1">
                      <strong>Brand:</strong> {selectedProduct.brand}
                    </p>
                    <p className="mb-1">
                      <strong>Stock:</strong> {selectedProduct.stock}
                    </p>
                    <Link
                      to={`/product/${selectedProduct.category}/${selectedProduct.productId}/${selectedProduct.title}`}
                      className="btn btn-sm btn-outline-primary mt-2"
                    >
                      Go to Product Page
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="modal-body text-center">
                  Please log in to view product details.
                </div>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
