/* eslint-disable react/prop-types */
const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
  disable = false,
  required = false,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disable}
        required={required}
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
