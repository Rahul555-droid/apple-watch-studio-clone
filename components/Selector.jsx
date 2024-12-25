"use client";
import CollectionsDropdown from "@/components/CollectionsDropdown";
import DynamicScrollerGrid from "@/components/DynamicScrollerGrid";
import PrevNextButton from "@/components/PrevNextButton";
import {
  collections
} from "@/constants";
import { useState } from "react";

function Selector() {
  const [showOtherCollections, setShowOtherCollections] = useState(false);

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
                  Collections v{" "}
                  <span className="visuallyhidden">Apple Watch</span>
                  <span className="icon icon-after icon-chevrondown"></span>
                </div>
              </button>

              <button
                className={`px-4 py-2 rounded-3xl bg-blue-500 text-white`}
                onClick={() => alert("save")}
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
  );
}

export default Selector;
