/* eslint-disable react/prop-types */
const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
  placeholder,
  readOnly = false,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          id={name}
          name={name}
          className="form-textarea"
          defaultValue={defaultValue || ""}
          required
        />
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          id={name}
          name={name}
          className="form-input"
          defaultValue={defaultValue || ""}
          onChange={onChange}
          required
          readOnly={readOnly}
        />
      )}
    </div>
  );
};
export default FormRow;
