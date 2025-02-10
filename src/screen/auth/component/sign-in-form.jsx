/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff } from "react-feather";
import {
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Label,
    Spinner,
} from "reactstrap";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../helper/AuthProvider";
import ReCAPTCHA from "react-google-recaptcha";

export const SignIn = () => {
    const [showPassWord, setShowPassWord] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [timer, setTimer] = useState(0); // Timer in seconds
    const [verified, setVerified] = useState(false);
    const { admin_sign_in } = useAuthContext();
    const recaptchaRef = useRef(null);
    const [formValues, setFormValues] = useState({
        password: ''
    });

    const handleUserValue = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
        if (event.target.name === "email") {
            resetRecaptcha();
        }
    };

    const onVerified = () => {
        setVerified(true);
    };

    const resetRecaptcha = () => {
        setVerified(false);
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
    };

    const formSubmitHandle = async (event) => {
        event.preventDefault();
        setIsProcessing(true);
        await admin_sign_in(formValues);
        setIsProcessing(false);
    };

    // Timer effect to decrement every second
    useEffect(() => {
        let timerInterval;
        if (timer > 0) {
            timerInterval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        // Cleanup timer on unmount
        return () => clearInterval(timerInterval);
    }, [timer]);



    return (
        <Form className="form-horizontal auth-form" onSubmit={formSubmitHandle}>
            <FormGroup>
                <InputGroup onClick={() => setShowPassWord(!showPassWord)}>
                    <Input required onChange={handleUserValue} type={showPassWord ? "text" : "password"} name="password" value={formValues.password} placeholder="Enter Password" />
                    <InputGroupText>{showPassWord ? <Eye /> : <EyeOff />}</InputGroupText>
                </InputGroup>
            </FormGroup>
            <ReCAPTCHA
                // sitekey="6LfZeIMqAAAAABOvtLmqRSwd3A4n1HaCm73yEoeO"  // for live 
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" //  For testing in local
                onChange={onVerified}
                ref={recaptchaRef}
                size="normal"
            />
            <div className="form-button">
                <Button
                    color="primary"
                    type="submit"
                    disabled={!verified || isProcessing} // Disable if not verified
                >
                    {isProcessing ? (
                        <Spinner size="sm" />
                    ) : "Login"}
                </Button>

            </div>
        </Form>
    );
};


