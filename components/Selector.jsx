"use client";
import CollectionsDropdown from "@/components/CollectionsDropdown";
import DynamicScrollerGrid from "@/components/DynamicScrollerGrid";
import { collections } from "@/constants";
import debounce from "lodash.debounce"; // Import debounce from lodash
import { useCallback, useEffect, useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { getParamFromURL, updateURLWithParams } from "../utils";
import ShareModal from "./ShareModal";
import useIsClient from "../hooks/useIsClient";

function Selector() {
  const isClient = useIsClient(); // Check if we are on the client-side

  const [showOtherCollections, setShowOtherCollections] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state

  // Fetch and decode parameters from URL
  const [currentCollectionIndex, setCurrentCollectionIndex] = useState(
    isClient ? getParamFromURL("collection", 0) : 0
  );
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(
    isClient ? getParamFromURL("case", 0) : 0
  );
  const [selectedBandIndex, setSelectedBandIndex] = useState(
    isClient ? getParamFromURL("band", 0) : 0
  );
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(
    isClient ? getParamFromURL("size", 1) : 0
  );
  const [mode, setMode] = useState(
    isClient ? getParamFromURL("mode", "case") : 0
  );

  const [currentCollectionlabel, currentCollectionOptions] = useMemo(
    () => [
      collections[currentCollectionIndex]?.label || "",
      collections[currentCollectionIndex]?.options || null,
    ],
    [currentCollectionIndex]
  );

  const handleCollectionClick = (event) => {
    const index = event.currentTarget.getAttribute("data-index");
    setSelectedBandIndex(0);
    setSelectedCaseIndex(0);
    setMode("case");
    setCurrentCollectionIndex(index);
  };

  // Create a debounced version of updateURLWithParams
  const debouncedUpdateURL = useCallback(
    debounce((params) => {
      updateURLWithParams(params);
    }, 500), // 500ms debounce delay (adjust as needed)
    []
  );

  // Sync state to URL with Base64 encoding on state changes (debounced)
  useEffect(() => {
    if (!isClient) return;
    const params = {
      collection: currentCollectionIndex,
      case: selectedCaseIndex,
      band: selectedBandIndex,
      size: selectedSizeIndex,
      mode: mode,
    };

    debouncedUpdateURL(params); // Call the debounced URL update function
  }, [
    currentCollectionIndex,
    selectedCaseIndex,
    selectedBandIndex,
    selectedSizeIndex,
    mode,
    debouncedUpdateURL,
    isClient,
  ]);

  return (
    <>
      {showOtherCollections && (
        <CollectionsDropdown
          collections={collections}
          handleClose={() => setShowOtherCollections(false)}
          handleClick={handleCollectionClick}
          currentCollectionIndex={currentCollectionIndex}
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
                  className="rf-designstudio-collectionlbl typography-body ml-20"
                  data-autom="Collections"
                  onClick={setShowOtherCollections}
                >
                  Collections
                  <FiChevronDown
                    style={{ display: "inline", verticalAlign: "middle" }}
                  />
                </div>
              </button>

              <button
                className={`px-4 py-2 rounded-3xl bg-blue-500 text-white`}
                onClick={() => setShowModal(true)}
              >
                Save
              </button>
            </div>

            <DynamicScrollerGrid
              bandCases={currentCollectionOptions.bandCases}
              watchCases={currentCollectionOptions.watchCases}
              bandIconChildOptions={
                currentCollectionOptions.bandIconChildOptions
              }
              caseIconChildOptions={
                currentCollectionOptions.caseIconChildOptions
              }
              //had to send as props and didn't want to use redux or context in a small project
              {...{
                selectedCaseIndex,
                setSelectedCaseIndex,
                selectedBandIndex,
                setSelectedBandIndex,
                selectedSizeIndex,
                setSelectedSizeIndex,
                mode,
                setMode,
                currentCollectionlabel,
              }}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && <ShareModal setShowModal={setShowModal} />}
    </>
  );
}

export default Selector;
