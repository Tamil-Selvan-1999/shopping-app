import { useState } from "react";
import { connect } from "react-redux";
import { ViewAllProducts } from "../actions";
import {
  AllProductsProps,
  AppDispatch,
  ProductState,
  state,
} from "../interface/interface";

function AllProducts({ productData, getAllProducts }: AllProductsProps) {
  const [state, setState] = useState<ProductState>({
    showModal: false,
    selectedProduct: null,
  });

  const closeModal = () => {
    setState({
      showModal: false,
      selectedProduct: null,
    });
  };

  return (
    <div className="container text-center my-5">
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={getAllProducts}
      >
        Click here to see all products
      </button>
      <div className="container my-5">
        <div className="btn-group" role="group" aria-label="button group">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {productData && productData.length > 0 ? (
              productData.map((item, index) => (
                <div className="col" key={index}>
                  <div className="card h-100">
                    <img
                      src={item.picture}
                      className="card-img-top"
                      alt={item.name}
                    />
                    <div className="card-body">
                      <h2 className="card-title">{item.name}</h2>
                      <p className="card-text">{item.about.substr(0, 40)}</p>
                      <button
                        type="button"
                        className="btn btn-primary m-1"
                        onClick={() =>
                          setState({
                            ...state,
                            showModal: true,
                            selectedProduct: item,
                          })
                        }
                      >
                        See More
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3>No items</h3>
            )}
          </div>
        </div>
      </div>
      {state.showModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{state.selectedProduct?.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={state.selectedProduct?.picture}
                  alt={state.selectedProduct?.name}
                  className="img-fluid mb-3"
                />
                <p>{state.selectedProduct?.about}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
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

function mapStateToProps(state: state) {
  return {
    productData: state.items,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    getAllProducts: () => dispatch(ViewAllProducts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
