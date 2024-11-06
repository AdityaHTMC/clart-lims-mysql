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
  const itemperPage = 30;

  const totalPages = barcode?.total && Math.ceil(barcode?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
      ...selectedStatus, // Pass selected status in the payload
    };
    getbarcode(dataToSend);
  }, [currentPage, selectedStatus]);

  console.log(barcode, "barcode");

  const generatebar = async () => {
    setLoading(true); // Start loading

    const dataToSend = {
      quantity: 30,
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
        .map((product) => product._id),
    };
  
    // Call the Barcodeprint API function with the payload
    await Barcodeprint(dataToSend);
  
    const pdf = new jsPDF();
    const itemsPerPage = 24; // 8 rows * 3 columns
    let currentItem = 0;
  
    for (let index = 0; index < selectedBarcodes.length; index++) {
      const product = barcode.data.find(
        (item) => item.code === selectedBarcodes[index]
      );
      if (!product) continue;
  
      // Fetch image from URL and convert to data URI
      const img = await loadImageToDataURI(product.bar_code);
  
      // Calculate position for 3 columns and 8 rows
      const col = currentItem % 3;
      const row = Math.floor(currentItem / 3) % 8;
      const x = col * 70 + 10; // Adjust for spacing and centering
      const y = row * 35 + 10;
  
      // Add image
      pdf.addImage(img, "PNG", x, y, 55, 30); // Adjust image width and height
  
      currentItem++;
  
      // Add a new page after every 24 items
      if (currentItem % itemsPerPage === 0) {
        pdf.addPage();
        currentItem = 0;
      }
    }
  
    pdf.save("barcodes.pdf");
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
                    onClick={() => setSelectedStatus({ isPrinted: true })} // Pass isPrinted: true for "Printed"
                    size="sm"
                  >
                    Printed
                  </Button>
                  <Button
                    color={selectedStatus.isUsed ? "primary" : "danger"}
                    style={{ minWidth: "max-content" }}
                    onClick={() => setSelectedStatus({ isUsed: true })} // Pass isUsed: true for "Used"
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
                            <th>Action</th>
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
                                <td>
                                  <div className="circelBtnBx">
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleEdit(product._id)}
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
                                </td>
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
