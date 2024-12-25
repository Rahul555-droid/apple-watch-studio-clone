function CollectionsDropdown({
  collections = [],
  handleClose = () => {},
  handleClick = () => {},
  currentCollectionIndex
}) {

  return (
    <div
      data-core-fade-transition-wrapper=""
      className="rc-overlay rf-designstudio-csoverlay rc-overlay-popup rc-overlay-fixed-width rc-overlay-content-nopadding rc-overlay-no-close-button r-fade-transition-enter-done"
      data-core-overlay=""
      data-core-overlay-cover=""
      onClick={handleClose}
    >
      <div data-core-overlay-content="" tabIndex="-1" aria-modal="true">
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
                      className={`rc-menu-item rf-designstudio-collection typography-body ${currentCollectionIndex == index ? '!text-gray-500' : ''} `}
                      data-autom={collection}
                      onClick={handleClick}
                    >
                      {collection.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionsDropdown;
