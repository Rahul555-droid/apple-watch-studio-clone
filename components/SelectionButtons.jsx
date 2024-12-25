import { useState } from 'react'

function FilterButton({ icon, label, dataAutom, options, handleClick }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    if (handleClick) {
      handleClick()
    }
  }

  return (
    <div
      className={`button button-secondary-alpha rf-designstudio-filter typography-body button-elevated ${
        isExpanded ? 'rf-designstudio-filter-expanded' : ''
      }`}
    >
      <div
        className="rf-designstudio-filter-icon"
        aria-hidden="true"
        onClick={toggleExpand}
      >
        {icon}
      </div>
      <button
        className="button button-secondary-alpha rf-designstudio-filter-header typography-body button-elevated"
        data-autom={dataAutom}
        type="button"
        onClick={toggleExpand}
      >
        {label}
      </button>
      {isExpanded && options && (
        <fieldset className="rf-designstudio-filterdim">
          <legend className="a11y">{label}</legend>
          <ul
            className="rf-designstudio-filterdim-options"
            data-autom="filterDimOptions"
          >
            {options.map((option, index) => (
              <li key={index}>
                <input
                  type="radio"
                  id={`rf-designstudio-filterdim-${dataAutom}-${option.value}`}
                  name={`rf-designstudio-filterdim-${dataAutom}`}
                  value={option.value}
                />
                <label
                  htmlFor={`rf-designstudio-filterdim-${dataAutom}-${option.value}`}
                  className={`rf-designstudio-filterdim-label ${
                    option.selected ? 'rf-designstudio-filterdim-selected' : ''
                  }`}
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
  )
}

export default function SelectionButtons({ buttonsData = [] }) {
  return (
    <div className="rf-designstudio-filters rf-designstudio-filters-scroll">
      <div
        aria-hidden="false"
        role="group"
        aria-label="Choose a watch feature to customize"
        className="flex justify-center items-center"
      >
        {buttonsData.map((button, index) => (
          <FilterButton
            key={index}
            icon={button.icon}
            label={button.label}
            dataAutom={button.dataAutom}
            options={button.options}
            handleClick={button.handleClick}
          />
        ))}
      </div>
    </div>
  )
}
