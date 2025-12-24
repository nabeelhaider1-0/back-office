// Add Screen Content - Wizard Mode
const ADD_WIZARD_CONTENT = {
  hotel: {
    title: "Welcome to the Hotel Profile Wizard!",
    message:
      "Start by adding the hotel's identity — name, brand, contact points, and essential descriptors. These details unlock the next steps in the wizard.",
    tips: [
      "Complete required basics like display name, location, and timezone.",
      "Upload a hero image to make the listing stand out.",
      "Use 'Save & Continue' to proceed to the next step in the wizard.",
    ],
  },
  rooms: {
    title: "Define Your Room Types",
    message:
      "Create room categories, amenities, and occupancy limits so downstream contracts and rates know what inventory exists.",
    tips: [
      "Describe bedding and occupancy clearly.",
      "Add supporting media for each room type later in the Media step.",
      "Use 'Save & Continue' to move to the next wizard step.",
    ],
  },
  seasons: {
    title: "Set Seasonal Windows",
    message:
      "Build seasons to group date ranges that share pricing and restrictions. Contracts and rates can reference these seasons directly.",
    tips: [
      "Overlap seasons only when absolutely needed.",
      "Mark shoulder and peak periods to align rate logic.",
      "Use 'Save & Continue' to proceed to contracts.",
    ],
  },
  contracts: {
    title: "Create Sellable Contracts",
    message:
      "Contracts bind inventory, dates, and commercial terms. They connect hotels, room types, and seasons into one offer.",
    tips: [
      "Attach the hotel and seasons you already prepared.",
      "Outline allotments and inclusions inside the contract as needed.",
      "Use 'Save & Continue' to move to rates configuration.",
    ],
  },
  rates: {
    title: "Configure Your Rates",
    message:
      "Set up rate plans, meal plans, and price rules. Rates sit on top of contracts to define what the traveller pays.",
    tips: [
      "Double-check currency and cancellation policy.",
      "Leverage bulk entry when multiple rate rows share the same structure.",
      "Use 'Save & Continue' to flow straight into allotments.",
    ],
  },
  allotments: {
    title: "Allocate Your Inventory",
    message:
      "Distribute room allotments across dates and contracts so availability stays accurate. This fuels occupancy controls.",
    tips: [
      "Upload bulk allotments when working with long ranges.",
      "Keep safety buffers for high-demand periods.",
      "Use 'Save & Continue' to proceed to restrictions.",
    ],
  },
  restrictions: {
    title: "Apply Stay Restrictions",
    message:
      "Add minimum/maximum stay rules, stop-sell toggles, and arrival/departure controls to shape demand and protect inventory.",
    tips: [
      "Target rules by hotel, contract, or room level for precision.",
      "Pair restrictions with seasons for granular control.",
      "Use 'Save & Continue' to tackle blackouts next.",
    ],
  },
  blackouts: {
    title: "Block Key Dates",
    message:
      "Blackouts mark special dates where selling should pause. Use them for maintenance, renovations, or strategic closures.",
    tips: [
      "Tie blackouts to contracts to avoid accidental availability.",
      "Add short descriptions so teammates know the reason.",
      "Use 'Save & Continue' to proceed to promotions.",
    ],
  },
  promotions: {
    title: "Launch Promotions",
    message:
      "Promotions help you highlight deals, apply discount logic, and drive conversions during specific windows.",
    tips: [
      "Match promo validity with seasons for consistency.",
      "Use clear naming so partners recognise each campaign.",
      "Use 'Save & Continue' to move to the final media step.",
    ],
  },
  media: {
    title: "Showcase Visuals",
    message:
      "Upload photos, floor plans, and galleries. Rich media improves engagement and helps distribution channels merchandise the property.",
    tips: [
      "Prioritise high-resolution images with good lighting.",
      "Tag media by room or facility to keep libraries organised.",
      "Congratulations! You've completed the hotel profile wizard.",
    ],
  },
};

