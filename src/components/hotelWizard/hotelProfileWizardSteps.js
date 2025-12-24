import Constants from "../../constants/routes";

export const HOTEL_PROFILE_WIZARD_STEPS = [
  {
    id: "hotel",
    title: "Hotel",
    description: "Core profile & contact details",
    route: Constants.URLConstants.HOTELSEXTRANETADD,
  },
  {
    id: "rooms",
    title: "Rooms",
    description: "Define room types and capacity",
    route: Constants.URLConstants.HOTELSEXTRANETROOMSADD,
  },
  {
    id: "seasons",
    title: "Seasons",
    description: "Seasonal calendars and markets",
    route: Constants.URLConstants.HOTELSEXTRANETSEASONSADD,
  },
  {
    id: "contracts",
    title: "Contracts",
    description: "Commercial terms & validity",
    route: Constants.URLConstants.HOTELSEXTRANETCONTRACTSADD,
  },
  {
    id: "rates",
    title: "Rates",
    description: "Rate plans and pricing rules",
    route: Constants.URLConstants.HOTELSEXTRANETRATESADD,
  },
  {
    id: "allotments",
    title: "Allotments",
    description: "Inventory commitments",
    route: Constants.URLConstants.HOTELSEXTRANETALLOTMENTSADD,
  },
  {
    id: "restrictions",
    title: "Restrictions",
    description: "LOS, CTA/CTD, stop sell",
    route: Constants.URLConstants.HOTELSEXTRANETRESTRICTIONSADD,
  },
  {
    id: "blackouts",
    title: "Blackouts",
    description: "Closed-out dates",
    route: Constants.URLConstants.HOTELSEXTRANETBLACKOUTSADD,
  },
  {
    id: "promotions",
    title: "Promotions",
    description: "Offers & special deals",
    route: Constants.URLConstants.HOTELSEXTRANETPROMOTIONSADD,
  },
  {
    id: "media",
    title: "Media",
    description: "Visual assets & documents",
    route: Constants.URLConstants.HOTELSEXTRANETMEDIAADD,
  },
];

export const HOTEL_PROFILE_WIZARD_STORAGE_KEY = "hotel_extranet_profile_wizard";

export const HOTEL_PROFILE_WIZARD_EVENT = "hotel-extranet-profile-wizard-updated";

