import { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { createMarkupProfile, updateMarkupProfile } from '../services/MarkupProfileService';
import { createDiscountProfile, updateDiscountProfile } from '../services/DiscountProfileService';

const useProfileLogic = (formData, setFormData, parameters, profileType, isEditMode, id, navigate) => {
  const handleChange = (key, value) => {
    console.log(`handleChange called with key: ${key}, value: ${value}`);
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (key, e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  const handleDateRangeChange = (key, date) => {
    setFormData((prev) => ({
      ...prev,
      availability_dates: {
        ...prev.availability_dates,
        [key]: date? date : '',
      },
    }));
  };

  const handleRuleChange = (index, key, value) => {
    const updatedRules = [...formData.rules];
    updatedRules[index] = { ...updatedRules[index], [key]: value };
    setFormData((prev) => ({ ...prev, rules: updatedRules }));
  };

  const handleRuleDateRangeChange = (ruleIndex, key, date) => {
    const updatedRules = [...formData.rules];
    if (!updatedRules[ruleIndex].value || typeof updatedRules[ruleIndex].value !== 'object') {
      updatedRules[ruleIndex].value = { from_date: '', to_date: '' };
    }
    updatedRules[ruleIndex].value = {
      ...updatedRules[ruleIndex].value,
      [key]: date ? date : '',
    };
    setFormData((prev) => ({ ...prev, rules: updatedRules }));
  };

  const handleRuleRangeChange = (ruleIndex, key, value) => {
    const updatedRules = [...formData.rules];
    if (!updatedRules[ruleIndex].value || typeof updatedRules[ruleIndex].value !== 'object') {
      updatedRules[ruleIndex].value = { from: '', to: '' };
    }
    updatedRules[ruleIndex].value = { ...updatedRules[ruleIndex].value, [key]: value };
    setFormData((prev) => ({ ...prev, rules: updatedRules }));
  };

  const handleRuleMultiSelectChange = (ruleIndex, selectedOptions) => {
    const updatedRules = [...formData.rules];
    updatedRules[ruleIndex].value = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setFormData((prev) => ({ ...prev, rules: updatedRules }));
  };

  const handleParameterSelect = (ruleIndex, selectedOption) => {
    const updatedRules = [...formData.rules];
    updatedRules[ruleIndex].parameterUuid = selectedOption ? selectedOption.value : '';
    updatedRules[ruleIndex].value = '';
    setFormData((prev) => ({ ...prev, rules: updatedRules }));
  };

  const addRule = () => {
    setFormData((prev) => ({
      ...prev,
      rules: [...prev.rules, { parameterUuid: '', value: '' }],
    }));
  };

  const removeRule = (index) => {
    const updatedRules = [...formData.rules];
    updatedRules.splice(index, 1);
    setFormData((prev) => ({ ...prev, rules: updatedRules }));
  };

  const validateForm = () => {
    const valueField = profileType === 'markup' ? 'markup_value' : 'discount_value';
    const typeField = profileType === 'markup' ? 'markup_type' : 'discount_type';
    const consumptionField = profileType === 'markup' ? 'total_markup_consumption' : 'total_discount_consumption';
    const capField = profileType === 'markup' ? 'max_markup_cap' : 'max_discount_cap';

    if (
      !formData.rule_name ||
      !formData.business_channel ||
      !formData.product_type ||
      !formData.fare_type ||
      !formData.distribution_channel ||
      !formData[typeField] ||
      !formData[valueField] ||
      !formData.rules.length
    ) {
      Swal.fire('Required fields missing', 'Please fill in all mandatory fields', 'error');
      return false;
    }
    if (formData.is_promotion && !formData.promotion_text) {
      Swal.fire('Promotion Text required', 'Promotion Text is required when Is Promotion is enabled', 'error');
      return false;
    }
    const { from_date, to_date } = formData.availability_dates;
    if (!from_date || !to_date || new Date(to_date) <= new Date(from_date)) {
      Swal.fire('Invalid Date Range', 'To Date must be after From Date', 'error');
      return false;
    }
    if (formData.expiry_date && new Date(formData.expiry_date) <= new Date(to_date)) {
      Swal.fire('Invalid Expiry Date', 'Expiry Date must be after To Date', 'error');
      return false;
    }
    if (
      formData[consumptionField] &&
      formData[capField] &&
      parseFloat(formData[consumptionField]) > parseFloat(formData[capField])
    ) {
      Swal.fire(
        `Invalid ${profileType === 'markup' ? 'Markup' : 'Discount'} Consumption`,
        `Total ${profileType === 'markup' ? 'Markup' : 'Discount'} Consumption cannot be greater than Max ${profileType === 'markup' ? 'Markup' : 'Discount'} Cap`,
        'error'
      );
      return false;
    }
    for (let i = 0; i < formData.rules.length; i++) {
      const rule = formData.rules[i];
      if (!rule.parameterUuid) {
        Swal.fire('Invalid Rule', `Rule ${i + 1} must have a Parameter`, 'error');
        return false;
      }
      const param = parameters.find((p) => p.uuid === rule.parameterUuid);
      if (
        param?.type === 'daterange' &&
        (!rule.value?.from_date || !rule.value?.to_date || new Date(rule.value.to_date) <= new Date(rule.value.from_date))
      ) {
        Swal.fire('Invalid Rule', `Rule ${i + 1} with parameter ${param.name} must have a valid date range`, 'error');
        return false;
      }
      if (
        (param?.type === 'range' || param?.type === 'valuerange') &&
        (!rule.value?.from || !rule.value?.to || Number(rule.value.to) <= Number(rule.value.from))
      ) {
        Swal.fire('Invalid Rule', `Rule ${i + 1} with parameter ${param.name} must have a valid range`, 'error');
        return false;
      }
      if (param?.type === 'number' && !rule.value) {
        Swal.fire('Invalid Rule', `Rule ${i + 1} with parameter ${param.name} must have a valid value`, 'error');
        return false;
      }
      if (param?.type === 'multiselect' && (!rule.value || rule.value.length === 0)) {
        Swal.fire('Invalid Rule', `Rule ${i + 1} with parameter ${param.name} must have at least one value`, 'error');
        return false;
      }
      if (param?.type === 'enum' && !rule.value && rule.value !== '') {
        Swal.fire('Invalid Rule', `Rule ${i + 1} with parameter ${param.name} must have a value`, 'error');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const valueField = profileType === 'markup' ? 'markup_value' : 'discount_value';
    const typeField = profileType === 'markup' ? 'markup_type' : 'discount_type';
    const consumptionField = profileType === 'markup' ? 'total_markup_consumption' : 'total_discount_consumption';
    const capField = profileType === 'markup' ? 'max_markup_cap' : 'max_discount_cap';

    const payload = {
      rule_name: formData.rule_name,
      business_channel: formData.business_channel,
      product_type: formData.product_type,
      fare_type: formData.fare_type,
      distribution_channel: formData.distribution_channel,
      [typeField]: formData[typeField],
      [valueField]: parseFloat(formData[valueField]) || null,
      [consumptionField]: parseFloat(formData[consumptionField]) || 0,
      [capField]: parseFloat(formData[capField]) || null,
      strike_through: formData.strike_through,
      promotion_text: formData.promotion_text,
      is_promotion: formData.is_promotion,
      auto_apply: formData.auto_apply,
      double_dip: formData.double_dip,
      from_date: formData.availability_dates.from_date,
      to_date: formData.availability_dates.to_date,
      expiry_date: formData.expiry_date || null,
      is_active: formData.status,
      rules: formData.rules.map((rule) => {
        const param = parameters.find((p) => p.uuid === rule.parameterUuid);
        let value = rule.value;
        if (param?.type === 'daterange') {
          value = { from_date: rule.value.from_date, to_date: rule.value.to_date };
        } else if (param?.type === 'range' || param?.type === 'valuerange') {
          value = { from: Number(rule.value.from), to: Number(rule.value.to) };
        } else if (param?.type === 'number') {
          value = rule.value;
        } else if (param?.type === 'multiselect') {
          value = rule.value;
        }
        return {
          parameter_name: param?.name || '',
          parameter_value: value,
        };
      }),
    };

    const service = isEditMode
      ? profileType === 'markup'
        ? updateMarkupProfile
        : updateDiscountProfile
      : profileType === 'markup'
      ? createMarkupProfile
      : createDiscountProfile;

    const result = isEditMode ? await service(id, payload) : await service(payload);
    if (result.success) {
      toast.success(`Profile ${isEditMode ? 'updated' : 'added'} successfully!`);
      navigate(`/${profileType}-profiles`);
    } else {
      Swal.fire('Error', result.message, 'error');
    }
  };

  return {
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
  };
};

export default useProfileLogic;