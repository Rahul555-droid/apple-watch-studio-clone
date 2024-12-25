export default function ProductInfo() {
    return (
      <div className="flex justify-center text-center scale-y-90">
        <div className="text-center">
          <button
            className="rf-designstudio-sideviewbtn typography-caption text-center mb-0 mt-0"
            data-autom="Side view"
            aria-label="Switch to side view"
            type="button"
          >
            Side view
          </button>
          <div aria-live="polite" role="text">
            <div
              className="rf-designstudio-productcollection typography-caption text-center mb-0 mt-0"
              data-autom="productCollection"
            >
              APPLE WATCH SERIES 10
            </div>
            <div
              className="rf-designstudio-producttitle typography-body-reduced text-center mb-0 mt-0"
              data-autom="productTitle-applewatch"
            >
              46mm Jet Black Aluminum Case with Black Solo Loop
            </div>
            <div
              className="rf-designstudio-productprice typography-body-reduced text-center"
              data-autom="designStudioPrice-applewatch"
            >
              <div className="rf-designstudio-pricepoint-fullPrice-comparative text-center mb-0 mt-0">
                From <span className="nowrap">$429</span>
              </div>
              <div className="rf-designstudio-pricepoint-acmiPrice-comparative mb-0 mt-0"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
