import Wrapper from "../assets/wrappers/LandingPage";
import gki from "../assets/images/gki.svg";
// import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>{/* <Logo /> */}</nav>
      <div className="container page">
        <div className="info">
          <h1>
            GKI<span> Taman</span> Cibunut
          </h1>
          <h4>Welcome to GKI Taman Cibunut Integrated Management System</h4>
          <br />
          <p>Welcome to GKI Taman Cibunut Integrated Management System</p>
          {/* <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login
          </Link> */}
        </div>
        <img src={gki} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
