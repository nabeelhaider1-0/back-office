import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header2 from '../header2/header2';
import { fetchCurrencyById } from './CurrencyService';

const CurrencyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCurrency = async () => {
      setLoading(true);
      const result = await fetchCurrencyById(id);
      if (result.success && result.data) {
        setCurrency(result.data);
      } else {
        Swal.fire('Error', result.message, 'error');
        navigate('/exchange-rates');
      }
      setLoading(false);
    };
    loadCurrency();
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currency) {
    return <div>No currency data found.</div>;
  }

  return (
    <>
      <Header2 title="CURRENCY DETAILS" linkText1="Currencies" linkText2="Currency Details" />
      <div className="container-fluid bg-white pt-4 p-4" id="content-pad">
        <div className="panel-body removeMargins">
          <div className="form-group row mt-2">
            <div className="form-group col-md-3">
              <label>Currency Code</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={currency.currency_code}
                readOnly
              />
            </div>
            <div className="form-group col-md-3">
              <label>Currency Rate</label>
              <input
                type="number"
                className="form-control form-control-sm"
                value={currency.currency_rate}
                readOnly
              />
            </div>
            <div className="form-group col-md-3">
              <label>Base Currency</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={currency.is_base_currency ? 'Yes' : 'No'}
                readOnly
              />
            </div>
            <div className="form-group col-md-3">
              <label>Status</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={currency.is_active ? 'Active' : 'Inactive'}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <div className="form-group col-md-3">
              <label>Created By</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={currency.created_by || 'N/A'}
                readOnly
              />
            </div>
            <div className="form-group col-md-3">
              <label>Created At</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={
                  currency.created_at
                    ? new Date(currency.created_at).toLocaleString()
                    : 'N/A'
                }
                readOnly
              />
            </div>
            <div className="form-group col-md-3">
              <label>Updated At</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={
                  currency.updated_at
                    ? new Date(currency.updated_at).toLocaleString()
                    : 'N/A'
                }
                readOnly
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="form-group offset-md-9 col-md-3 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-dark btn-sm me-2"
                onClick={() => navigate('/exchange-rates')}
              >
                <i className="fa fa-arrow-left me-1" /> Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyDetail;