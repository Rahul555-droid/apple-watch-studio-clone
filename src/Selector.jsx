import React from 'react'
import { bandCases, watchCases } from 'constant'

function Selector() {
  return (
    <div className="rf-designstudio-mainmats">
      <div
        data-core-fade-transition-wrapper=""
        className="rf-designstudio-casesmat r-fade-transition-enter-done"
        data-autom="casesmat"
      >
        <div className="rf-designstudio-scroller rf-designstudio-horizontal-platter">
          <DynamicScrollerGrid />
          <PrevNextButton />
        </div>
      </div>
      <div
        aria-hidden="true"
        data-core-fade-transition-wrapper=""
        className="rf-designstudio-bandsmat r-fade-transition-exit-done"
        data-autom="bandsmat"
      >
        <div className="rf-designstudio-scroller rf-designstudio-horizontal-platter">
          <div className="rf-designstudio-scroller-crop">
            <div
              data-core-scroller=""
              data-core-scroller-customsnap=""
              role="group"
              aria-label="Choose your watch band"
              style={{ overflowX: 'scroll' }}
            >
              <div data-core-scroller-platter="" role="radiogroup"></div>
            </div>
          </div>
          <div className="paddlenav paddlenav-solid">
            <button
              type="button"
              disabled=""
              aria-hidden="true"
              className="paddlenav-arrow paddlenav-arrow-previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                <path d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z"></path>
              </svg>
              <span className="a11y">previous</span>
            </button>
            <button
              type="button"
              disabled=""
              aria-hidden="true"
              className="paddlenav-arrow paddlenav-arrow-next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                <path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"></path>
              </svg>
              <span className="a11y">next</span>
            </button>
          </div>
          <div
            className="rf-designstudio-combinedimage rf-designstudio-stuckview rf-designstudio-stuckviewtop"
            aria-hidden="true"
            role="img"
            aria-label=""
          >
            <img
              alt=""
              className="rf-designstudio-topimage rf-designstudio-caseimage"
              aria-hidden="true"
            />
          </div>
          <div className="rf-designstudio-productinfo-wrapper">
            <div className="rf-designstudio-productinfo typography-body-reduced">
              <button
                className="rf-designstudio-sideviewbtn typography-caption"
                data-autom="Side view"
                aria-label="Switch to side view"
                type="button"
              >
                Side view
              </button>
              <div aria-live="polite" role="text">
                <div
                  className="rf-designstudio-producttitle typography-body-reduced"
                  data-autom="productTitle-bands"
                ></div>
                <div
                  className="rf-designstudio-productprice typography-body-reduced"
                  data-autom="designStudioPrice-bands"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Selector


function DynamicScrollerGrid () {
  // State for selected items and mode
  const [selectedCase, setSelectedCase] = React.useState(watchCases[0]);
  const [selectedBand, setSelectedBand] = React.useState(bandCases[0]);
  const [mode, setMode] = React.useState('case'); // 'case' or 'band'

  // Combined data based on mode
  const getScrollerData = () => {
    return mode === 'case' ? {
      items: watchCases,
      ariaLabel: "Choose your watch case",
      imageClass: "rf-designstudio-caseimage",
      setSelected: setSelectedCase
    } : {
      items: bandCases,
      ariaLabel: "Choose your watch band",
      imageClass: "rf-designstudio-bandsimage",
      setSelected: setSelectedBand
    };
  };

  const scrollerData = getScrollerData();

  return (
    <div className="relative">
      {/* Mode switcher */}


      {/* Scroller */}
      <div className="rf-designstudio-scroller-crop">
        <div
          data-core-scroller=""
          data-core-scroller-customsnap=""
          aria-label={scrollerData.ariaLabel}
          style={{ overflowX: 'scroll' }}
        >
          <div data-core-scroller-platter="" role="radiogroup">
            {scrollerData.items.map((item, index) => (
              <div key={index} data-core-scroller-item="">
                <button
                  className={`rf-designstudio-scroller-item ${
                    (mode === 'case' ? selectedCase : selectedBand) === item
                      ? 'rf-designstudio-scroller-currentitem'
                      : ''
                  }`}
                  type="button"
                  onClick={() => scrollerData.setSelected(item)}
                >
                  <img
                    width="500"
                    height="500"
                    alt={item.alt}
                    src={item.src}
                    className={`rf-designstudio-bottomimage ${scrollerData.imageClass}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Static display */}
      <div
        className={`rf-designstudio-combinedimage rf-designstudio-stuckview ${
          mode === 'band' ? 'rf-designstudio-stuckviewtop' : ''
        }`}
        aria-hidden="true"
        aria-label={`${selectedCase.alt} with ${selectedBand.alt}`}
      >
        <img
          alt=""
          className={`rf-designstudio-topimage ${
            mode === 'case' ? 'rf-designstudio-bandimage' : 'rf-designstudio-caseimage'
          }`}
          aria-hidden="true"
          width="500"
          height="500"
          src={mode === 'case' ? selectedBand.src : selectedCase.src}
        />
      </div>


      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setMode('case')}
          className={`px-4 py-2 rounded ${
            mode === 'case' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Case Selection
        </button>
        <button
          onClick={() => setMode('band')}
          className={`px-4 py-2 rounded ${
            mode === 'band' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Band Selection
        </button>
      </div>
    </div>
  );
};


function PrevNextButton() {
  return (
    <div className="paddlenav paddlenav-solid">
      <button
        type="button"
        aria-hidden="false"
        className="paddlenav-arrow paddlenav-arrow-previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
          <path d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z"></path>
        </svg>
        <span className="a11y">previous</span>
      </button>
      <button
        type="button"
        aria-hidden="false"
        className="paddlenav-arrow paddlenav-arrow-next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
          <path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"></path>
        </svg>
        <span className="a11y">next</span>
      </button>
    </div>
  )
}
