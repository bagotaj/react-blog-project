import React, { useState, useRef } from 'react';

import InputField from './InputField';
import TextareaField from './TextareaField';
import InputSelect from './InputSelect';

import validator from 'validator';

import db from '../firebase/db';

export default function AddNewPost({ options }) {
  const [fieldValues, setFieldValues] = useState({
    title: '',
    content: '',
    email: '',
    category: '',
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

  const references = {
    title: useRef(),
    content: useRef(),
    email: useRef(),
    category: useRef(),
  };

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    email: '',
    category: '',
  });

  const validators = {
    title: {
      required: isNotEmpty,
    },
    content: {
      required: isNotEmpty,
    },
    email: {
      required: isNotEmpty,
      isEmail: isValidEmail,
    },
    category: {
      required: isNotEmpty,
    },
  };

  function isNotEmpty(value) {
    return value !== '';
  }

  function isValidEmail(value) {
    return validator.isEmail(value);
  }

  const errorTypes = {
    required: 'Missing value',
    isEmail: 'Specify a valid email address',
  };

  function isFormValid() {
    let isFormValid = true;
    for (const fieldName of Object.keys(fieldValues)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isFormValid = false;
      }
    }
    return isFormValid;
  }

  function validateField(fieldName) {
    const value = fieldValues[fieldName];
    let isValid = true;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: '',
    }));

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = errorTypes[validationType];
            setErrors((previousErrors) => {
              return {
                ...previousErrors,
                [fieldName]: errorText,
              };
            });
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  }

  function handleInputChange(e) {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFieldValues({
      ...fieldValues,
      [fieldName]: value,
    });
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: '',
    }));
  }

  function handleInputBlur(e) {
    const name = e.target.name;
    validateField(name);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isValid = isFormValid();

    if (isValid) {
      db.collection('blogs')
        .add({
          title: fieldValues.title,
          content: fieldValues.content,
          category: fieldValues.category,
          timestamp: new Date(),
        })
        .then((docRef) => {
          setFieldValues({
            title: '',
            content: '',
            category: '',
            email: '',
          });
          setFormAlertText('Successful saving');
          setFormAlertType('success');
        });
    } else {
      setFormAlertText('Unsuccessful saving');
      setFormAlertType('danger');
    }
  }

  return (
    <div className="row my-3">
      <h1>Add new post</h1>
      <form
        onSubmit={handleSubmit}
        noValidate={true}
        className={`needs-validation ${
          formWasValidated ? 'was-validated' : ''
        }`}
      >
        <InputField
          reference={references.title}
          name="title"
          labelText="Title"
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required={true}
        />
        <TextareaField
          reference={references.content}
          name="content"
          labelText="Content"
          rows="3"
          cols="30"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required={true}
        />
        <InputField
          reference={references.email}
          name="email"
          labelText="Email address"
          type="email"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required={true}
        />
        <InputSelect
          reference={references.category}
          options={options}
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          name="category"
          labelText="Categories"
          required={true}
        />
        {formAlertText && (
          <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
            {formAlertText}
          </div>
        )}
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
