import React from 'react'

function CollectionsDropdown({ collections = [], handleClose = () => {} }) {
  return (
    <div
      data-core-fade-transition-wrapper=""
      className="rc-overlay rf-designstudio-csoverlay rc-overlay-popup rc-overlay-fixed-width rc-overlay-content-nopadding rc-overlay-no-close-button r-fade-transition-enter-done"
      data-core-overlay=""
      data-core-overlay-cover=""
      onClick={handleClose}
    >
      <div
        data-core-overlay-content=""
        tabindex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="rc-overlay-popup-outer">
          <div className="rc-overlay-popup-content">
            <div>
              <ul
                className="rc-menu-items rf-designstudio-collections"
                aria-label="Choose a collection"
                data-autom="collectionList"
              >
                {collections.map((collection, index) => (
                  <li key={index} className="">
                    <button
                      type="button"
                      data-index={index}
                      className="rc-menu-item rf-designstudio-collection typography-body"
                      data-autom={collection}
                    >
                      {collection}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionsDropdown
