// src/components/CheckboxGroup.jsx
import React from "react";
import "../styles/CheckboxGroup.css";

const CheckboxGroup = ({ label, name, options, values, onChange, error }) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onChange({
        target: {
          name,
          value: [...values, value],
        },
      });
    } else {
      onChange({
        target: {
          name,
          value: values.filter((v) => v !== value),
        },
      });
    }
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="checkbox-group">
        {options.map((option) => (
          <label key={option} className="checkbox-label">
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={values.includes(option)}
              onChange={handleCheckboxChange}
            />
            {option}
          </label>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
