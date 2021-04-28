export default function ItemSelect({
  options,
  errors,
  fieldValues,
  handleInputChange,
  handleInputBlur,
  name,
  required,
  reference,
  labelText,
}) {
  return (
    <div className={`mb-3 ${errors[name] !== '' ? 'was-validated' : ''}`}>
      <label className={'form-label m-2'} htmlFor={name}>
        {labelText}
      </label>
      <select
        className={'form-select m-2'}
        name={name}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={fieldValues[name]}
        ref={reference}
        id={name}
        required={required}
      >
        <option value={''}>Válassz!</option>
        {options.map((value, i) => (
          <option key={value.value + i} value={value.value}>
            {value.value}
          </option>
        ))}
      </select>
      <div className="invalid-feedback mx-2">{errors[name]}</div>
    </div>
  );
}
