// import { ArcElement, BarController, BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, RadialLinearScale, Title, Tooltip } from "chart.js";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useEffect, useState } from "react";
import Datatable from "../component/common/data-table";
import { ProductCategoryData } from "../Data/Product/Physical";
import { useCategoryContext } from "../helper/CategoryProvider";

import { toast } from "react-toastify";
// Register the necessary Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarController, BarElement, ArcElement, Filler, RadialLinearScale);

const CategoryPage = () => {
    const [open, setOpen] = useState(false);
    const { getCategoryList, category, create_category } = useCategoryContext()
    const [isProcessing, setIsProcessing] = useState(false);

    const onOpenModal = () => {
        setOpen(true);
    };
    const onCloseModal = () => {
        setOpen(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        console.log(Object.fromEntries(formdata))
        setIsProcessing(true)
        const res = await create_category(formdata)
        setIsProcessing(false)
        if(res?.success === true){
            toast.success("Category Added Successfully")
            setOpen(false)
            getCategoryList({page: 1, limit: 20})
        }else{
            toast.error(res?.message || 'Category can not be created')
        }
    }

    useEffect(() => {
        if(category?.data?.length === 0){
            getCategoryList({page: 1, limit: 20})
        }
    }, [])

    return (
        <>
            <CommonBreadcrumb title="Category"  />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Product Categoty" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={onOpenModal}>
                                        Add Category
                                    </Button>
                                    <Modal isOpen={open} toggle={onCloseModal}>
                                        <ModalHeader toggle={onCloseModal}>
                                            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                                                Add Physical Product
                                            </h5>
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form onSubmit={onSubmit}>
                                                <FormGroup>
                                                    <Label htmlFor="recipient-name" className="col-form-label">
                                                        Category Name :
                                                    </Label>
                                                    <Input type="text" required min={3} placeholder="Enter category name" name="title" disabled={isProcessing} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="message-text" className="col-form-label">
                                                        Category Image :
                                                    </Label>
                                                    <Input id="validationCustom02" type="file" required name="image" disabled={isProcessing} />
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={onCloseModal} disabled={isProcessing}>
                                                Save
                                            </Button>
                                            <Button color="secondary" onClick={onCloseModal} disabled={isProcessing}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">
                                    <Datatable myData={ProductCategoryData} multiSelectOption={false} pageSize={10} pagination={true} class="-striped -highlight" />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CategoryPage;
