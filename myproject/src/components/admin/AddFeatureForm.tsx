'use client';
import React, { useState } from 'react';
import { Eye, PlusIcon, X } from 'lucide-react';

interface FormField {
  Heading: string;
  subHeadings: string[];
}

interface AddFeatureFormProps {
  formValues: FormField[];
  setFormValues: React.Dispatch<React.SetStateAction<FormField[]>>;
}

function AddFeatureForm({ formValues, setFormValues }: AddFeatureFormProps) {
  const [preview, setPreview] = useState(false);

  function handlePreview(){
    setPreview(!preview)
  }
  function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const newFormValues = [...formValues];

    if (name === 'Heading') {
      newFormValues[index].Heading = value;
    } else if (name === 'subHeadings') {
      newFormValues[index].subHeadings = value.split(',').map((item) => item.trim());
    }

    setFormValues(newFormValues);
  }

  function removeFormFields(index: number) {
    const newFormValues = [...formValues];
    newFormValues.splice(index, 1);
    setFormValues(newFormValues);
  }

  function addFormFields() {
    setFormValues([...formValues, { Heading: '', subHeadings: [''] }]);
  }

  return (
    <div>
      {formValues.map((element, index) => (
        <div key={index} className=" mb-4 flex-col md:flex-row flex gap-4 w-full items-start md:items-center rounded">
          
          <div className='flex gap-2 w-full'>
          <div className="flex flex-col w-[30%] gap-2">
            <label>Heading</label>
            <input
              type="text"
              name="Heading"
              value={element.Heading}
              placeholder="Enter the feature heading"
              className=" mb-3 px-2 py-1 bg-transparent border rounded-sm"
              onChange={(e) => handleChange(index, e)}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label>SubHeadings</label>
            <input
              type="text"
              name="subHeadings"
              value={element.subHeadings.join(',')}
              placeholder="Enter the subheadings in commas (Ex-> Marketing,supply&Management)"
              className=" mb-3 bg-transparent py-1 px-2 border w-full rounded-sm"
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          </div>
          {index > 0 && (
            <button
              type="button"
              className="ml-0 md:ml-4  md:mt-4 px-3 py-1 text-white bg-red-500 rounded"
              onClick={() => removeFormFields(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <div className="button-section">
        <button
          type="button"
          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={addFormFields}
        >
          <PlusIcon className="inline-block mr-1" size={16} />
          Add Section
        </button>
        <button
  type="button" // Ensure it does not trigger a form submission
  onClick={handlePreview}
  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
>
  Preview
</button>

      </div>

      {preview && <PreviewModal formValues={formValues} onClose={handlePreview} />}
    </div>
  );
}

// Modal Component
function PreviewModal({ formValues, onClose }: { formValues: FormField[]; onClose: () => void }) {
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 min-h-0   md:h-full  flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[95%] md:min-w-[50%] h-[90%] md:h-[95%] overflow-y-scroll max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black"> Preview</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-black">
          {formValues.map((field, index) => (
            <div key={index} className="p-3 border rounded">
              <h3 className="font-semibold">{field.Heading}</h3>
              <ul className="list-disc pl-5">
                {field.subHeadings.map((sub, i) => (
                  <li key={i}>{sub}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <div
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Close
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFeatureForm;
