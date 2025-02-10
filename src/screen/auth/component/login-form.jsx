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

const LoginForm = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [verified, setVerified] = useState(false);
  const recaptchaRef = useRef(null);
  const { admin_login, otp_request } = useAuthContext();
  const [formValues, setFormValues] = useState({
    email: "",
    otp: "",
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

    if (!isOtpSend) {
      await sendOtp(); // Call send OTP function
    } else {
      setIsProcessing(true);
      await admin_login(formValues);
      setIsProcessing(false);
    }
  };

  const sendOtp = async () => {
    setIsProcessing(true);
    const res = await otp_request(formValues);
    setIsProcessing(false);

    if (res.status === 200) {
      setIsOtpSend(true);
      setTimer(120); // Start the timer for 2 minutes
      toast.success("OTP sent successfully");
    } else {
      toast.error("Failed to send OTP");
    }
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Form className="form-horizontal auth-form" onSubmit={formSubmitHandle}>
      <FormGroup>
        <Input
          required
          onChange={handleUserValue}
          type="email"
          value={formValues.email}
          placeholder="Enter email"
          name="email"
          disabled={isOtpSend} // Disable email field if OTP is sent
        />
      </FormGroup>

      {!isOtpSend && formValues.email && (
        <ReCAPTCHA
          // sitekey="6LfZeIMqAAAAABOvtLmqRSwd3A4n1HaCm73yEoeO"  // for live 
          sitekey= "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" //  For testing in local
          onChange={onVerified}
          ref={recaptchaRef}
          size="normal"
        />
      )}

      {isOtpSend && (
        <>
          <FormGroup>
            <InputGroup>
              <Input
                required
                onChange={handleUserValue}
                type={showPassWord ? "number" : "password"}
                name="otp"
                value={formValues.otp}
                placeholder="Enter OTP"
                maxLength={6}
                minLength={6}
              />
              <InputGroupText onClick={() => setShowPassWord(!showPassWord)}>
                {showPassWord ? <Eye /> : <EyeOff />}
              </InputGroupText>
            </InputGroup>
            <div className="text-muted mt-2">
              {timer > 0
                ? `OTP expires in: ${formatTime(timer)}`
                : "OTP expired. Please resend."}
            </div>
          </FormGroup>
        </>
      )}

      <div className="form-button">
        {isOtpSend && timer <= 0 && (
          <Button
            color="secondary"
            type="button"
            onClick={sendOtp}
            disabled={isProcessing} // Disable button while processing
            className="me-3"
          >
            Resend OTP
          </Button>
        )}
        <Button
          color="primary"
          type="submit"
          disabled={!verified || isProcessing} // Disable if not verified
        >
          {isProcessing ? (
            <Spinner size="sm" />
          ) : isOtpSend ? (
            "Verify OTP"
          ) : (
            "Send OTP"
          )}
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