// Add Screen Content - Simple Mode
const ADD_SIMPLE_CONTENT = {
  hotel: {
    title: "Add New Hotel",
    message:
      "Fill in the hotel's basic information including name, location, contact details, amenities, and policies. Upload images to showcase the property.",
    tips: [
      "Complete all required fields marked with an asterisk.",
      "Upload high-quality images to enhance the hotel listing.",
      "Click 'Save' when done, or 'Save & Add Another' to create multiple hotels.",
    ],
  },
  rooms: {
    title: "Add New Room Type",
    message:
      "Define a new room type with its specifications, amenities, occupancy limits, and bedding configuration.",
    tips: [
      "Provide clear room descriptions and specifications.",
      "Set accurate occupancy limits for proper inventory management.",
      "Save the room type or add another one if needed.",
    ],
  },
  seasons: {
    title: "Add New Season",
    message:
      "Create a new seasonal period by defining the start and end dates. Seasons help organize pricing and availability.",
    tips: [
      "Set clear start and end dates for the season.",
      "Use descriptive names to identify the season easily.",
      "Save the season when all details are complete.",
    ],
  },
  contracts: {
    title: "Add New Contract",
    message:
      "Create a new commercial contract linking a hotel with seasons, defining terms, conditions, and commercial rules.",
    tips: [
      "Select the hotel and associated seasons for this contract.",
      "Define clear terms and conditions.",
      "Save the contract or add another one if needed.",
    ],
  },
  rates: {
    title: "Add New Rate",
    message:
      "Create a new rate plan with pricing, meal plans, occupancy rules, taxes, and child policies for your contract.",
    tips: [
      "Set accurate pricing and currency information.",
      "Configure meal plans and occupancy rules carefully.",
      "Save the rate or add multiple rates using bulk entry.",
    ],
  },
  allotments: {
    title: "Add New Allotment",
    message:
      "Allocate room inventory for specific dates, linking it to a hotel, contract, room type, and season.",
    tips: [
      "Select the appropriate hotel, contract, room, and season.",
      "Set the quantity and date for the allotment.",
      "Use bulk upload for multiple dates at once.",
    ],
  },
  restrictions: {
    title: "Add New Restriction",
    message:
      "Create stay restrictions including minimum/maximum stay rules, arrival/departure controls, and stop-sell settings.",
    tips: [
      "Define clear restriction rules and their scope.",
      "Set effective dates and seasonal associations.",
      "Save the restriction when all details are set.",
    ],
  },
  blackouts: {
    title: "Add New Blackout",
    message:
      "Create a blackout period to prevent selling on specific dates for maintenance, renovations, or strategic closures.",
    tips: [
      "Set the blackout date range and reason.",
      "Associate it with the appropriate hotel or contract.",
      "Save the blackout when complete.",
    ],
  },
  promotions: {
    title: "Add New Promotion",
    message:
      "Create a promotional campaign with validity dates, discount rules, and associated hotels to drive bookings.",
    tips: [
      "Set clear validity dates for the promotion.",
      "Define discount rules and associated properties.",
      "Save the promotion to activate it.",
    ],
  },
  media: {
    title: "Add New Media",
    message:
      "Upload images, photos, or media files and associate them with hotels, rooms, or facilities to enhance listings.",
    tips: [
      "Upload high-resolution images for best quality.",
      "Tag media by type and associate with relevant entities.",
      "Add captions to describe the media content.",
    ],
  },
};

