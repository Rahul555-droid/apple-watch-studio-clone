"use client";
import PrevNextButton from "@/components/PrevNextButton";
import ProductInfo from "@/components/ProductInfo";
import SelectionButtons from "@/components/SelectionButtons";
import { bandIcon, caseIcon, sizeIcon } from "@/components/icons";
import { sizeIconChildOptions } from "@/constants";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";

export default function DynamicScrollerGrid({
  bandCases = null,
  watchCases = null,
  selectedCaseIndex,
  setSelectedCaseIndex,
  selectedBandIndex,
  setSelectedBandIndex,
  selectedSizeIndex,
  setSelectedSizeIndex,
  mode,
  setMode,
  bandIconChildOptions,
  caseIconChildOptions,
  currentCollectionlabel,
}) {
  // State for selected items and mode

  const scrollerRef = React.useRef(null); // Ref for the scroller container
  const [isAnimating, setIsAnimating] = useState(false);
  const [refresh, setRefresh] = useState(true); //a refresh toggle to run scroll into view again
  const selectedCase = useMemo(
    () => watchCases[selectedCaseIndex],
    [selectedCaseIndex, watchCases]
  );
  const selectedBand = useMemo(
    () => bandCases[selectedBandIndex],
    [selectedBandIndex, bandCases]
  );
  const [selectedScaleClass , sizeLabel] = useMemo(
    () => [sizeIconChildOptions[selectedSizeIndex].scaleClass , sizeIconChildOptions[selectedSizeIndex].label],
    [selectedSizeIndex, sizeIconChildOptions]
  );

  const buttonsData = useMemo(
    () =>
      [
        {
          icon: sizeIcon,
          label: "Size",
          dataAutom: "size",
          options: sizeIconChildOptions,
          handleClick: () => handleModeChange("size"),
        },
        {
          icon: caseIcon,
          label: "Case",
          dataAutom: "case",
          options: caseIconChildOptions,
          handleClick: () => handleModeChange("case"),
        },
        {
          icon: bandIcon,
          label: "Band",
          dataAutom: "band",
          options: bandIconChildOptions,
          handleClick: () => handleModeChange("band"),
        },
      ].map((el) => ({ ...el, isActive: el.dataAutom === mode })),
    [sizeIconChildOptions, caseIconChildOptions, bandIconChildOptions, mode]
  );

  const scrollerData = useMemo(() => {
    switch (mode) {
      case "case":
        return {
          items: watchCases,
          ariaLabel: "Choose your watch case",
          imageClass: "rf-designstudio-caseimage",
          selectedIndex: selectedCaseIndex,
          setSelectedIndex: setSelectedCaseIndex,
        };
      case "band":
        return {
          items: bandCases,
          ariaLabel: "Choose your watch band",
          imageClass: "rf-designstudio-bandsimage",
          selectedIndex: selectedBandIndex,
          setSelectedIndex: setSelectedBandIndex,
        };
      case "size":
      default:
        return {
          items: sizeIconChildOptions,
          ariaLabel: "Choose your size",
          imageClass: "rf-designstudio-bandsimage",
          selectedIndex: selectedSizeIndex,
          setSelectedIndex: setSelectedSizeIndex,
        };
    }
  }, [
    mode,
    watchCases,
    bandCases,
    selectedCaseIndex,
    setSelectedCaseIndex,
    selectedSizeIndex,
    setSelectedSizeIndex,
    setSelectedBandIndex,
    selectedBandIndex,
  ]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const changeIndexOfCurrentScrollWithRefresh = (callbackOrValue) => {
    //setState callback or normal value
    scrollerData.setSelectedIndex(callbackOrValue);
    setRefresh((prev) => !prev);
  };

  const handlePrevNext = (event) => {
    const type = event.currentTarget.getAttribute("data-btn-type");
    const difference = type === "prev" ? -1 : 1;

    changeIndexOfCurrentScrollWithRefresh((prev) => {
      const actualLength = scrollerData.items.length - 1;
      const newIndex = (prev + difference) % actualLength;
      return newIndex < 0 ? newIndex + actualLength : newIndex;
    });
  };

  const handleScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const centerX = scrollerRect.left + scrollerRect.width / 2;

    let closestIndex = -1;
    let minDistance = Infinity;

    scroller
      .querySelectorAll("[data-core-scroller-item]")
      .forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;

        const distance = Math.abs(centerX - itemCenterX);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

    if (closestIndex > -1 && closestIndex !== scrollerData.selectedIndex) {
      scrollerData.setSelectedIndex(closestIndex);
    }
  }, [scrollerData.selectedIndex, scrollerData.setSelectedIndex]);

  // Scroll into view when mode changes or selected index changes
  React.useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const items = scroller.querySelectorAll("[data-core-scroller-item]");
    const selectedIndex = scrollerData.selectedIndex;

    if (items[selectedIndex]) {
      items[selectedIndex].scrollIntoView({
        behavior: "auto",
        inline: "center",
      });
    }
  }, [mode, refresh]);

  return (
    <>
      <div className={`relative `}>
        {/* Scroller */}
        <div
          className={`rf-designstudio-scroller-crop transition-opacity duration-500 ${
            isAnimating ? "opacity-0" : "opacity-100"
          } `}
        >
          <div
            data-core-scroller=""
            data-core-scroller-customsnap=""
            aria-label={scrollerData.ariaLabel}
            style={{
              overflowX: "scroll",
              scrollBehavior: "smooth",
              scrollSnapType: "x mandatory",
            }}
            ref={scrollerRef}
            onScroll={handleScroll}
          >
            <div data-core-scroller-platter="" role="radiogroup">
              {scrollerData.items.map((item, index) => (
                <div key={index} data-core-scroller-item="">
                  <button
                    className={`rf-designstudio-scroller-item ${
                      scrollerData.selectedIndex === index
                        ? "rf-designstudio-scroller-currentitem"
                        : ""
                    }`}
                    type="button"
                  >
                    {mode !== "size" ? (
                      <>
                        {" "}
                        {item.src ? (
                          <Image
                            width={500}
                            height={500}
                            alt={item.alt}
                            src={item.src}
                            className={`rf-designstudio-bottomimage ${scrollerData.imageClass} ${selectedScaleClass}`}
                          />
                        ) : (
                          <div></div>
                        )}
                      </>
                    ) : (
                      <div
                        className={`rf-designstudio-combinedimage  ${item?.scaleClass} `}
                        role="img"
                        aria-label={item?.label}
                      >
                        {item.value ? (
                          <>
                            {" "}
                            <Image
                              width="500"
                              height="500"
                              alt=""
                              src={selectedCase.src}
                              className="rf-designstudio-topimage rf-designstudio-caseimage"
                              aria-hidden="true"
                            />
                            <Image
                              width="500"
                              height="500"
                              alt=""
                              src={selectedBand.src}
                              className="rf-designstudio-bottomimage rf-designstudio-bandimage"
                              aria-hidden="true"
                            />
                          </>
                        ) : (
                          <div />
                        )}
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/*"stuck" image*/}
          {mode !== "size" && (
            <div
              className={`rf-designstudio-combinedimage rf-designstudio-stuckview ${
                mode === "band" ? "rf-designstudio-stuckviewtop" : ""
              }`}
              aria-hidden="true"
              aria-label={`${selectedCase.alt} with ${selectedBand.alt}`}
            >
              <Image
                alt=""
                className={`rf-designstudio-topimage ${
                  mode === "case"
                    ? "rf-designstudio-bandimage"
                    : "rf-designstudio-caseimage"
                } ${selectedScaleClass} `}
                aria-hidden="true"
                width="500"
                height="500"
                src={mode === "case" ? selectedBand.src : selectedCase.src}
              />
            </div>
          )}
        </div>

        <ProductInfo
          collectionLabel={currentCollectionlabel}
          caseLabel={selectedCase.alt}
          bandLabel={selectedBand.alt}
          sizeLabel={sizeLabel}
        />

        <SelectionButtons
          buttonsData={buttonsData}
          className="mt-6"
          changeIndex={changeIndexOfCurrentScrollWithRefresh}
        />
      </div>

      <PrevNextButton handlePrevNext={handlePrevNext} />
    </>
  );
}
