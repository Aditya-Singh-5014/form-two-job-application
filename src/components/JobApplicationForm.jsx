// src/components/JobApplicationForm.jsx
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaLink,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useForm from "../hooks/useForm";
import FormField from "./FormField";
import CheckboxGroup from "./CheckBoxGroup";
import Modal from "./Modal";
import "../styles/JobApplicationForm.css";

const JobApplicationForm = () => {
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioUrl: "",
    managementExperience: "",
    additionalSkills: [],
    interviewTime: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.fullName) errors.fullName = "Full Name is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email must be a valid email address";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (isNaN(values.phoneNumber)) {
      errors.phoneNumber = "Phone Number must be a valid number";
    }
    if (
      (values.position === "Developer" || values.position === "Designer") &&
      !values.relevantExperience
    ) {
      errors.relevantExperience = "Relevant Experience is required";
    } else if (values.relevantExperience <= 0) {
      errors.relevantExperience = "Relevant Experience must be greater than 0";
    }
    if (values.position === "Designer" && !values.portfolioUrl) {
      errors.portfolioUrl = "Portfolio URL is required";
    } else if (
      values.portfolioUrl &&
      !/^https?:\/\/\S+$/.test(values.portfolioUrl)
    ) {
      errors.portfolioUrl = "Portfolio URL must be a valid URL";
    }
    if (values.position === "Manager" && !values.managementExperience) {
      errors.managementExperience = "Management Experience is required";
    }
    if (values.additionalSkills.length === 0) {
      errors.additionalSkills = "At least one skill must be selected";
    }
    if (!values.interviewTime) {
      errors.interviewTime = "Preferred Interview Time is required";
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate
  );

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    handleSubmit(e);
    setSubmitted(true);
  };

  const closeModal = () => {
    setSubmitted(false);
  };

  return (
    <div className="form-container">
      <h1>Job Application Form</h1>
      <form onSubmit={onSubmit}>
        <FormField
          label="Full Name *"
          type="text"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          icon={<FaUser />}
        />
        <FormField
          label="Email *"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          icon={<FaEnvelope />}
        />
        <FormField
          label="Phone Number *"
          type="text"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          icon={<FaPhone />}
        />
        <div className="form-group">
          <label>Applying for Position *</label>
          <div className="input-container select-container">
            <FaBriefcase className="icon" />
            <select
              name="position"
              value={values.position}
              onChange={handleChange}
            >
              <option value="">Select a position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </div>
        {(values.position === "Developer" ||
          values.position === "Designer") && (
          <FormField
            label="Relevant Experience (Years) *"
            type="number"
            name="relevantExperience"
            value={values.relevantExperience}
            onChange={handleChange}
            error={errors.relevantExperience}
            icon={<FaClock />}
          />
        )}
        {values.position === "Designer" && (
          <FormField
            label="Portfolio URL *"
            type="text"
            name="portfolioUrl"
            value={values.portfolioUrl}
            onChange={handleChange}
            error={errors.portfolioUrl}
            icon={<FaLink />}
          />
        )}
        {values.position === "Manager" && (
          <FormField
            label="Management Experience *"
            type="text"
            name="managementExperience"
            value={values.managementExperience}
            onChange={handleChange}
            error={errors.managementExperience}
            icon={<FaBriefcase />}
          />
        )}
        <CheckboxGroup
          label="Additional Skills *"
          name="additionalSkills"
          options={["JavaScript", "CSS", "Python", "React", "Node.js"]}
          values={values.additionalSkills}
          onChange={handleChange}
          error={errors.additionalSkills}
        />
        <FormField
          label="Preferred Interview Time *"
          type="datetime-local"
          name="interviewTime"
          value={values.interviewTime}
          onChange={handleChange}
          error={errors.interviewTime}
          icon={<FaClock />}
        />
        <motion.button whileTap={{ scale: 0.95 }} type="submit">
          Submit
        </motion.button>
      </form>
      {submitted && Object.keys(errors).length === 0 && (
        <Modal onClose={closeModal}>
          <h2>Submitted Data</h2>
          <p>Full Name: {values.fullName}</p>
          <p>Email: {values.email}</p>
          <p>Phone Number: {values.phoneNumber}</p>
          <p>Applying for Position: {values.position}</p>
          {(values.position === "Developer" ||
            values.position === "Designer") && (
            <p>Relevant Experience: {values.relevantExperience} years</p>
          )}
          {values.position === "Designer" && (
            <p>Portfolio URL: {values.portfolioUrl}</p>
          )}
          {values.position === "Manager" && (
            <p>Management Experience: {values.managementExperience}</p>
          )}
          <p>Additional Skills: {values.additionalSkills.join(", ")}</p>
          <p>Preferred Interview Time: {values.interviewTime}</p>
        </Modal>
      )}
    </div>
  );
};

export default JobApplicationForm;
