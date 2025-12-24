import React, { useEffect, useState } from 'react';
import Header2 from '../../header2/header2';
import Constants from '../../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { putDATA } from '../../../Apis/API';
import { SimpleAlert, SuccessApiToast } from '../../../constants/globalfunctions';
import MultiSelect from 'react-select';
import ApiRoutes from '../../../constants/ApiRoutes';

const OfflineSuppliersVccSetting = ({ data }) => {
  const [displayBookingDate, setDisplayBookingDate] = useState(false);
  const [selectedCreditId, setSelectedCreditId] = useState('');
  const [beforeDays, setBeforeDays] = useState('');
  const navigateOnRefresh = useNavigate();

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
     
      setDisplayBookingDate(data.VCC === 'yes');

      if (data.VCCData && data.VCCData.length > 0) {
        const vccData = data.VCCData[0];
        setSelectedCreditId(vccData.vcctype || '');
        setBeforeDays(vccData.vcctype === 'before_check_in' ? vccData.beforedays.toString() : '');
      }
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.OFFLINESUPPLIERSEARCH);
    }
  }, [data, navigateOnRefresh]);

  const handleVccCheckboxChange = (event) => {
    setDisplayBookingDate(event.target.checked);
    if (!event.target.checked) {
      // Reset when VCC is unchecked
      setSelectedCreditId('');
      setBeforeDays('');
    }
  };

  const handleCreditIdChange = (event) => {
    setSelectedCreditId(event.target.value);
  };

  const handleBeforeDaysChange = (selectedOption) => {
    setBeforeDays(selectedOption ? selectedOption.value : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the form data directly from state
    const requestBody = {
      VCC: displayBookingDate ? 'yes' : 'no',
      VCCData: [
        {
          vcctype: selectedCreditId,
          beforedays: selectedCreditId === 'before_check_in' ? beforeDays : '',
        },
      ],
    };

    try {
      // Make an API call to update the VCC settings
      const response = await putDATA(ApiRoutes.SUPPLIERS.OFFLINE.VCC_SETTING, data.uuid, requestBody);

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        SuccessApiToast("VCC Setting Updated Successfully");
        navigateOnRefresh(Constants.URLConstants.OFFLINESUPPLIERSEARCH);
      } else {
        SimpleAlert("error", "Error", "Failed to Update VCC Setting");
      }
    } catch (error) {
      // Handle errors from the API call
      SimpleAlert("error", "Error", "An unexpected error occurred.");
    }
  };

  // Options for before days from 1 to 30
  const beforeDaysOptions = Array.from({ length: 30 }, (v, k) => ({ value: (k + 1).toString(), label: (k + 1).toString() }));

  return (
    <div>
      <Header2
        title={`SELECT OPTIONS FOR SUPPLIER -> ${data.supplierName || 'Loading...'}`}
        linkText1="List Offline Suppliers"
        linkText2="Vcc Settings Supplier"
        link1={Constants.URLConstants.OFFLINESUPPLIER}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-12">
                <div className="checkbox checkbox-success checkbox-inline">
                  <input
                    type="checkbox"
                    name="vcc_enable"
                    id="vcc"
                    value="vcc"
                    onChange={handleVccCheckboxChange}
                    className="test123"
                    checked={displayBookingDate}
                  />
                  <label htmlFor="vcc">VCC</label>
                </div>
                {displayBookingDate && (
                  <div className="col-md-12">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="on_confirmed_date"
                        id="on_confirmed_date"
                        onChange={handleCreditIdChange}
                        checked={selectedCreditId === 'on_confirmed_date'}
                      />
                      <label htmlFor="on_confirmed_date">On Booking Confirmed Date</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="on_voucher_date"
                        id="on_voucher_date"
                        onChange={handleCreditIdChange}
                        checked={selectedCreditId === 'on_voucher_date'}
                      />
                      <label htmlFor="on_voucher_date">On Voucher Date</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="expiration_date"
                        id="expiration_date"
                        onChange={handleCreditIdChange}
                        checked={selectedCreditId === 'expiration_date'}
                      />
                      <label htmlFor="expiration_date">On Expiration Date</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="before_check_in"
                        id="before_check_in"
                        onChange={handleCreditIdChange}
                        checked={selectedCreditId === 'before_check_in'}
                      />
                      <label htmlFor="before_check_in">Before Check In</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="check_out_date"
                        id="check_out_date"
                        onChange={handleCreditIdChange}
                        checked={selectedCreditId === 'check_out_date'}
                      />
                      <label htmlFor="check_out_date">On Check Out Date</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="service_date"
                        id="service_date"
                        onChange={handleCreditIdChange}
                        checked={selectedCreditId === 'service_date'}
                      />
                      <label htmlFor="service_date">On Service Date</label>
                    </div>
                    {/* Add more radio buttons here */}
                  </div>
                )}
              </div>

              {selectedCreditId === 'before_check_in' && (
                <div className="form-group col-md-3 ml-5" id="show_days">
                  <label htmlFor="before_days">Before Days</label>
                  <MultiSelect
                    options={beforeDaysOptions}
                    isSearchable
                    placeholder="- Select Days -"
                    value={beforeDaysOptions.find(option => option.value === beforeDays)}
                    onChange={handleBeforeDaysChange}
                    className="custom-select required"
                    required
                  />
                </div>
              )}
              <div className="form-group col-md-12">
                <br />
                <button type="submit" className="btn btn-dark btn-sm" name="Save" value="Save">
                  <i className="fa fa-floppy-o" aria-hidden="true"></i>
                  &nbsp;Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(OfflineSuppliersVccSetting);
