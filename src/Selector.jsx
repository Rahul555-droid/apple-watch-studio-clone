import React, { useEffect, useState } from 'react'
import { bandCases, watchCases } from 'constant'
import CollectionsDropdown from 'CollectionsDropdown'
import { collections } from 'constant'
import SelectionButtons from 'SelectionButtons'

const buttonsData = [
  {
    icon: (
      <svg
        height="25"
        viewBox="0 0 19 25"
        width="19"
        xmlns="http://www.w3.org/2000/svg"
        style={{ scale: '2' }}
      >
        <path d="m0 0h19v25h-19z" fill="none"></path>
        <path
          d="m18.25 9.038v1.7427c0 .2972-.0833.5382-.25.7227-.1665.1847-.385.277-.6553.277h-.3447v5.1904c0 2.2253-1.804 4.0293-4.0293 4.0293h-2.3643c.3291-.2865.6082-.6216.8301-1h1.5342c1.6704 0 3.0293-1.3589 3.0293-3.0293v-8.9414c0-1.6704-1.3589-3.0293-3.0293-3.0293h-6.9414c-1.3074 0-2.4136.8372-2.8372 2h-.1748c-.3113 0-.6113.0437-.9026.1111.417-1.781 2.0063-3.1111 3.9146-3.1111h6.9414c2.2253 0 4.0293 1.804 4.0293 4.0293v.0225h.3447c.2703 0 .4888.0902.6553.2703.1667.1803.25.4187.25.7159zm-7.25 8.9447c0 1.6664-1.3508 3.0173-3.0173 3.0173h-4.9654c-1.6665 0-3.0173-1.351-3.0173-3.0173v-6.9653c0-1.6664 1.3508-3.0173 3.0173-3.0173h4.9653c1.6665 0 3.0173 1.351 3.0173 3.0173v.1215h.3076c.2068 0 .3738.069.5012.2067.1274.1379.1912.3202.1912.5475v1.3326c0 .2273-.0637.4116-.1912.5526-.1274.1412-.2944.2118-.5012.2118h-.3076v3.9927zm-1-6.9653c0-1.1123-.905-2.0173-2.0173-2.0173h-4.9654c-.0059 0-.0115.0017-.0173.0017-.366.0032-.7048.1096-1 .2837-.5952.3511-1 .9922-1 1.7319v6.9653c0 1.1123.905 2.0173 2.0173 2.0173h4.9653c1.1123 0 2.0173-.905 2.0173-2.0173v-6.9653z"
          fill="#1d1d1f"
        ></path>
      </svg>
    ),
    label: 'Size',
    dataAutom: 'size',
    options: [
      { label: '42mm', value: '42mm' },
      { label: '46mm', value: '46mm' }
    ]
  },
  {
    icon: (
      <svg
        height="25"
        viewBox="0 0 17 25"
        width="17"
        xmlns="http://www.w3.org/2000/svg"
        style={{ scale: '2' }}
      >
        <path d="m0 0h17v25h-17z" fill="none"></path>
        <path
          d="m16 8.2017c-.1665-.1801-.385-.2703-.6553-.2703h-.3447v-.0225c0-2.2253-1.804-4.0293-4.0293-4.0293h-6.9414c-2.2253.0001-4.0293 1.804-4.0293 4.0294v8.9414c0 2.2253 1.804 4.0293 4.0293 4.0293h6.9414c2.2253 0 4.0293-1.804 4.0293-4.0293v-5.1904h.3447c.2703 0 .4888-.0923.6553-.277.1667-.1844.25-.4254.25-.7227v-1.7427c0-.2972-.0833-.5356-.25-.7159zm-2 8.6487c0 1.6704-1.3589 3.0293-3.0293 3.0293h-6.9414c-1.6704 0-3.0293-1.3589-3.0293-3.0293v-8.9414c0-1.6704 1.3589-3.0293 3.0293-3.0293h6.9414c1.6704 0 3.0293 1.3589 3.0293 3.0293z"
          fill="#1d1d1f"
        ></path>
      </svg>
    ),
    label: 'Case',
    dataAutom: 'case',
    options: [
      { value: 'aluminium', label: 'Aluminium' },
      { value: 'titantium', label: 'titantium' }
    ]
  },
  {
    icon: (
      <svg
        height="25"
        viewBox="0 0 10 25"
        width="10"
        xmlns="http://www.w3.org/2000/svg"
        style={{ scale: '6.5' }}
      >
        <path d="m0 0h10v25h-10z" fill="none"></path>
        <path
          d="m9.5 22.5a.5.5 0 0 1 -.5.5h-8a.5.5 0 1 1 0-1h.015a.485.485 0 0 0 .485-.485v-6.2216a4.5231 4.5231 0 0 0 1 .9448v5.2768a1.4779 1.4779 0 0 1 -.0813.485h5.1627a1.4758 1.4758 0 0 1 -.0814-.485v-5.2768a4.5209 4.5209 0 0 0 1-.9448v6.2216a.4851.4851 0 0 0 .4851.485h.0149a.5.5 0 0 1 .5.5zm-1.9194-19.5h-5.1621a1.4732 1.4732 0 0 1 .0815.485v9.015a2.5 2.5 0 0 0 5 0v-9.015a1.4873 1.4873 0 0 1 .0806-.485m1.4194-1a.5.5 0 0 1 .5.5.5.5 0 0 1 -.5.5h-.015a.485.485 0 0 0 -.485.485v9.015a3.5 3.5 0 0 1 -3.5 3.5 3.5 3.5 0 0 1 -3.5-3.5v-9.015a.485.485 0 0 0 -.485-.485h-.015a.5.5 0 0 1 0-1zm-3.2179 10.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75zm0-2.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75zm0-2.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75z"
          fill="#1d1d1f"
        ></path>
      </svg>
    ),
    label: 'Band',
    dataAutom: 'bands',
    options: [
      { value: 'stainless', label: 'Stainless Steel' },
      { value: 'sportloop', label: 'Sport Loop' },
      { value: 'fluoroelastomer', label: 'Sport Band', selected: true },
      { value: 'finewoven', label: 'FineWoven' },
      { value: 'polyyarnsiliconethread', label: 'Braided Solo Loop' },
      { value: 'liquidsiliconerubber', label: 'Solo Loop' },
      { value: 'nikesportloop', label: 'Nike Sport Loop' },
      { value: 'nikesportband', label: 'Nike Sport Band' }
    ]
  }
]

