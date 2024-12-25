"use client";
import SelectionButtons from "@/components/SelectionButtons";
import { bandIcon, caseIcon, sizeIcon } from "@/components/icons";
import {
    bandCases,
    bandIconChildOptions,
    caseIconChildOptions,
    sizeIconChildOptions,
    watchCases
} from "@/constants";
import React, { useMemo, useState } from "react";  
import ProductInfo from '@/components/ProductInfo'
import Image from "next/image";

export default function DynamicScrollerGrid() {
    // State for selected items and mode
    const [selectedCaseIndex, setSelectedCaseIndex] = React.useState(0);
    const [selectedBandIndex, setSelectedBandIndex] = React.useState(0);
    const [selectedSizeIndex, setSelectedSizeIndex] = React.useState(1); //at 46mm
    const [mode, setMode] = React.useState("case"); // 'case', 'band', or 'size'
    const scrollerRef = React.useRef(null); // Ref for the scroller container
    const [isAnimating, setIsAnimating] = useState(false);
    const selectedCase = useMemo(
      () => watchCases[selectedCaseIndex],
      [selectedCaseIndex]
    );
    const selectedBand = useMemo(
      () => bandCases[selectedBandIndex],
      [selectedBandIndex]
    );
    const selectedScale = useMemo(
      () => sizeIconChildOptions[selectedSizeIndex].scaleClass,
      [selectedSizeIndex]
    );
  
    const buttonsData = [
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
        dataAutom: "bands",
        options: bandIconChildOptions,
        handleClick: () => handleModeChange("band"),
      },
    ];
  
    const handleModeChange = (newMode) => {
      setMode(newMode);
      // setIsAnimating(true); // Start animation
      // setTimeout(() => {
      //   setMode(newMode);
      //   setIsAnimating(false); // End animation after transition
      // }, 300); // Duration matches CSS transition time
    };
  
    const getScrollerData = () => {
      return mode === "case"
        ? {
            items: watchCases,
            ariaLabel: "Choose your watch case",
            imageClass: "rf-designstudio-caseimage",
            selectedIndex: selectedCaseIndex,
            setSelectedIndex: setSelectedCaseIndex,
          }
        : mode === "band"
        ? {
            items: bandCases,
            ariaLabel: "Choose your watch band",
            imageClass: "rf-designstudio-bandsimage",
            selectedIndex: selectedBandIndex,
            setSelectedIndex: setSelectedBandIndex,
          }
        : {
            items: sizeIconChildOptions,
            ariaLabel: "Choose your size",
            imageClass: "rf-designstudio-bandsimage",
            selectedIndex: selectedSizeIndex,
            setSelectedIndex: setSelectedSizeIndex,
          };
    };
  
    const scrollerData = getScrollerData();
  
    const handleScroll = () => {
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
    };
  
    React.useEffect(() => {
      const scroller = scrollerRef.current;
      if (scroller) {
        scroller.addEventListener("scroll", handleScroll);
        return () => scroller.removeEventListener("scroll", handleScroll);
      }
    }, [mode, scrollerData]);
  
    // Scroll into view when mode changes or selected index changes
    React.useEffect(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
  
      const items = scroller.querySelectorAll("[data-core-scroller-item]");
      const selectedIndex = scrollerData.selectedIndex;
  
      if (items[selectedIndex]) {
        items[selectedIndex].scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }, [mode]);
  
    return (
      <div
        // key={mode} // Forces a re-render for fade effect
        className={`relative transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Scroller */}
        <div className="rf-designstudio-scroller-crop">
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
                            className={`rf-designstudio-bottomimage ${scrollerData.imageClass} ${selectedScale}`}
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
        </div>
  
        {/* Static display */}
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
              } ${selectedScale} `}
              aria-hidden="true"
              width="500"
              height="500"
              src={mode === "case" ? selectedBand.src : selectedCase.src}
            />
          </div>
        )}
  
        <ProductInfo />
        <SelectionButtons buttonsData={buttonsData} />
      </div>
    );
  }
  