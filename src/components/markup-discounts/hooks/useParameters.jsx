import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchParametersByProductType } from '../services/MarkupProfileService';

const useParameters = (productType) => {
  const [parameters, setParameters] = useState([]);
  const [loadingParameters, setLoadingParameters] = useState(false);
  const [parametersError, setParametersError] = useState(null);

  useEffect(() => {
    const loadParameters = async () => {
      if (productType) {
        setLoadingParameters(true);
        setParametersError(null);
        const result = await fetchParametersByProductType(productType);
        if (result.success) {
          setParameters(result.data.data || []);
        } else {
          setParametersError(result.message);
          setParameters([]);
          toast.error(result.message);
        }
        setLoadingParameters(false);
      }
    };
    loadParameters();
  }, [productType]);

  const loadParameterOptions = async (inputValue, callback) => {
    // Filter cached parameters client-side
    const filteredParams = inputValue && inputValue.length >= 2
      ? parameters.filter((param) =>
          param.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      : parameters;

    callback(
      filteredParams.map((param) => ({
        value: param.uuid,
        label: param.name,
        type: param.type,
        enumOptions: param.options,
      }))
    );
  };

  return { parameters, setParameters, loadingParameters, parametersError, loadParameterOptions };
};

export default useParameters;