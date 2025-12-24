import Header2 from "../header2/header2";
import React, { useState, useEffect } from "react";
import MultiSelect from '../reactMultiSelect';
import Swal from 'sweetalert2';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { assignMenustoProfile, getAllMenues, getAllProfilesData } from "../../Apis/API";
import Constants from "../../constants/routes";

const MenuAccess = () => {
    const [profilesData, setProfilessData] = useState([]);
    const [allprofilesData, setAllProfilessData] = useState([]);
    const [allMenus, setAllMenus] = useState([]);
    const [selectedMenuUuids, setSelectedMenuUuids] = useState([]);
    const [selectedProfileUuid, setSelectedProfileUuid] = useState("");

    useEffect(() => {
        // Fetch profiles data
        const getProfiles = async () => {
            try {
                const response = await getAllProfilesData();
                if (response.data.statusCode === 200) {
                    const profiles = response.data.data || [];
                    // Format profile data for React Select options
                   
                    setAllProfilessData(profiles);
                    const selectOptions = profiles.map(profile => ({
                        value: profile.uuid,
                        label: profile.profileName
                    }));
                    setProfilessData(selectOptions);
                }
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch menus data
        const getMenus = async () => {
            try {
                const response = await getAllMenues();
                if (response.data.statusCode === 200) {
                    const allMenusData = response.data.data || [];
                    
                    setAllMenus(allMenusData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getProfiles();
        getMenus();
    }, []);
    const profilemenuscheckchange = (uuid) => {
        const matchedProfile = allprofilesData.find(profile => profile.uuid === uuid);
       
        
        if (matchedProfile && matchedProfile.menues) {
            const selectedMenuUuids = matchedProfile.menues.map(menu => menu.uuid);
            setSelectedMenuUuids(selectedMenuUuids);
        }
    };
    
    // Update selected profile UUID


    const handleProfileSelectChange = (selectedOption) => {
       
        profilemenuscheckchange(selectedOption.value);
        setSelectedProfileUuid(selectedOption.value);
    };

   
    const handleMenuCheckboxChange = (menuUuid) => {
        if (menuUuid === 'selectAll') {
            // If "Select All" checkbox is checked, mark all checkboxes as checked
            const isChecked = document.getElementById('chk_all').checked;
            document.querySelectorAll('input[name="arr[]"]').forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            setSelectedMenuUuids(isChecked ? allMenus.map(menu => menu.uuid) : []);
        } else {
            // Find the clicked menu item
            const menuItem = allMenus.find(menu => menu.uuid === menuUuid);
            if (menuItem) {
                // Toggle the clicked menu item
                setSelectedMenuUuids(prevSelectedMenuUuids => {
                    if (prevSelectedMenuUuids.includes(menuUuid)) {
                        // Uncheck the checkbox if it was previously checked
                        return prevSelectedMenuUuids.filter(uuid => uuid !== menuUuid);
                    } else {
                        // Check the checkbox if it was previously unchecked
                        return [...prevSelectedMenuUuids, menuUuid];
                    }
                });
    
                // Recursively toggle selection for children
                const toggleChildrenSelection = (menu) => {
                    if (menu.children && menu.children.length > 0) {
                        menu.children.forEach(child => {
                            setSelectedMenuUuids(prevSelectedMenuUuids => {
                                if (prevSelectedMenuUuids.includes(child.uuid)) {
                                    // Uncheck child if parent is unchecked
                                    return prevSelectedMenuUuids.filter(uuid => uuid !== child.uuid);
                                } else {
                                    // Check child if parent is checked
                                    return [...prevSelectedMenuUuids, child.uuid];
                                }
                            });
                            toggleChildrenSelection(child); // Recursively toggle selection for children
                        });
                    }
                };
    
                toggleChildrenSelection(menuItem); // Toggle selection for children recursively
            }
        }
    };
    
    
    

    const navigate = useNavigate();
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Construct the desired data structure
        const formData = {
            uuid: selectedProfileUuid,
            menuUuid: selectedMenuUuids
        };
        
        const checkRequired = (prdata) => {
            if (prdata.uuid === "" || prdata.uuid === undefined) {
                Swal.fire(
                    "Profile is required",
                    "Please Select the profile",
                    "error"
                );
                return false;
            }
            return true;
        };
        const isSuccessfull = checkRequired(formData);
        if (isSuccessfull) {
            try {
                const response = await assignMenustoProfile(formData);

                if (response.data.statusCode === 200) {
                    toast.success("Menus Assigned Successfully", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Slide,
                    });
                    navigate(Constants.URLConstants.STAFFACCESSMENU);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <Header2 title="MENU ACCESS" />
            <div className="container-fluid pt-0 p-4" id="content-pad">
                <form onSubmit={handleSubmit}>
                    <div className="row mt-2 mb-4">
                        <div className="col-md-4 form-group">
                            <label>Select Profile</label>
                            <MultiSelect
                                options={profilesData}
                                name="ProfileUuid"
                                isSearchable
                                placeholder="- Select Profile -"
                                noOptionsMessage={() => "No Profile Found"}
                                className="custom-select required"
                                onChange={handleProfileSelectChange}
                            />
                        </div>
                    </div>

                    <div className="col-md-12 mb-2">
                        <div className="checkbox checkbox-success checkbox-inline">
                            <input
                                type="checkbox"
                                id="chk_all"
                                name="chk_all"
                                onChange={() => handleMenuCheckboxChange('selectAll')}
                            />
                            <label>Select All</label>
                        </div>
                    </div>
                    <Menu data={allMenus} onMenuCheckboxChange={handleMenuCheckboxChange} selectedMenuUuids={selectedMenuUuids} />

                    <div className="form-group col-md-2 mt-3 mb-4">
                        <button type="submit" className="btn btn-dark btn-sm">
                            <i className="fa-solid fa-floppy-disk"></i> Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Menu = ({ data, onMenuCheckboxChange, selectedMenuUuids }) => {
    const renderMenuItems = (items) => {
        return items.map(item => (
            <MenuItem key={item.uuid} item={item} onMenuCheckboxChange={onMenuCheckboxChange} selectedMenuUuids={selectedMenuUuids} />
        ));
    };

    const topLevelItems = data.filter(item => item.parent === null);

    // Function to recursively find and add child items to their parent
    const addChildItems = (parentItem, allItems) => {
        const children = allItems.filter(item => item.parent && item.parent.uuid === parentItem.uuid);
        if (children.length > 0) {
            parentItem.children = children;
            children.forEach(child => addChildItems(child, allItems));
        }
    };

    // Add child items to their parent recursively
    data.forEach(item => addChildItems(item, data));

    return (
        <div className="col-md-12">
            <ul id="tree1">
                <div className="dd" id="nestable">
                    {renderMenuItems(topLevelItems)}
                </div>
            </ul>
        </div>
    );
};

const MenuItem = ({ item, onMenuCheckboxChange, selectedMenuUuids }) => {
    const [collapsed, setCollapsed] = useState(true);
    const hasChildren = item.children && item.children.length > 0;

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleCheckboxChange = () => {
        
        onMenuCheckboxChange(item.uuid);
        
    };

    return (
        <li className="dd-item" data-id={item.uuid}>
            {hasChildren && (
                <button
                    onClick={toggleCollapse}
                    data-action={collapsed ? 'expand' : 'collapse'}
                    type="button"
                >
                    {collapsed ? '+' : '-'}
                </button>
            )}
            <div className="dd-handle">
                <div className="checkbox checkbox-success checkbox-inline">
                    {!hasChildren && <span style={{ width: '1vw', display: 'inline-block' }}>&nbsp;</span>}
                    <input
                        type="checkbox"
                        id={item.uuid}
                        value={item.uuid}
                        name="arr[]"
                        checked={selectedMenuUuids.includes(item.uuid)}
                        onChange={handleCheckboxChange} // Call handleCheckboxChange on change
                    />
                    <label style={{ fontWeight: 'bold' }}>{item.menuName}</label>
                </div>
            </div>
            {hasChildren && (
                <ol className="dd-list" style={{ display: collapsed ? 'none' : 'block', marginLeft: '1vw' }}>
                    {item.children.map(child => (
                        <MenuItem key={child.uuid} item={child} onMenuCheckboxChange={onMenuCheckboxChange} selectedMenuUuids={selectedMenuUuids} />
                    ))}
                </ol>
            )}
        </li>
    );
};

export default MenuAccess;
