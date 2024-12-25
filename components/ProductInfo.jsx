export default function ProductInfo({collectionLabel ='' , sizeLabel = '' , caseLabel = '' , bandLabel = '' , total = 0}) {
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
              {collectionLabel}
            </div>
            <div
              className="rf-designstudio-producttitle typography-body-reduced text-center mb-0 mt-0"
              data-autom="productTitle-applewatch"
            >
              {sizeLabel} {caseLabel} with {bandLabel}
            </div>
            <div
              className="rf-designstudio-productprice typography-body-reduced text-center"
              data-autom="designStudioPrice-applewatch"
            >
              <div className="rf-designstudio-pricepoint-fullPrice-comparative text-center mb-0 mt-0">
                <span className="nowrap">${total }</span>
              </div>
              <div className="rf-designstudio-pricepoint-acmiPrice-comparative mb-0 mt-0"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
