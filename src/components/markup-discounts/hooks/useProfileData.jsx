import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { fetchMarkupProfileById } from '../services/MarkupProfileService';
import { fetchDiscountProfileById } from '../services/DiscountProfileService';

const useProfileData = (profileType, id) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
        id: '',
        rule_name: '',
        business_channel: '',
        product_type: 'Flights',
        status: true,
        fare_type: 'Total Fare',
        distribution_channel: '',
        [profileType === 'markup' ? 'markup_type' : 'discount_type']: '',
        [profileType === 'markup' ? 'markup_value' : 'discount_value']: '',
        [profileType === 'markup' ? 'total_markup_consumption' : 'total_discount_consumption']: '',
        [profileType === 'markup' ? 'max_markup_cap' : 'max_discount_cap']: '',
        strike_through: false,
        promotion_text: '',
        is_promotion: false,
        auto_apply: true,
        double_dip: false,
        availability_dates: { from_date: '', to_date: '' },
        expiry_date: '',
        rules: [],
        ...(profileType === 'markup' ? { created_by: '', created_at: '', modified_at: '' } : {}),
    });
  const [rawRules, setRawRules] = useState([]);
  const [loading, setLoading] = useState(false); // Simplify initial loading
  const [error, setError] = useState(null);

  useEffect(() => {

    // Handle "Edit" case (valid id)
    const loadData = async () => {
        if (!id) {
            console.warn('No ID provided, skipping data fetch'); // Debug log
            return;
    }
      setLoading(true);
      setError(null);
      const fetchProfile = profileType === 'markup' ? fetchMarkupProfileById : fetchDiscountProfileById;
      console.log(`Fetching ${profileType} profile with ID:`, id);
      const profileResult = await fetchProfile(id);
      console.log('Profile Result:', profileResult);
      if (profileResult.success) {
        const profile = profileResult.data.data;
        setFormData({
          id: profile.id,
          rule_name: profile.rule_name || '',
          business_channel: profile.business_channel || '',
          product_type: profile.product_type || 'Flights',
          status: profile.is_active || true,
          fare_type: profile.fare_type || 'Total Fare',
          distribution_channel: profile.distribution_channel || '',
          [profileType === 'markup' ? 'markup_type' : 'discount_type']: profile[profileType === 'markup' ? 'markup_type' : 'discount_type'] || '',
          [profileType === 'markup' ? 'markup_value' : 'discount_value']: profile[profileType === 'markup' ? 'markup_value' : 'discount_value'] || '',
          [profileType === 'markup' ? 'total_markup_consumption' : 'total_discount_consumption']: profile[profileType === 'markup' ? 'total_markup_consumption' : 'total_discount_consumption'] || '',
          [profileType === 'markup' ? 'max_markup_cap' : 'max_discount_cap']: profile[profileType === 'markup' ? 'max_markup_cap' : 'max_discount_cap'] || '',
          strike_through: profile.strike_through || false,
          promotion_text: profile.promotion_text || '',
          is_promotion: profile.is_promotion || false,
          auto_apply: profile.auto_apply || true,
          double_dip: profile.double_dip || false,
          availability_dates: {
            from_date: profile.from_date || '',
            to_date: profile.to_date || '',
          },
          expiry_date: profile.expiry_date || '',
          rules: profile.rules || [],
          ...(profileType === 'markup' ? {
            created_by: profile.created_by || '',
            created_at: profile.created_at || '',
            modified_at: profile.modified_at || '',
          } : {}),
        });
        setRawRules(profile.rules || []);
      } else {
        setError(profileResult.message);
        Swal.fire('Error', profileResult.message, 'error');
        navigate(`/${profileType}-profiles`);
      }
      setLoading(false);
    };
    loadData();
  }, [id, profileType, navigate]);

  return { formData, setFormData, rawRules, setRawRules, loading, error };
};

export default useProfileData;