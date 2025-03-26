/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Table,
} from "reactstrap";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useMasterContext } from "../helper/MasterProvider";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { Pagination, Stack } from "@mui/material";
import { useRef } from "react";

const DailyReport = () => {
    const inputRef = useRef();
    const { dailyReportList, getDailyReportList, uploadDailyReport } = useMasterContext();
    const [isProcessing, setIsProcessing] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    // const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 8;

    const totalPages = dailyReportList?.total && Math.ceil(dailyReportList?.total / itemperPage);


    useEffect(() => {
        const dataToSend = {
            page: currentPage,
            limit: itemperPage,
        };
        getDailyReportList(dataToSend);
    }, [currentPage]);

    const handlepagechange = (newpage) => {
        setCurrentPage(newpage);
    };

    const onInputTrigger = () => {
        inputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files
        if (file.length > 0) {
            const formData = new FormData()
            console.log(file[0])
            formData.append('file', file[0])
            setIsProcessing(true)
            const response = await uploadDailyReport(formData)
            setIsProcessing(false)
            if (response?.status === 200) {
                inputRef.current.value = ''
                getDailyReportList({ limit: itemperPage });
            }
        }
    }

    return (
        <>
            <CommonBreadcrumb title="Parameter Group List" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <input
                                        type="file"
                                        accept=".csv, .xlsx"
                                        onChange={handleFileChange}
                                        style={{ display: "none" }}
                                        ref={inputRef}
                                    />
                                    <Button color="primary" onClick={onInputTrigger} disabled={isProcessing}>
                                        {isProcessing ? <Spinner /> : "Upload Report File"}

                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">
                                    <Table striped responsive>
                                        <thead>
                                            <tr>
                                                <th>File </th>
                                                <th>Uploaded By</th>
                                                <th>Uploaded At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dailyReportList?.loading ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        <Spinner color="secondary" className="my-4" />
                                                    </td>
                                                </tr>
                                            ) : dailyReportList?.data?.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        No Data Found
                                                    </td>
                                                </tr>
                                            ) : (
                                                dailyReportList?.data?.map((product, index) => {
                                                    const fileName = product.report ? product.report?.split('/')?.pop() : "Download File";
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <a href={product.report} target="_blank" rel="noopener noreferrer" download>
                                                                    {fileName}
                                                                </a>
                                                            </td>
                                                            <td>{product.name}</td>
                                                            <td>{new Date(product.created_at).toLocaleDateString("en-GB")}</td>

                                                            <td>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default DailyReport;
