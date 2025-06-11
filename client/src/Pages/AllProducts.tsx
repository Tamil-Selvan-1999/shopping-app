import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/productSlice";
import { viewProduct, closeProduct } from "../store/modalSlice";
import { Product, RootState, AppDispatch } from "../interface/interface";
import { BACKEND_URL } from "../config";

function AllProducts() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: productData,
    loading: isLoading,
    isProductFetched,
    error,
  } = useSelector((state: RootState) => state.product);
  const { showModal, selectedProduct } = useSelector(
    (state: RootState) => state.modal
  );
  const { isLoggedIn } = useSelector((state: RootState) => state.login);

  const handleView = (item: Product) => dispatch(viewProduct(item));
  const handleClose = () => dispatch(closeProduct());
  const handleFetchProducts = () => dispatch(fetchAllProducts());

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column text-center"
      style={{ minHeight: "80vh" }}
    >
      {!isLoading && !isProductFetched && (
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleFetchProducts}
        >
          Click here to get the latest products
        </button>
      )}

      {!isLoading && (
        <div className="container mt-4">
          <div className="card p-4 shadow-sm">
            {productData && productData.length > 0 ? (
              <div className="btn-group" role="group" aria-label="button group">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {productData.map((item) => (
                    <div className="col" key={item.productId}>
                      <div className="card h-100">
                        <img
                          src={BACKEND_URL + item.thumbnail}
                          className="card-img-top"
                          alt={item.title}
                        />
                        <div className="card-body">
                          <h2 className="card-title">{item.title}</h2>
                          <p className="card-text">
                            {item.description.substring(0, 40)}
                          </p>
                          <button
                            type="button"
                            className="btn btn-primary m-1"
                            onClick={() => handleView(item)}
                          >
                            See More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <h3>{error}</h3>
            ) : (
              <h3>No items</h3>
            )}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {showModal && selectedProduct && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                {isLoggedIn ? (
                  <h5 className="modal-title">{selectedProduct.title}</h5>
                ) : (
                  <h5 className="modal-title">Login Required</h5>
                )}
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              {isLoggedIn ? (
                <div className="modal-body">
                  <img
                    src={BACKEND_URL + selectedProduct.thumbnail}
                    alt={selectedProduct.title}
                    className="img-fluid mb-3"
                  />
                  <p>{selectedProduct.description}</p>
                  <p>Category: {selectedProduct.category}</p>
                  <p>Rating: {selectedProduct.rating}</p>
                  <p>Brand: {selectedProduct.brand}</p>
                  <p>Stock: {selectedProduct.stock}</p>
                </div>
              ) : (
                <div className="modal-body">Please Login to view this</div>
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

export default AllProducts;
