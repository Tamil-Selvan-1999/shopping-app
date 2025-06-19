import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/productSlice";
import { viewProduct, closeProduct } from "../store/modalSlice";
import { Product, RootState, AppDispatch } from "../interface/interface";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";
import { useState } from "react";

const PRODUCTS_PER_PAGE = 50;

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

  const [currentPage, setCurrentPage] = useState(1);

  const handleView = (item: Product) => dispatch(viewProduct(item));
  const handleClose = () => dispatch(closeProduct());
  const handleFetchProducts = () => dispatch(fetchAllProducts());

  const totalPages = Math.ceil(productData.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = productData.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        {!isLoading && !isProductFetched && isLoggedIn && (
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleFetchProducts}
          >
            Click here to get the latest products
          </button>
        )}

        {!isLoggedIn && (
          <Link to="/login" className="btn btn-outline-primary btn-sm">
            Login to see products
          </Link>
        )}
      </div>

      {isLoading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {!isLoading && isLoggedIn && (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((item) => (
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
              ))
            ) : error ? (
              <div className="col">
                <div className="alert alert-danger text-center">{error}</div>
              </div>
            ) : (
              <div className="col">
                <div className="alert alert-info text-center">
                  No products found.
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-4 d-flex justify-content-center">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        page === currentPage ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}

                <li
                  className={`page-item ${
                    currentPage === totalPages && "disabled"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}

      {/* Modal */}
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
                    <Link
                      to={`/category/${selectedProduct.category}`}
                      className="btn btn-sm btn-outline-primary mt-2"
                    >
                      Go to Category Page
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

export default AllProducts;
