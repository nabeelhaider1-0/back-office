// state/reducers/reducers.js
const initialState = {
  data: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EDIT_BRANCH_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_EDIT_STAFF_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_EDIT_EMAIL_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_REMINDER_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_ProfileRights_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_FLIGHTRULE_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_FLIGHTPCCRULE_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_FLIGHTOfficeId_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_FLIGHTQCTRULE_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_FLIGHTCANCELLATIONRULE_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_EDIT_SITEMAP_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_EDITMENU_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_HOTELSAMENITIES_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_HOTELSLOCATIONS_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_HOTELSINVENTORYROOMCATEGORY_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_HOTELSROOMMEALBASIS_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_HOTELSROOMVIEWBASIS_DATA":
      return {
        ...state,
        data: action.payload,
      };

    case "SET_TRANSFER_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_SUPPLEMENTSDATA":
      return {
        ...state,
        data: action.payload,
      };

    case "SET_TRANSFERLOCATION_DATA":
      return {
        ...state,
        data: action.payload,
      };

      case "SET_TOURS_DATA":
    case "SET_SPECIALREQUESTSDATA":
      return {
        ...state,
        data: action.payload,
      };
      case "SET_OFFLINESUPPLIERS_DATA":
    case "SET_MASTERSHOTELSNEWDATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_MASTERSHOTELSROOMCATEGORYDATA":
      return {
        ...state,
        data: action.payload,
      };
      case "SET_MASTERSHOTELSEDIT":
        return {
          ...state,
          data: action.payload,
        };
        case "SET_VEHICLE_DATA":
          return {
            ...state,
            data: action.payload,
          };

          case "SET_MASTERSCURRENCYEDIT":
            return {
              ...state,
              data: action.payload,
            };
            
            case "SET_MASTERSLOYALTYTIEREDIT":
              return {
                ...state,
                data: action.payload,
              };
              case "SET_MASTERSLOYALTYPRODUCTEDIT":
                return {
                  ...state,
                  data: action.payload,
                };  
                case "SET_MASTERSPAYMENTGATEWAYSEDIT":
                  return {
                    ...state,
                    data: action.payload,
                  }; 

                  case "SET_ONLINESUPPLIERS_DATA":
                    return {
                      ...state,
                      data: action.payload,
                    }; 
                  

              case "SET_MASTERSMARKUPPROFILEEDIT":
              return {
                ...state,
                data: action.payload,
              };

              case "SET_MASTERSROOMCATEGORYEDIT":
                return {
                  ...state,
                  data: action.payload,
                };
                case "SET_ADDRATES":
                  return {
                    ...state,
                    data: action.payload,
                  };

                  case "SET_EDITRATES":
                    return {
                      ...state,
                      data: action.payload,
                    };

                    case "SET_EDITSUPPLIERAUTOCHECKCONFIG":
                      return {
                        ...state,
                        data: action.payload,
                      };
                 case "SET_EDITAGENT":
                      return {
                        ...state,
                        data: action.payload,
                      };
                      case "SET_EDITSUBAGENT":
                        return {
                          ...state,
                          data: action.payload,
                        };
                        case "SET_OFFLINEBOOKINGHOTELDATA":
                        return {
                          ...state,
                          data: action.payload,
                        };
                                              
    // Add other cases for different actions if needed
    default:
      return state;
  }
};

export default rootReducer;
