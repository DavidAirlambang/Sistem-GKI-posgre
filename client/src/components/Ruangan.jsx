/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaChair, FaCalendarAlt } from "react-icons/fa";
import {
  BsFillProjectorFill,
  BsFillPersonFill,
  BsFillMicFill,
} from "react-icons/bs";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Ruangan";
import JobInfo from "./JobInfo";

// supaya daynya lebih mudah
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { RUANGAN_STATUS } from "../../../utils/constants";
day.extend(advancedFormat);

const Ruangan = ({
  noRuangan,
  namaRuangan,
  kapasitasRuangan,
  keteranganProjector,
  keteranganSoundSystem,
  statusRuangan,
  jadwal,
  komisi,
}) => {
  const date = day(jadwal).format("MMM Do, YYYY");

  let button;
  if (statusRuangan === RUANGAN_STATUS.AVAILABLE) {
    button = "Booking";
  } else if (statusRuangan === RUANGAN_STATUS.OCCUPIED) {
    button = "Selesai";
  } else {
    button = "waiting";
  }

  const showButton = () => {
    if (button === "Selesai") {
      return (
        <Form method="post" action={`../delete-job/${noRuangan}`}>
          <button type="submit" className="btn delete-btn">
            {button}
          </button>
        </Form>
      );
    } else if (button === "Booking") {
      return (
        <Link to={`../booking/${noRuangan}`} className="btn edit-btn">
          {button}
        </Link>
      );
    } else {
      return (
        <button type="submit" className="btn delete-btn" disabled>
          {button}
        </button>
      );
    }
  };

  return (
    <Wrapper>
      <header>
        <div className="info">
          <h3>{namaRuangan}</h3>
          <p>{jadwal}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <div className={`status ${statusRuangan.toLowerCase()}`}>
            {statusRuangan}
          </div>
          <JobInfo icon={<FaChair />} text={kapasitasRuangan} />
          <JobInfo icon={<BsFillPersonFill />} text={komisi} />
          <JobInfo icon={<BsFillProjectorFill />} text={keteranganProjector} />
          <JobInfo icon={<BsFillMicFill />} text={keteranganSoundSystem} />
        </div>

        <footer className="actions">
          {/* <Link to={`../booking/${noRuangan}`} className="btn edit-btn">
            {button}
          </Link>
          <Form method="post" action={`../delete-job/${noRuangan}`}>
            <button type="submit" className="btn delete-btn">
              Selesai
            </button>
          </Form> */}
          {showButton()}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Ruangan;
