/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
    Badge,
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
} from "reactstrap";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

import { FaTrashAlt } from "react-icons/fa";

import { Spinner } from "reactstrap";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";

const SpeciesCategoryList = () => {

    const { getSpeciesCategoryList, addSpeciesCategory, editSpeciesCategory, deleteSpeciesCategory, speciesCategoryList } =
        useCommonContext();


    const [formData, setFormData] = useState({
        title: "",
    });

    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [selectedvarity, setSelectedvarity] = useState({
        title: "",
        id: "",
    });

    useEffect(() => {
        getSpeciesCategoryList();
    }, []);

    const onOpenModal = () => {
        setOpen(true);
    };
    const onOpenModal2 = (product) => {
        setSelectedvarity(product);
        setModalOpen(true);
    };

    // Close the modal
    const onCloseModal2 = () => {
        setModalOpen(false);
        setSelectedvarity({
            title: "",
            id: "",
        });
    };

    const onCloseModal = () => {
        setOpen(false);
        setFormData({
            title: "",
            id: "",
        });
    };

    // Handle form input change
    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setSelectedvarity((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle submit for updating the brand
    const handleSubmits = () => {
        const dataToSend = {
            title: selectedvarity.title,
        }
        editSpeciesCategory(selectedvarity.id, dataToSend);
        onCloseModal2();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you wish to delete this category?")) {
            deleteSpeciesCategory(id);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = () => {
        addSpeciesCategory(formData);
        onCloseModal();
    };


    return (
        <>
            <CommonBreadcrumb title="Species Category" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={onOpenModal}>
                                        Add
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">
                                    <Table striped responsive>
                                        <thead>
                                            <tr>
                                                <th>Name </th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {speciesCategoryList?.loading ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        <Spinner color="secondary" className="my-4" />
                                                    </td>
                                                </tr>
                                            ) : speciesCategoryList?.data?.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        No Data Found
                                                    </td>
                                                </tr>
                                            ) : (
                                                speciesCategoryList?.data?.map((product, index) => (
                                                    <tr key={index}>
                                                        <td>{product.title}</td>

                                                        <td>
                                                            <div className="circelBtnBx">
                                                                <Button
                                                                    className="btn"
                                                                    color="link"
                                                                    onClick={() => onOpenModal2(product)}
                                                                >
                                                                    <FaEdit />
                                                                </Button>
                                                                <Button
                                                                    className="btn"
                                                                    color="link"
                                                                    onClick={() => handleDelete(product.id)}
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
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal
                isOpen={open}
                toggle={onCloseModal}
                className="modal-xg"
            >
                <ModalHeader toggle={onCloseModal}>
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                        Add
                    </h5>
                </ModalHeader>
                <ModalBody>
                    {" "}
                    {/* Scroll in Y-axis */}
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <FormGroup>
                            <Label htmlFor="title" className="col-form-label">
                                Title
                            </Label>
                            <Input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                id="title"
                            />
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={onCloseModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalOpen} toggle={onCloseModal2} className="modal-xg">
                <ModalHeader toggle={onCloseModal2}>
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                        Edit
                    </h5>
                </ModalHeader>
                <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <FormGroup>
                            <Label htmlFor="title" className="col-form-label">
                                Title:
                            </Label>
                            <Input
                                type="text"
                                name="title"
                                value={selectedvarity.title}
                                onChange={handleInputChanges}
                                id="title"
                            />
                        </FormGroup>


                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmits}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={onCloseModal2}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default SpeciesCategoryList;