export const WIZARD_GUIDE_CONTENT = {
  // List Screens
  hotelsList: {
    title: "Browse Your Hotels",
    message:
      "View and manage all hotels in your system. Search by name, city, or country, toggle status, and access detailed information or make edits.",
    tips: [
      "Use the search bar to quickly find hotels by name, city, or country.",
      "Toggle the status switch to activate or deactivate hotels instantly.",
      "Click the eye icon to view full details, or edit/delete as needed.",
    ],
  },
  roomsList: {
    title: "Manage Room Types",
    message:
      "Browse all room types across your hotels. Filter by hotel to see room categories, amenities, and occupancy details for each property.",
    tips: [
      "Select a hotel from the dropdown to view its room types.",
      "Use search to find specific rooms by name or code.",
      "View, edit, or delete room types using the action icons.",
    ],
  },
  seasonsList: {
    title: "View Seasonal Periods",
    message:
      "Review all seasonal date ranges defined for your hotels. Seasons help organize pricing and availability across different time periods.",
    tips: [
      "Filter by hotel to see seasons for a specific property.",
      "Check start and end dates to understand seasonal coverage.",
      "Edit or delete seasons as your business needs change.",
    ],
  },
  contractsList: {
    title: "Manage Contracts",
    message:
      "Overview of all commercial contracts linking hotels, seasons, and inventory. Contracts define the commercial terms for your properties.",
    tips: [
      "Filter contracts by hotel to focus on specific properties.",
      "Review contract names and associated hotels for quick identification.",
      "Access view, edit, or delete options for each contract.",
    ],
  },
  ratesList: {
    title: "Manage Your Rates",
    message:
      "View and manage all rate plans for your selected contract. Filter by hotel, contract, season, or room type to find specific rates quickly.",
    tips: [
      "Use the filters to narrow down rates by hotel, contract, season, or room.",
      "Search by name, code, or currency to find rates instantly.",
      "Click the eye icon to view details, or edit/delete as needed.",
    ],
  },
  allotmentsList: {
    title: "Track Inventory Allotments",
    message:
      "Monitor room allotments across dates, hotels, and contracts. This view helps you manage availability and ensure accurate inventory distribution.",
    tips: [
      "Filter by hotel, contract, room, or date range to find specific allotments.",
      "Review quantities and sources to track inventory allocation.",
      "Use date filters to focus on specific time periods.",
    ],
  },
  restrictionsList: {
    title: "View Stay Restrictions",
    message:
      "Browse all stay restrictions applied to hotels, contracts, or rooms. Restrictions control minimum/maximum stays and arrival/departure rules.",
    tips: [
      "Filter by hotel or contract to see relevant restrictions.",
      "Review restriction types and their effective dates.",
      "Edit or remove restrictions as business rules change.",
    ],
  },
  blackoutsList: {
    title: "Manage Blackout Dates",
    message:
      "View all blackout periods that prevent selling on specific dates. Blackouts are used for maintenance, renovations, or strategic closures.",
    tips: [
      "Filter by hotel or contract to see relevant blackouts.",
      "Check dates and descriptions to understand blackout reasons.",
      "Create, edit, or delete blackouts as needed.",
    ],
  },
  promotionsList: {
    title: "Browse Promotions",
    message:
      "Review all active and upcoming promotional campaigns. Promotions help drive bookings with special offers and discounts.",
    tips: [
      "Filter by hotel to see promotions for specific properties.",
      "Check validity dates to see active and upcoming promotions.",
      "View, edit, or delete promotions to manage your campaigns.",
    ],
  },
  mediaList: {
    title: "Manage Media Library",
    message:
      "Browse all images, photos, and media files associated with your hotels. Rich media enhances property listings and improves engagement.",
    tips: [
      "Filter by hotel to see media for specific properties.",
      "Review media types and associations (rooms, facilities, etc.).",
      "Upload, view, edit, or delete media files as needed.",
    ],
  },
  // View Screens
  hotelView: {
    title: "Hotel Details",
    message:
      "View comprehensive information about this hotel including contact details, amenities, facilities, policies, and images. All data is displayed in read-only mode.",
    tips: [
      "Review all hotel information including location, contacts, and amenities.",
      "Check policies like check-in/check-out times.",
      "Use the edit button to modify any information if needed.",
    ],
  },
  roomView: {
    title: "Room Type Details",
    message:
      "View complete details about this room type including amenities, occupancy limits, bedding configuration, and associated media.",
    tips: [
      "Review room amenities and occupancy information.",
      "Check bedding and room configuration details.",
      "Edit the room type if any changes are needed.",
    ],
  },
  seasonView: {
    title: "Season Details",
    message:
      "View the complete seasonal period definition including start and end dates, name, and any associated contracts or rates.",
    tips: [
      "Review the date range and season name.",
      "Check which contracts or rates use this season.",
      "Edit the season if date adjustments are needed.",
    ],
  },
  contractView: {
    title: "Contract Overview",
    message:
      "View all details of this commercial contract including associated hotel, seasons, terms, and conditions. Review the complete contract structure.",
    tips: [
      "Review contract terms and associated hotels/seasons.",
      "Check commercial conditions and inclusions.",
      "Edit the contract to update terms or associations.",
    ],
  },
  rateView: {
    title: "Rate Plan Details",
    message:
      "View complete rate plan information including pricing, meal plans, occupancy rules, taxes, and child policies. All rate details are displayed here.",
    tips: [
      "Review pricing, currency, and meal plan details.",
      "Check occupancy rules and child policies.",
      "Edit the rate to update pricing or policies.",
    ],
  },
  allotmentView: {
    title: "Allotment Details",
    message:
      "View specific allotment information including date, quantity, associated hotel, contract, room type, and season.",
    tips: [
      "Review the date and quantity allocated.",
      "Check associated hotel, contract, and room type.",
      "Edit the allotment to adjust quantities or dates.",
    ],
  },
  restrictionView: {
    title: "Restriction Details",
    message:
      "View complete stay restriction rules including minimum/maximum stay requirements, arrival/departure controls, and applicable dates.",
    tips: [
      "Review restriction rules and their scope (hotel/contract/room).",
      "Check effective dates and any seasonal associations.",
      "Edit restrictions to update rules or dates.",
    ],
  },
  blackoutView: {
    title: "Blackout Period Details",
    message:
      "View complete blackout information including dates, description, associated hotel or contract, and reason for the blackout.",
    tips: [
      "Review blackout dates and description.",
      "Check which hotel or contract this applies to.",
      "Edit the blackout to update dates or description.",
    ],
  },
  promotionView: {
    title: "Promotion Details",
    message:
      "View complete promotion information including validity dates, discount rules, associated hotels, and promotional terms.",
    tips: [
      "Review promotion validity and discount details.",
      "Check associated hotels and seasonal periods.",
      "Edit the promotion to update dates or terms.",
    ],
  },
  mediaView: {
    title: "Media File Details",
    message:
      "View media file information including type, associations (hotel, room, facility), and preview. See how this media is used across the system.",
    tips: [
      "Review media type and file information.",
      "Check associations with hotels, rooms, or facilities.",
      "Edit media details or replace the file if needed.",
    ],
  },
  // Edit Screens
  hotelEdit: {
    title: "Edit Hotel Information",
    message:
      "Update hotel details including name, location, contacts, amenities, facilities, policies, and images. Make changes to keep hotel information current.",
    tips: [
      "Update any hotel information that has changed.",
      "Ensure contact details and location are accurate.",
      "Save changes to update the hotel profile.",
    ],
  },
  roomEdit: {
    title: "Edit Room Type",
    message:
      "Modify room type details including name, amenities, occupancy limits, bedding configuration, and associated media.",
    tips: [
      "Update room amenities and occupancy information.",
      "Modify bedding or room configuration as needed.",
      "Save changes to update the room type.",
    ],
  },
  seasonEdit: {
    title: "Edit Season",
    message:
      "Update seasonal period including name, start date, and end date. Ensure dates align with your business calendar.",
    tips: [
      "Adjust start and end dates if the season period has changed.",
      "Update the season name if needed.",
      "Save changes to update the seasonal period.",
    ],
  },
  contractEdit: {
    title: "Edit Contract",
    message:
      "Update commercial contract details including terms, conditions, associated hotels, seasons, and commercial rules.",
    tips: [
      "Modify contract terms and conditions as needed.",
      "Update associations with hotels or seasons.",
      "Save changes to update the contract.",
    ],
  },
  rateEdit: {
    title: "Edit Rate Plan",
    message:
      "Update rate plan details including pricing, meal plans, occupancy rules, taxes, child policies, and currency.",
    tips: [
      "Adjust pricing, currency, or meal plan details.",
      "Update occupancy rules or child policies.",
      "Save changes to update the rate plan.",
    ],
  },
  allotmentEdit: {
    title: "Edit Allotment",
    message:
      "Update allotment details including date, quantity, and associations. Adjust inventory allocation as needed.",
    tips: [
      "Modify the date or quantity allocated.",
      "Update associations with hotel, contract, or room type.",
      "Save changes to update the allotment.",
    ],
  },
  restrictionEdit: {
    title: "Edit Restriction",
    message:
      "Update stay restriction rules including minimum/maximum stay requirements, arrival/departure controls, and effective dates.",
    tips: [
      "Modify restriction rules or their scope.",
      "Update effective dates or seasonal associations.",
      "Save changes to update the restriction.",
    ],
  },
  blackoutEdit: {
    title: "Edit Blackout",
    message:
      "Update blackout period including dates, description, and associations. Modify blackout information as needed.",
    tips: [
      "Adjust blackout dates if the period has changed.",
      "Update the description or reason for the blackout.",
      "Save changes to update the blackout period.",
    ],
  },
  promotionEdit: {
    title: "Edit Promotion",
    message:
      "Update promotion details including validity dates, discount rules, associated hotels, and promotional terms.",
    tips: [
      "Modify promotion validity or discount details.",
      "Update associated hotels or seasonal periods.",
      "Save changes to update the promotion.",
    ],
  },
  mediaEdit: {
    title: "Edit Media",
    message:
      "Update media file information including type, associations, and file replacement. Keep your media library organized and current.",
    tips: [
      "Update media type or associations.",
      "Replace the file if a better version is available.",
      "Save changes to update the media file.",
    ],
  },
};

export const getGuideForStep = (stepId, isWizardMode = false) => {
  // For add screens, return mode-specific content
  if (ADD_WIZARD_CONTENT[stepId] || ADD_SIMPLE_CONTENT[stepId]) {
    return isWizardMode 
      ? (ADD_WIZARD_CONTENT[stepId] || ADD_SIMPLE_CONTENT[stepId])
      : (ADD_SIMPLE_CONTENT[stepId] || ADD_WIZARD_CONTENT[stepId]);
  }
  // For list/view/edit screens, return generic content
  return WIZARD_GUIDE_CONTENT[stepId] || null;
};

