import {React,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import minus from "../../../assets/images/minus_white_img.jpg";
import plus from "../../../assets/images/plus_white_img.jpg"
import "./FlightFareRules.css"
const FlightFareRules = ({ bookingData, show_span_remark }) => {
  const bookingDetail = bookingData;
 const [fareRules, setFareRules] = useState([]);
   useEffect(() => {
     setFareRules(bookingData?.fare_rules || []);
   }, []); 
   const isLoading=false;
   const [expandedRuleIndex, setExpandedRuleIndex] = useState(null);

   const toggleRule = (ruleIndex) => {
     setExpandedRuleIndex((prevIndex) =>
       prevIndex === ruleIndex ? null : ruleIndex
     );
   };
  return (
    <>
      <tr className="phps_row_1 tblHeading" id="acc2" type="button"  data-bs-toggle="modal"
                  data-bs-target="#exampleModalF"
                 >
        <td colSpan={4}>
          <img src={plus} id="moreFilterBtn2" alt="cri"  /> Fare Rules
        </td>
      </tr>
      
      <div
          className="modal fade"
          id="exampleModalF"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg flightDetailModalDialog">
            <div className="modal-content flightDetailModalContent">
              <div className="modal-header flightDetailModalHeader">
                <i
                  className="fa-solid fa-xmark"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  role="button"
                ></i>
                
              </div>
              <div className="modal-body flightDetailModalBody">
                <div className="flightDetailsTabsContent">
                  <div className="baggageFlightFairRulesMain">
                    {isLoading ? (
                      <p>Loading fare rules...</p>
                    ) : fareRules.length > 0 ? (
                      <>
                        {/* PENALTIES card */}
                        {fareRules
                          .filter((rule) => rule.category === "PENALTIES")
                          .map((rule, ruleIndex) => (
                            <div
                              key={ruleIndex}
                              className="baggageFlightFairRules"
                            >
                              <div
                                className="baggageFlightFairRulesHeader"
                                onClick={() => toggleRule(ruleIndex)}
                              >
                                <h2>{rule.category}</h2>
                                <span className="rule-toggle-icon">
                                  {expandedRuleIndex === ruleIndex ? (
                                    <i className="fa-solid fa-angle-up"></i>
                                  ) : (
                                    <i className="fa-solid fa-angle-down"></i>
                                  )}
                                </span>
                              </div>
                              {expandedRuleIndex === ruleIndex && (
                                <div className="baggageFlightFairRulesContent">
                                  <p>{rule.ruleText}</p>
                                  <p>
                                    <b>Changes: </b>
                                    {rule.changes}
                                  </p>
                                  <p>
                                    <b>Cancellations: </b>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: rule.cancellations.replace(
                                          /\n/g,
                                          "<br/>"
                                        ),
                                      }}
                                    />
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}

                        {/* Other fare rules */}
                        {fareRules.flatMap((ruleGroup, groupIndex) =>
                          (Array.isArray(ruleGroup) ? ruleGroup : [ruleGroup])
                            .filter((rule) => rule.category !== "PENALTIES")
                            .map((rule, ruleIndex) => {
                              const penaltiesCount = fareRules.filter(
                                (r) => r.category === "PENALTIES"
                              ).length;
                              const adjustedIndex =
                                penaltiesCount + groupIndex + ruleIndex;
                              return (
                                <div
                                  key={adjustedIndex}
                                  className="baggageFlightFairRules"
                                >
                                  <div
                                    className="baggageFlightFairRulesHeader"
                                    onClick={() => toggleRule(adjustedIndex)}
                                  >
                                    <h2>{rule.category}</h2>
                                    <span className="rule-toggle-icon">
                                      {expandedRuleIndex === adjustedIndex ? (
                                        <i className="fa-solid fa-angle-up"></i>
                                      ) : (
                                        <i className="fa-solid fa-angle-down"></i>
                                      )}
                                    </span>
                                  </div>
                                  {expandedRuleIndex === adjustedIndex && (
                                    <div className="baggageFlightFairRulesContent">
                                      {rule.ruleText.startsWith("http") ? (
                                        <p>
                                          For detailed fare rules, please
                                          contact our support team at
                                          support@escapra.com
                                        </p>
                                      ) : (
                                        <p>{rule.ruleText}</p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })
                        )}
                      </>
                    ) : (
                      <p>No fare rules available for this flight.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
    </>
  );
};

export default FlightFareRules;