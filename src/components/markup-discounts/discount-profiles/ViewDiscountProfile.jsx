import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileForm from '../common/ProfileForm';
import useProfileData from '../hooks/useProfileData';
import useParameters from '../hooks/useParameters';
import { fetchDiscountProfileById } from '../services/DiscountProfileService';

const ViewDiscountProfile = () => {
  const { id } = useParams(); // e.g., /markup-profiles/:id/view or /discount-profiles/:id/view
  const navigate = useNavigate();
  const { formData, setFormData,rawRules, loading, error } = useProfileData('discount', id);
  const { parameters, loadingParameters, parametersError, loadParameterOptions } = useParameters(formData?.product_type);

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
  }, [id,  parameters, setFormData, navigate]);

  // Dummy handlers for read-only mode (no changes allowed)
  const handleChange = () => {};
  const handleCheckboxChange = () => {};
  const handleDateRangeChange = () => {};
  const handleRuleChange = () => {};
  const handleRuleDateRangeChange = () => {};
  const handleRuleRangeChange = () => {};
  const handleRuleMultiSelectChange = () => {};
  const handleParameterSelect = () => {};
  const addRule = () => {};
  const removeRule = () => {};
  const handleSubmit = () => {};

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!formData) return <p>No profile data found</p>;

  return (
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
      addRule={addRule}
      removeRule={removeRule}
      handleSubmit={handleSubmit}
      handleParameterSelect={handleParameterSelect}
      loadParameterOptions={loadParameterOptions}
      profileType={'discount'}
      isEditMode={false}
      readOnly={true}
    />
  );
};

export default ViewDiscountProfile;