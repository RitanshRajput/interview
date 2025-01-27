import React, { useState } from "react";

const fieldTypes = ["text", "number", "dropdown"];

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [previewData, setPreviewData] = useState({});
  const [errors, setErrors] = useState([]);

  const handleAddField = (type) => {
    const newField = {
      id: Date.now(),
      label: "",
      type,
      required: false,
      maxLength: "",
      minValue: "",
      maxValue: "",
      options: [],
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleFieldChange = (id, key, value) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  };

  const handlePreviewChange = (id, value) => {
    setPreviewData((prevPreviewData) => ({
      ...prevPreviewData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    const validationErrors = [];

    fields.forEach((field) => {
      const value = previewData[field.id];
      if (field.required && !value) {
        validationErrors.push(`${field.label || "Field"} is required!`);
      }

      if (field.type === "number") {
        const numericValue = parseFloat(value);
        if (field.minValue && numericValue < parseFloat(field.minValue)) {
          validationErrors.push(`${field.label || "Field"} is below the minimum value`);
        }
        if (field.maxValue && numericValue > parseFloat(field.maxValue)) {
          validationErrors.push(`${field.label || "Field"} exceeds the maximum value`);
        }
      }
    });

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      alert("Form Submitted successfully!");
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-6">
        <h2 className="text-xl font-semibold mb-4">Form Builder</h2>
        {fieldTypes.map((type) => (
          <button
            key={type}
            className="bg-blue-400 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => handleAddField(type)}
          >
            Add {type} Field
          </button>
        ))}
        {fields.map((field) => (
          <div key={field.id} className="mb-6">
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Field Label"
              value={field.label || ""}
              onChange={(e) => handleFieldChange(field.id, "label", e.target.value)}
            />
            <div className="flex space-x-4">
              <label>
                <input
                  type="checkbox"
                  checked={field.required || false}
                  onChange={(e) => handleFieldChange(field.id, "required", e.target.checked)}
                />
                Required
              </label>
              {field.type === "text" && (
                <input
                  type="number"
                  className="border p-2"
                  placeholder="Max Length"
                  value={field.maxLength || ""}
                  onChange={(e) => handleFieldChange(field.id, "maxLength", e.target.value)}
                />
              )}
              {field.type === "number" && (
                <>
                  <input
                    type="number"
                    className="border p-2"
                    placeholder="Min Value"
                    value={field.minValue || ""}
                    onChange={(e) => handleFieldChange(field.id, "minValue", e.target.value)}
                  />
                  <input
                    type="number"
                    className="border p-2"
                    placeholder="Max Value"
                    value={field.maxValue || ""}
                    onChange={(e) => handleFieldChange(field.id, "maxValue", e.target.value)}
                  />
                </>
              )}
            </div>
            {field.type === "dropdown" && (
              <div>
                <input
                  type="text"
                  placeholder="Add option"
                  className="border p-2 w-full mt-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      handleFieldChange(field.id, "options", [
                        ...field.options,
                        e.target.value.trim(),
                      ]);
                      e.target.value = "";
                    }
                  }}
                />
                <div>
                  {field.options.map((option, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{option}</span>
                      <button
                        onClick={() =>
                          handleFieldChange(
                            field.id,
                            "options",
                            field.options.filter((opt) => opt !== option)
                          )
                        }
                        className="text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button className="text-red-500 mt-2" onClick={() => handleRemoveField(field.id)}>
              Remove Field
            </button>
          </div>
        ))}
        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
          Submit
        </button>
        {errors.length > 0 && (
          <div className="mt-4 text-red-500">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="w-1/2 p-6 border-l">
        <h2 className="text-xl font-semibold mb-4">Form Preview</h2>
        {fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block mb-2">{field.label}</label>
            {field.type === "text" && (
              <input
                type="text"
                value={previewData[field.id] || ""}
                onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                className="border p-2 w-full"
                placeholder={field.label}
              />
            )}
            {field.type === "number" && (
              <input
                type="number"
                value={previewData[field.id] || ""}
                onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                className="border p-2 w-full"
                placeholder={field.label}
              />
            )}
            {field.type === "dropdown" && (
              <select
                value={previewData[field.id] || ""}
                onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">Select an option</option>
                {field.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;
