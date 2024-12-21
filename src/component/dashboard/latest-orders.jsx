/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import {
  Button, Card, CardBody, Col, Spinner, Table, Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import CommonCardHeader from "../common/card-header";
import { useDashboardContext } from "../../helper/DashboardProvider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestOrders = () => {
  const { getB2bReport, b2breportList, getunitReport, unitreportList, getLabReport, labreportList, getCCReport, CCreportList, csvB2bReport, csvb2b, csvUnitReport, csvUnit, csvLabReport, csvLab, csvCCReport, csvCC } = useDashboardContext();


  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState("B2B");
  const [reportList, setReportList] = useState([]);
  const [csvFile, setCsvFile] = useState(null);

  // Fetch data when `selectedReport` changes
  useEffect(() => {
    switch (selectedReport) {
      case "B2B":
        getB2bReport();
        break;
      case "Unit":
        getunitReport();
        break;
      case "Lab":
        getLabReport();
        break;
      case "Collection Center":
        getCCReport();
        break;
      default:
        break;
    }
  }, [selectedReport]);

  // Update `reportList` and `csvFile` when context data changes
  useEffect(() => {
    switch (selectedReport) {
      case "B2B":
        setReportList(b2breportList);
        break;
      case "Unit":
        setReportList(unitreportList);
        break;
      case "Lab":
        setReportList(labreportList);
        break;
      case "Collection Center":
        setReportList(CCreportList);
        break;
      default:
        break;
    }
  }, [b2breportList, unitreportList, labreportList, CCreportList, selectedReport]);

  useEffect(() => {
    switch (selectedReport) {
      case "B2B":
        setCsvFile(csvb2b);
        break;
      case "Unit":
        setCsvFile(csvUnit);
        break;
      case "Lab":
        setCsvFile(csvLab);
        break;
      case "Collection Center":
        setCsvFile(csvCC);
        break;
      default:
        break;
    }
  }, [csvb2b, csvUnit, csvLab, csvCC, selectedReport]);

  useEffect(() => {
    if (csvFile) {
      const link = document.createElement("a");
      link.href = csvFile;
      link.target = "_blank";
      link.download = `${selectedReport}_Report.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("File URL not found");
    }
  }, [csvFile])

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleDownload = async () => {
    setLoading(true);
    try {
      switch (selectedReport) {
        case "B2B":
          await csvB2bReport();
          break;
        case "Unit":
          await csvUnitReport();
          break;
        case "Lab":
          await csvLabReport();
          break;
        case "Collection Center":
          await csvCCReport();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Col xl="6 xl-100">
      <Card>
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-sm-6 mt-1" style={{}}>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret color="primary">
                {selectedReport} Report
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setSelectedReport("B2B")}>
                  B2B
                </DropdownItem>
                <DropdownItem onClick={() => setSelectedReport("Unit")}>
                  Unit
                </DropdownItem>
                <DropdownItem onClick={() => setSelectedReport("Lab")}>
                  Lab
                </DropdownItem>
                <DropdownItem onClick={() => setSelectedReport("Collection Center")}>
                  Collection Center
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="col-sm-6" align="right">
            <div style={{ paddingRight: "30px" }}>
              <Button color="primary" onClick={handleDownload} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" /> Downloading...
                  </>
                ) : (
                  "Download"
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
              {reportList.data?.map((org, index) => (
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
