import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  toggleProductActivation,
} from "../store/productSlice";
import { viewProduct, closeProduct } from "../store/modalSlice";
import { Product, RootState, AppDispatch } from "../interface/interface";

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
  const handleToggleChange = (item: Product) =>
    dispatch(toggleProductActivation(item));

  return (
    <div className="container text-center my-5">
      {!isLoading && !isProductFetched && (
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleFetchProducts}
        >
          Click here to see all products
        </button>
      )}

      {!isLoading && (
        <div className="container my-5">
          {productData && productData.length > 0 ? (
            <div className="btn-group" role="group" aria-label="button group">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {productData.map((item) => (
                  <div className="col" key={item.index}>
                    <div className="card h-100">
                      <img
                        src={item.picture}
                        className="card-img-top"
                        alt={item.name}
                      />
                      <div className="card-body">
                        <h2 className="card-title">{item.name}</h2>
                        <p className="card-text">
                          {item.about.substring(0, 40)}
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
                  <h5 className="modal-title">{selectedProduct.name}</h5>
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
                    src={selectedProduct.picture}
                    alt={selectedProduct.name}
                    className="img-fluid mb-3"
                  />
                  <p>{selectedProduct.about}</p>
                  <p>Address: {selectedProduct.address}</p>
                  <p>Color: {selectedProduct.productColor}</p>
                  <p>Company: {selectedProduct.company}</p>
                  <p>Tags: {selectedProduct.tags.toString()}</p>
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
                {isLoggedIn && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleToggleChange(selectedProduct)}
                  >
                    {selectedProduct.isActive ? "Deactivate" : "Activate"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
