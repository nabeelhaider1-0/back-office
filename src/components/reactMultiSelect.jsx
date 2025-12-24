// Select Picker v1

import React from "react";
import Select from "react-select";
const MultiSelect = ({ isInvalid = false, ...props }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: isInvalid
        ? "#dc3545"
        : state.isFocused
        ? "#0d6efd"
        : "#dee2e6",
      minHeight: "30px",
      height: "auto",
      boxShadow: isInvalid
        ? "0 0 0 1px rgba(220,53,69,.25)"
        : state.isFocused
        ? "0 0 0 1px rgba(13,110,253,.25)"
        : provided.boxShadow || "none",
      transition: "border-color .2s ease, box-shadow .2s ease",
    }),

    valueContainer: (provided) => ({
      ...provided,
      height: "auto",
      padding: "0 6px",
    }),

    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      height: "30px",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <Select
      {...props}
      styles={customStyles}
      menuPortalTarget={document.body}
      menuPosition="fixed"
    />
  );
};
export default MultiSelect;

// v1 Select All Deslect All Retry

// import React, { useState } from "react";
// import Select, { components } from "react-select";

// const { Menu } = components;

// const MultiSelect = (props) => {
//   const { options } = props;
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const customStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       background: "#fff",
//       borderColor: "#9e9e9e",
//       minHeight: "30px",
//       height: "auto",
//       boxShadow: state.isFocused ? null : null,
//     }),

//     valueContainer: (provided, state) => ({
//       ...provided,
//       height: "auto",
//       padding: "0 6px",
//     }),

//     input: (provided, state) => ({
//       ...provided,
//       margin: "0px",
//     }),

//     indicatorsContainer: (provided, state) => ({
//       ...provided,
//       height: "30px",
//     }),
//   };

//   const handleSelectAll = () => {
//     setSelectedOptions(options);
//   };

//   const handleDeselectAll = () => {
//     setSelectedOptions([]);
//   };

//   const MenuWithButtons = (props) => {
//     return (
//       <Menu {...props}>
//         <div>
//           <button onClick={handleSelectAll}>Select All</button>
//           <button onClick={handleDeselectAll}>Deselect All</button>
//         </div>
//         {props.children}
//       </Menu>
//     );
//   };

//   return (
//     <Select
//       {...props}
//       value={selectedOptions}
//       onChange={setSelectedOptions}
//       styles={customStyles}
//       components={{ Menu: MenuWithButtons }}
//     />
//   );
// };

// export default MultiSelect;

// Select Picker V2

// import React, { useState, useEffect, useRef } from "react";

// const Select = ({ options }) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionClick = (option) => {
//     if (selectedOptions.includes(option)) {
//       setSelectedOptions(selectedOptions.filter((item) => item !== option));
//     } else {
//       setSelectedOptions([...selectedOptions, option]);
//     }
//   };

//   const handleSelectAll = (e) => {
//     e.preventDefault();
//     setSelectedOptions(options);
//   };

//   const handleDeselectAll = (e) => {
//     e.preventDefault();
//     setSelectedOptions([]);
//   };

//   const styles = {
//     customSelect: {
//       position: "relative",
//       display: "inline-block",
//       width: "100%", // Set width to 100%
//     },
//     selectHeader: {
//       cursor: "pointer",
//       border: "1px solid #ccc",
//       padding: "3.5px",
//       borderRadius: "4px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       backgroundColor: "#fff",
//       width: "100%", // Set width to 100%
//     },
//     dropdownIcon: {
//       marginLeft: "8px",
//       transition: "transform 0.3s",
//       fontSize: "14px",
//     },
//     dropdownIconOpen: {
//       transform: "rotateX(180deg)",
//     },
//     optionsDropdown: {
//       position: "absolute",
//       top: "100%",
//       left: "0",
//       width: "100%", // Set width to 100%
//       backgroundColor: "#fff",
//       border: "1px solid #ccc",
//       borderTop: "none",
//       borderRadius: "0 0 4px 4px",
//       zIndex: "100",
//       maxHeight: "200px",
//       overflowY: "auto",
//     },
//     searchInput: {
//       width: "calc(100% - 16px)",
//       margin: "8px",
//       padding: "8px",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//     },
//     optionsList: {
//       listStyleType: "none",
//       padding: "0",
//       margin: "0",
//     },
//     option: {
//       padding: "8px",
//       cursor: "pointer",
//       transition: "background-color 0.3s", // Add transition
//     },
//     optionHover: {
//       backgroundColor: "#f0f0f0", // Background color on hover
//     },
//     selectedHover: {
//       backgroundColor: "#0056b3",
//     },
//     tick: {
//       marginLeft: "15vw",
//     },
//     placeholder: {
//       color: "#aaa",
//     },
//     // Button styles
//     selectAllBtn: {
//       display: "inline-block", // Set to inline-block
//       width: "calc(50% - 4px)", // Adjust width if needed
//       padding: "8px",
//       border: "1px solid #fff", // White border
//       borderRadius: "4px", // Rounded border
//       backgroundColor: "#fffffff", // Blue background
//       color: "black", // White text
//       cursor: "pointer",
//       marginRight: "8px", // Add right margin
//     },
//     deselectAllBtn: {
//       display: "inline-block", // Set to inline-block
//       width: "calc(50% - 4px)", // Adjust width if needed
//       padding: "8px",
//       border: "1px solid #fff", // White border
//       borderRadius: "4px", // Rounded border
//       backgroundColor: "#fffffff", // Blue background
//       color: "black", // White text
//       cursor: "pointer",
//     },
//   };

//   return (
//     <div style={styles.customSelect} ref={dropdownRef}>
//       <div style={styles.selectHeader} onClick={toggleDropdown}>
//         <div style={styles.selectedOptions}>
//           {selectedOptions.length === 0 ? (
//             <div style={styles.placeholder}>Select...</div>
//           ) : (
//             selectedOptions.join(", ")
//           )}
//         </div>
//         <div
//           style={{
//             ...styles.dropdownIcon,
//             ...(isOpen && styles.dropdownIconOpen),
//           }}
//         >
//           &#9662;
//         </div>
//       </div>
//       {isOpen && (
//         <div style={styles.optionsDropdown}>
//           <input
//             type="text"
//             style={styles.searchInput}
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button style={styles.selectAllBtn} onClick={handleSelectAll}>
//             Select All
//           </button>
//           <button style={styles.deselectAllBtn} onClick={handleDeselectAll}>
//             Deselect All
//           </button>
//           <ul style={styles.optionsList}>
//             {options
//               .filter((option) =>
//                 option.label.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((option, index) => (
//                 <li
//                   key={index}
//                   style={{
//                     ...styles.option,
//                     ...(selectedOptions.includes(option.label) &&
//                       styles.selected),
//                   }}
//                   onClick={() => handleOptionClick(option.label)}
//                 >
//                   {option.label}
//                   {selectedOptions.includes(option.label) && (
//                     <span style={styles.tick}>&#10004;</span>
//                   )}
//                 </li>
//               ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// const MultiSelect = (props) => {
//   return (
//     <div>
//       <Select {...props} />
//     </div>
//   );
// };

// export default MultiSelect;
