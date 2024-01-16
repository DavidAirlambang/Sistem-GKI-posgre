import { useNavigation } from "react-router-dom";
const SubmitBtn = ({ formBtn, onclick }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && "form-btn"} `}
      disabled={isSubmitting}
      onClick={() => {
        console.log("Button clicked");
        onclick();
      }}
    >
      {isSubmitting ? "submitting" : "submit"}
    </button>
  );
};
export default SubmitBtn;