function Selector() {
  const [showOtherCollections, setShowOtherCollections] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState(null)

  return (
    <>
      {showOtherCollections && (
        <CollectionsDropdown
          collections={collections}
          handleClose={() => setShowOtherCollections(false)}
        />
      )}

      <div className="rf-designstudio-mainmats">
        <div
          data-core-fade-transition-wrapper=""
          className="rf-designstudio-casesmat r-fade-transition-enter-done"
          data-autom="casesmat"
        >
          <div className="rf-designstudio-scroller rf-designstudio-horizontal-platter mt-8">
            <div className="mt-2 mb-10 flex justify-between items-center px-2">
              <div></div>

              <button type="button">
                <div
                  className="rf-designstudio-collectionlbl typography-body"
                  data-autom="Collections"
                  onClick={() => setShowOtherCollections(true)}
                >
                  Collections v{' '}
                  <span className="visuallyhidden">Apple Watch</span>
                  <span className="icon icon-after icon-chevrondown"></span>
                </div>
              </button>

              <button
                className={`px-4 py-2 rounded-3xl bg-blue-500 text-white`}
                onClick={() => alert('save')}
              >
                Save
              </button>
            </div>

            <DynamicScrollerGrid />
            <PrevNextButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default Selector

function DynamicScrollerGrid() {
  // State for selected items and mode
  const [selectedCaseIndex, setSelectedCaseIndex] = React.useState(0)
  const [selectedBandIndex, setSelectedBandIndex] = React.useState(0)
  const [mode, setMode] = React.useState('case') // 'case' or 'band'
  const scrollerRef = React.useRef(null) // Ref for the scroller container
  const [isAnimating, setIsAnimating] = useState(false)

  const selectedCase = watchCases[selectedCaseIndex]
  const selectedBand = bandCases[selectedBandIndex]

  const handleModeChange = (newMode) => {
    setIsAnimating(true) // Start animation
    setTimeout(() => {
      setMode(newMode)
      setIsAnimating(false) // End animation after transition
    }, 300) // Duration matches CSS transition time
  }

  const getScrollerData = () => {
    return mode === 'case'
      ? {
          items: watchCases,
          ariaLabel: 'Choose your watch case',
          imageClass: 'rf-designstudio-caseimage',
          selectedIndex: selectedCaseIndex,
          setSelectedIndex: setSelectedCaseIndex
        }
      : {
          items: bandCases,
          ariaLabel: 'Choose your watch band',
          imageClass: 'rf-designstudio-bandsimage',
          selectedIndex: selectedBandIndex,
          setSelectedIndex: setSelectedBandIndex
        }
  }

  const scrollerData = getScrollerData()

  const handleScroll = () => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const scrollerRect = scroller.getBoundingClientRect()
    const centerX = scrollerRect.left + scrollerRect.width / 2

    let closestIndex = -1
    let minDistance = Infinity

    scroller
      .querySelectorAll('[data-core-scroller-item]')
      .forEach((item, index) => {
        const itemRect = item.getBoundingClientRect()
        const itemCenterX = itemRect.left + itemRect.width / 2

        const distance = Math.abs(centerX - itemCenterX)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })

    if (closestIndex > -1 && closestIndex !== scrollerData.selectedIndex) {
      scrollerData.setSelectedIndex(closestIndex)
    }
  }

  React.useEffect(() => {
    const scroller = scrollerRef.current
    if (scroller) {
      scroller.addEventListener('scroll', handleScroll)
      return () => scroller.removeEventListener('scroll', handleScroll)
    }
  }, [mode, scrollerData])

  // Scroll into view when mode changes or selected index changes
  React.useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const items = scroller.querySelectorAll('[data-core-scroller-item]')
    const selectedIndex = scrollerData.selectedIndex

    if (items[selectedIndex]) {
      items[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        inline: 'center'
      })
    }
  }, [mode])

  return (
    <div
      key={mode} // Forces a re-render for fade effect
      className={`relative transition-opacity duration-300 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Scroller */}
      <div className="rf-designstudio-scroller-crop">
        <div
          data-core-scroller=""
          data-core-scroller-customsnap=""
          aria-label={scrollerData.ariaLabel}
          style={{
            overflowX: 'scroll',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory'
          }}
          ref={scrollerRef}
        >
          <div data-core-scroller-platter="" role="radiogroup">
            {scrollerData.items.map((item, index) => (
              <div key={index} data-core-scroller-item="">
                <button
                  className={`rf-designstudio-scroller-item ${
                    scrollerData.selectedIndex === index
                      ? 'rf-designstudio-scroller-currentitem'
                      : ''
                  }`}
                  type="button"
                >
                  {item.src ? (
                    <img
                      width="500"
                      height="500"
                      alt={item.alt}
                      src={item.src}
                      className={`rf-designstudio-bottomimage ${scrollerData.imageClass}`}
                    />
                  ) : (
                    <div></div>
                  )}
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
            mode === 'case'
              ? 'rf-designstudio-bandimage'
              : 'rf-designstudio-caseimage'
          }`}
          aria-hidden="true"
          width="500"
          height="500"
          src={mode === 'case' ? selectedBand.src : selectedCase.src}
        />
      </div>

      <ProductInfo />
      <SelectionButtons buttonsData={buttonsData} />

      {/* <div className="mb-4 flex gap-4 mx-auto w-44">
        <button
          onClick={() => handleModeChange('case')}
          className={`px-4 py-2 rounded ${
            mode === 'case' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Case Selection
        </button>
        <button
          onClick={() => handleModeChange('band')}
          className={`px-4 py-2 rounded ${
            mode === 'band' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Band Selection
        </button>
      </div> */}
    </div>
  )
}

function ProductInfo() {
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
  )
}

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
