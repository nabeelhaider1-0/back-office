import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header2 from '../../header2/header2';
import ProfileForm from '../common/ProfileForm';
import useProfileData from '../hooks/useProfileData';
import useParameters from '../hooks/useParameters';
import useProfileLogic from '../hooks/useProfileLogic';
import { useNavigate } from 'react-router-dom';

const EditDiscountProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formData, setFormData, rawRules, loading, error } = useProfileData('discount', id);
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
  } = useProfileLogic(formData, setFormData, parameters, 'discount', true, id, navigate);

  useEffect(() => {
    if (formData && parameters.length > 0 && rawRules.length > 0) {
      const updatedRules = rawRules.map((rule) => {
        const param = parameters.find((p) => p.name === rule.parameter_name);
        let value = rule.parameter_value;
        if (param?.type === 'number' && typeof value === 'string') {
          value = value;
        } else if (param?.type === 'multiselect' && typeof value === 'string') {
          value = value.split(',').map((v) => v.trim());
        }
        return {
          parameterUuid: param?.uuid || '',
          value,
        };
      });
      setFormData((prev) => ({ ...prev, rules: updatedRules }));
    }
  }, [parameters, rawRules, setFormData]);

  if (loading || !formData) return <p>Loading profile...</p>;
  if (error) return null;

  return (
    <>
      <Header2 title="EDIT DISCOUNT PROFILE" linkText1="Discount Profiles" linkText2="Edit Profile" />
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
        isEditMode={true}
      />
    </>
  );
};

export default EditDiscountProfile;