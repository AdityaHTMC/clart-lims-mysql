/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useDashboardContext } from "../helper/DashboardProvider";
import { CircularProgress, Pagination, Stack } from "@mui/material";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import  logo from '../../src/assets/wbldcl-logo-v1.png';
const BarcodeList = () => {
  const navigate = useNavigate();

  const { getbarcode, barcode, generateBarcode, Barcodeprint } =
    useDashboardContext();
  const [selectedStatus, setSelectedStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBarcodes, setSelectedBarcodes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const itemperPage = 24;

  const totalPages = barcode?.total && Math.ceil(barcode?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
      ...selectedStatus, 
    };
    getbarcode(dataToSend);
  }, [currentPage, selectedStatus]);



  const generatebar = async () => {
    setLoading(true); // Start loading

    const dataToSend = {
      quantity: 24,
    };

    try {
      await generateBarcode(dataToSend); // Assuming generateBarcode returns a promise
     
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  const onOpenModal = () => {
    navigate("/add-test-packages");
  };
  const handleEdit = (id) => {
    navigate(`/testpackage-edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      //  tpDelete(id);
    }
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  const toggleBarcode = (code) => {
    setSelectedBarcodes((prevSelected) =>
      prevSelected.includes(code)
        ? prevSelected.filter((id) => id !== code)
        : [...prevSelected, code]
    );
  };

  // Toggle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBarcodes([]);
    } else {
      setSelectedBarcodes(barcode.data.map((product) => product.code));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (selectedBarcodes.length > 24) {
      console.log("Barcode selection can't exceed 24.");
      toast.error("Barcode selection can't exceed 24");
    } else {
      console.log(".");
    }
  }, [selectedBarcodes]);

  // Helper function to convert an image URL to a data URI
  const loadImageToDataURI = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = url;
    });

  // Generate PDF
  const generatePDF = async () => {
    if (selectedBarcodes.length === 0) {
      return;
    }
  
    const dataToSend = {
      bar_code_ids: barcode.data
        .filter((product) => selectedBarcodes.includes(product.code))
        .map((product) => product.id),
    };
  
    // Call the Barcodeprint API function with the payload
    await Barcodeprint(dataToSend);
  
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm", // Use mm as the unit
      format: [100, 38], // Custom page size 100x38 mm
    });
  
    const logoImg = await loadImageToDataURI(logo); // Replace with the path to your logo file
  
    const pageWidth = 100; // Page width in mm
    const barcodeWidth = 34;
    const barcodeHeight = 15;
    const gap = 10; // Gap between barcodes
    const totalBarcodeWidth = barcodeWidth * 2 + gap; // Total width occupied by the two barcodes
    const centerX = (pageWidth - totalBarcodeWidth) / 2; // Starting x position for the first barcode
    const barcodeY = 12; // Adjusted y position for better logo visibility
    const nameTextYOffset = barcodeY + barcodeHeight + 5; // Name text position
    const logoWidth = 5;
    const logoHeight = 5;
  
    for (let i = 0; i < selectedBarcodes.length; i += 2) {
      // Fetch data for the first barcode
      const product1 = barcode.data.find((item) => item.code === selectedBarcodes[i]);
      const img1 = product1 ? await loadImageToDataURI(product1.bar_code) : null;
  
      // Fetch data for the second barcode if available
      const product2 = selectedBarcodes[i + 1]
        ? barcode.data.find((item) => item.code === selectedBarcodes[i + 1])
        : null;
      const img2 = product2 ? await loadImageToDataURI(product2.bar_code) : null;
  
      // Add the first barcode with its details
      if (img1) {
        pdf.addImage(img1, "PNG", centerX, barcodeY, barcodeWidth, barcodeHeight);
        pdf.addImage(logoImg, "PNG", centerX + barcodeWidth - logoWidth, barcodeY - 8, logoWidth, logoHeight); // Logo above barcode
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.text(`Name: `, centerX, nameTextYOffset);
      }
  
      // Add the second barcode with its details, if available
      if (img2) {
        const xOffset = centerX + barcodeWidth + gap; // Start position for the second barcode
        pdf.addImage(img2, "PNG", xOffset, barcodeY, barcodeWidth, barcodeHeight);
        pdf.addImage(logoImg, "PNG", xOffset + barcodeWidth - logoWidth, barcodeY - 8, logoWidth, logoHeight); // Logo above barcode
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.text(`Name: `, xOffset, nameTextYOffset);
      }
  
      // Add a new page for the next set of barcodes
      if (i + 2 < selectedBarcodes.length) {
        pdf.addPage();
      }
    }
  
    // Save the PDF file
    pdf.save("barcodes.pdf");
  
    // Optionally, refresh barcode data
    const newdataToSend = {
      page: currentPage,
      limit: itemperPage,
      ...selectedStatus,
    };
    getbarcode(newdataToSend);
  
    setSelectedBarcodes([]);
  };
  
  
  
  

  return (
    <>
      <CommonBreadcrumb title="Barcode List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button
                    color="primary"
                    onClick={generatebar}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Generate Barcode"
                    )}
                  </Button>
                </div>
                <div className="d-flex gap-2 flex-wrap mb-3">
                  <Button
                    color={
                      !selectedStatus.isPrinted && !selectedStatus.isUsed
                        ? "primary"
                        : "danger"
                    }
                    style={{ minWidth: "max-content" }}
                    onClick={() => setSelectedStatus({})} // No additional parameter for "All"
                    size="sm"
                  >
                    Generated
                  </Button>
                  <Button
                    color={selectedStatus.isPrinted ? "primary" : "danger"}
                    style={{ minWidth: "max-content" }}
                    onClick={() => setSelectedStatus({ isPrinted: true })} 
                    size="sm"
                  >
                    Printed
                  </Button>
                  <Button
                    color={selectedStatus.isUsed ? "primary" : "danger"}
                    style={{ minWidth: "max-content" }}
                    onClick={() => setSelectedStatus({ isUsed: true, isPrinted: true })} 
                    size="sm"
                  >
                    Used
                  </Button>
                  <Button
                    color="primary"
                    onClick={generatePDF}
                    disabled={selectedBarcodes.length === 0 || selectedBarcodes.length > 24}
                  >
                    Print To PDF({selectedBarcodes.length})
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <div>
                      <Table hover responsive>
                        <thead>
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                              />
                            </th>
                            <th>Bar Code</th>
                            <th>Code</th>
                            <th>Is Used?</th>
                            <th>Is Printed?</th>
                         
                          </tr>
                        </thead>
                        <tbody>
                          {barcode?.loading ? (
                            <tr>
                              <td colSpan="7" className="text-center">
                                <Spinner color="secondary" className="my-4" />
                              </td>
                            </tr>
                          ) : barcode?.data?.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="text-center">
                                No Barcode Found
                              </td>
                            </tr>
                          ) : (
                            barcode?.data?.map((product, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={selectedBarcodes.includes(
                                      product.code
                                    )}
                                    onChange={() => toggleBarcode(product.code)}
                                  />
                                </td>
                                <td>
                                  <img
                                    src={product.bar_code}
                                    alt="barcode"
                                    style={{
                                      height: "80px",
                                      objectFit: "cover",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>{product.code}</td>
                                <td>{product.isUsed ? "Yes" : "No"}</td>
                                <td>{product.isPrinted ? "Yes" : "No"}</td>
                                {/* <td>
                                  <div className="circelBtnBx">
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleEdit(product.id)}
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleDelete(product._id)}
                                    >
                                      <FaTrashAlt />
                                    </Button>
                                  </div>
                                </td> */}
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                      <Stack className="rightPagination mt10" spacing={2}>
                        <Pagination
                          color="primary"
                          count={totalPages}
                          page={currentPage}
                          shape="rounded"
                          onChange={(event, value) => handlepagechange(value)}
                        />
                      </Stack>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BarcodeList;
