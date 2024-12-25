"use client";
import CollectionsDropdown from "@/components/CollectionsDropdown";
import DynamicScrollerGrid from "@/components/DynamicScrollerGrid";
import ShareModal from "./ShareModal";
import { collections } from "@/constants";
import { useEffect, useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

//params should be stored on top anyways even when manually scrolling

// useEffect(() => {
//   const params = new URLSearchParams(window.location.search);
//   setCurrentCollectionIndex(Number(params.get("collection")) || 0);
//   setSelectedCaseIndex(Number(params.get("caseIndex")) || 0);
//   setSelectedBandIndex(Number(params.get("bandIndex")) || 0);
//   setSelectedSizeIndex(Number(params.get("sizeIndex")) || 1);
//   setMode(params.get("mode") || "case");
// }, []);

function Selector() {
  const params = new URLSearchParams(window.location.search);

  const [showOtherCollections, setShowOtherCollections] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state

  const [currentCollectionIndex, setCurrentCollectionIndex] = useState(
    Number(params.get("collection")) || 0
  );
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(
    Number(params.get("caseIndex")) || 0
  );
  const [selectedBandIndex, setSelectedBandIndex] = useState(
    Number(params.get("bandIndex")) || 0
  );
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(
    Number(params.get("sizeIndex"))
  ); //at 46mm
  const [mode, setMode] = useState(params.get("mode") || "case"); // 'case', 'band', or 'size'

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

  // Sync state to URL on state changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("collection", currentCollectionIndex);
    url.searchParams.set("caseIndex", selectedCaseIndex);
    url.searchParams.set("bandIndex", selectedBandIndex);
    url.searchParams.set("sizeIndex", selectedSizeIndex);
    url.searchParams.set("mode", mode);
    window.history.replaceState(null, "", url.toString());
  }, [
    currentCollectionIndex,
    selectedCaseIndex,
    selectedBandIndex,
    selectedSizeIndex,
    mode,
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
