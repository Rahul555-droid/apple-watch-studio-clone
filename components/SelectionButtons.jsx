import FilterButton from "./FilterButton";

export default function SelectionButtons({
  buttonsData = [],
  className = "",
  changeIndex = () => {},
}) {
  return (
    <div
      className={`rf-designstudio-filters rf-designstudio-filters-scroll ${className}`}
    >
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
            isActive={button.isActive}
            changeIndex={changeIndex}
          />
        ))}
      </div>
    </div>
  );
}
