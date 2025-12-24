import React from 'react';
import Header2 from '../../header2/header2';
import ProfileForm from '../common/ProfileForm';
import useProfileData from '../hooks/useProfileData';
import useParameters from '../hooks/useParameters';
import useProfileLogic from '../hooks/useProfileLogic';
import { useNavigate } from 'react-router-dom';

const AddDiscountProfile = () => {
  const navigate = useNavigate();
  const { formData, setFormData, loading } = useProfileData('discount');
  const { parameters, setParameters, loadingParameters, parametersError, loadParameterOptions } = useParameters(formData?.product_type);
  const {
    handleChange,
    handleCheckboxChange,
    handleDateRangeChange,
    handleRuleChange,
    handleRuleDateRangeChange,
    handleRuleRangeChange,
    handleRuleMultiSelectChange,
    handleParameterSelect,
    addRule,
    removeRule,
    handleSubmit,
  } = useProfileLogic(formData, setFormData, parameters, 'discount', false, null, navigate);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Header2 title="ADD DISCOUNT PROFILE" linkText1="Discount Profiles" linkText2="Add Profile" />
      <ProfileForm
        formData={formData}
        parameters={parameters}
        loadingParameters={loadingParameters}
        parametersError={parametersError}
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
        handleDateRangeChange={handleDateRangeChange}
        handleRuleChange={handleRuleChange}
        handleRuleDateRangeChange={handleRuleDateRangeChange}
        handleRuleRangeChange={handleRuleRangeChange}
        handleRuleMultiSelectChange={handleRuleMultiSelectChange}
        handleParameterSelect={handleParameterSelect}
        addRule={addRule}
        removeRule={removeRule}
        handleSubmit={handleSubmit}
        loadParameterOptions={loadParameterOptions}
        profileType="discount"
        isEditMode={false}
      />
    </>
  );
};

export default AddDiscountProfile;