// src/hooks/useFormValidation.js
import { useState, useEffect } from 'react';

const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};

    if (!formData.name) {
      errors.name = 'Full Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.topic) {
      errors.topic = 'Survey Topic is required';
    }

    if (formData.topic === 'technology') {
      if (!formData.progrmmingLanguage) {
        errors.progrmmingLanguage = 'Favorite Programming Language is required';
      }
      if (!formData.yearOfExperience) {
        errors.yearOfExperience = 'Years of Experience is required';
      }
    }

    if (formData.topic === 'health') {
      if (!formData.exerciseFrequency) {
        errors.exerciseFrequency = 'Exercise Frequency is required';
      }
      if (!formData.dietPreference) {
        errors.dietPreference = 'Diet Preference is required';
      }
    }

    if (formData.topic === 'education') {
      if (!formData.qualification) {
        errors.qualification = 'Highest Qualification is required';
      }
      if (!formData.fielOfStudy) {
        errors.fielOfStudy = 'Field of Study is required';
      }
    }

    if (!formData.feedBack) {
      errors.feedBack = 'Feedback is required';
    } else if (formData.feedBack.length < 50) {
      errors.feedBack = 'Feedback must be at least 50 characters long';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return [errors, validate];
};

export default useFormValidation;
