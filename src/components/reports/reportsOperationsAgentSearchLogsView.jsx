import React from "react";
import styled from "styled-components";

// Styled component for the outer container
const Container = styled.div`
  /* Add any component-specific styles here */
`;

// Styled component for the site logo
const SiteLogo = styled.div`
  img {
    /* Styles for the image go here */
  }
`;

// Styled component for the time statistics section
const TimeStatistics = styled.div`
  text-align: left;

  /* Add any styles specific to the time statistics section */
`;

// Styled component for the tables
const Table = styled.table`
  /* Add any styles specific to the tables */
`;

// Styled component for table headers
const TableHeader = styled.th`
  /* Add any styles specific to table headers */
`;

// Styled component for table data
const TableData = styled.td`
  /* Add any styles specific to table data */
`;

const ReportsOperationsAgentSearchLogsView = ({ setShowHeaderAndMenuBar }) => {
  // Update the state to hide Header and MenuBar
  React.useEffect(() => {
    setShowHeaderAndMenuBar(false);
    // Cleanup function to reset the state when the component unmounts
    return () => setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  return (
    <Container>
      <SiteLogo>
        <img
          src="http://beta.tdonlines.com/project_folder/tdonline//images/logo.png"
          alt=""
        />
      </SiteLogo>
      <TimeStatistics>
        Agent Information
        <hr />
        <Table width="70%" cellPadding={2} cellSpacing={1} border="1px">
          <tbody className="bg-white">
            <tr>
              <TableHeader align="center">Agent Id</TableHeader>
              <TableHeader align="center">Agent Name</TableHeader>
            </tr>
            <tr>
              <TableData align="center" />
              <TableData align="center" />
            </tr>
          </tbody>
        </Table>
        Time Tracking Statistics
        <hr />
        <Table width="70%" cellPadding={2} cellSpacing={1} border="1px">
          <tbody className="bg-white">
            <tr align="center"></tr>
            <tr>
              <TableHeader align="center">Supplier</TableHeader>
              <TableHeader align="center">Total Number of Results</TableHeader>
              {/* Add more table headers as needed */}
            </tr>
            <tr>
              <TableData align="left" style={{ textTransform: "uppercase" }}>
                <b>Total Hotels</b>
              </TableData>
              <TableData align="left" colSpan={10}>
                0
              </TableData>
            </tr>
          </tbody>
        </Table>
      </TimeStatistics>
    </Container>
  );
};

export default ReportsOperationsAgentSearchLogsView;
