/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import { Button, Card, CardBody, Col, Spinner, Table } from "reactstrap";
import CommonCardHeader from "../common/card-header";
import { useDashboardContext } from "../../helper/DashboardProvider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestOrders = () => {
  const { getB2bReport, b2breportList, csvB2bReport, csvb2b } =
    useDashboardContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getB2bReport();
    csvB2bReport();
  }, []);

  const handleDownload = async () => {
    setLoading(true); // Start loading
    try {

    
      console.log(csvb2b, 'csv2')
      if (csvb2b) {
        // Create a temporary link element
        const link = document.createElement("a");
        link.href = csvb2b;
        link.target = "_blank"; // Opens in a new tab/blank page
        link.download = "B2B_Report.csv"; // Suggest a filename for download
        document.body.appendChild(link);
        link.click(); // Programmatically click the link
        document.body.removeChild(link); // Clean up the DOM
      } else {
        console.error("File URL not found");
      }
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Col xl="6 xl-100">
      <Card>
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-sm-6">
            <CommonCardHeader title="B2B Report" />
          </div>
          <div className="col-sm-6" align="right">
            <div style={{ paddingRight: "30px" }}>
              <Button
                color="primary"
                onClick={handleDownload}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" /> Downloading...
                  </>
                ) : (
                  "Download B2B CSV"
                )}
              </Button>
            </div>
          </div>
        </div>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Name of Organisation</th>
                <th>Category Name</th>
                <th>No. of Tests under Category</th>
                <th>Category Value (Rs)</th>
                <th>Total No. of Tests</th>
                <th>Total Value (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {b2breportList.data?.map((org, index) => (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{org.organization_name}</td>
                    <td colSpan="5"></td>
                  </tr>
                  {org.test_categories.map((category, catIndex) => (
                    <tr key={`${index}-${catIndex}`}>
                      <td></td>
                      <td></td>
                      <td>{category}</td>
                      <td>{org.category_tests_count[catIndex]}</td>
                      <td>{org.test_order_amount[catIndex]}</td>
                      {catIndex === 0 && (
                        <>
                          <td rowSpan={org.test_categories.length}>
                            {org.total_no_of_tests}
                          </td>
                          <td rowSpan={org.test_categories.length}>
                            {org.total_test_order_amount}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LatestOrders;
