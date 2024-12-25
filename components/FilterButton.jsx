import { useState } from "react";

export default function FilterButton({
  icon,
  label,
  dataAutom,
  options,
  handleClick,
  isActive,
  changeIndex,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastClicked, setLastClicked] = useState(null); // Track last clicked option

  const toggleExpand = () => {
    if (!isExpanded) setIsExpanded(true);

    if (handleClick && typeof handleClick === "function") {
      handleClick();
    }
  };

  const handleClickExpanded = (event) => {
    const index = event.currentTarget.getAttribute("data-value");
    event.stopPropagation();
    event.preventDefault();

    if (changeIndex && typeof changeIndex === "function") {
      changeIndex(index);
    }
    setLastClicked(index);
  };

  return (
    <div
      className={`button !flex items-center button-secondary-alpha rf-designstudio-filter typography-body button-elevated ${
        isExpanded && isActive ? "rf-designstudio-filter-expanded" : ""
      }`}
      onClick={toggleExpand}
    >
      <div className="rf-designstudio-filter-icon" aria-hidden="true">
        {icon}
      </div>
      <button
        className="button button-secondary-alpha rf-designstudio-filter-header typography-body button-elevated"
        data-autom={dataAutom}
        type="button"
      >
        {label}
      </button>
      {isExpanded && options && isActive && (
        <fieldset className="rf-designstudio-filterdim">
          <legend className="a11y">{label}</legend>
          <ul
            className="rf-designstudio-filterdim-options"
            data-autom="filterDimOptions"
          >
            {options.map((option, index) => (
              <li
                key={index}
                data-value={option.value}
                onClick={handleClickExpanded}
              >
                <input
                  type="radio"
                  id={`rf-designstudio-filterdim-${dataAutom}-${option.value}`}
                  name={`rf-designstudio-filterdim-${dataAutom}`}
                  value={option.value}
                />
                <label
                  htmlFor={`rf-designstudio-filterdim-${dataAutom}-${option.value}`}
                  className={`rf-designstudio-filterdim-label ${
                    option.selected ? "rf-designstudio-filterdim-selected" : ""
                  }
                    ${lastClicked === option.value ? 'font-bold' : ""}
                    `}
                  data-autom={`${dataAutom}-${index + 1}`}
                >
                  <span>{option.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      )}
    </div>
  );
}
