/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaChair, FaCalendarAlt } from "react-icons/fa";
import {
  BsFillProjectorFill,
  BsFillPersonFill,
  BsFillMicFill,
} from "react-icons/bs";
import {
  Link,
  Form,
  useLoaderData,
  useOutletContext,
  redirect,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Ruangan";
import JobInfo from "./JobInfo";

// supaya daynya lebih mudah
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { RUANGAN_STATUS } from "../../../utils/constants";
import { useContext, useState } from "react";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";
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
  const date = day(jadwal).format("DD/MM/YYYY HH:mm").replace("T", " ");
  const { user } = useOutletContext();

  const [statusButton, setStatusButton] = useState();

  let button;
  if (statusRuangan === RUANGAN_STATUS.AVAILABLE) {
    button = "Booking";
  } else if (statusRuangan === RUANGAN_STATUS.OCCUPIED) {
    button = "Selesai";
  } else {
    if (user.role === "admin" || user.role === "staff kantor") {
      button = "Approve";
    } else {
      button = "Waiting";
    }
  }

  const showButton = (buatan) => {
    if (button === "Selesai") {
      return (
        <Form method="post" action={`../reset/${noRuangan}`}>
          <input type="hidden" name="userId" value={user.id} />
          <button
            type="submit"
            className="btn delete-btn"
            style={{
              display:
                user.role === "admin" ||
                user.role === "staff kantor" ||
                user.role === buatan
                  ? "block"
                  : "none",
            }}
          >
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
        <Form method="post" action={`../approve/${noRuangan}`}>
          <input type="hidden" name="userId" value={user.id} />
          <button
            type="submit"
            className="btn delete-btn"
            disabled={
              user.role === "admin" || user.role === "staff kantor"
                ? false
                : true
            }
          >
            {button}
          </button>
        </Form>
      );
    }
  };

  return (
    <Wrapper>
      <header>
        <div className="info">
          <h3>{namaRuangan}</h3>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaCalendarAlt />} text={jadwal != "-" ? date : "-"} />
          <div className={`status ${statusRuangan.toLowerCase()}`}>
            {statusRuangan}
          </div>
          <JobInfo icon={<FaChair />} text={kapasitasRuangan} />
          <JobInfo icon={<BsFillPersonFill />} text={komisi} />
          <JobInfo icon={<BsFillProjectorFill />} text={keteranganProjector} />
          <JobInfo icon={<BsFillMicFill />} text={keteranganSoundSystem} />
        </div>

        <footer className="actions">{showButton(komisi)}</footer>
      </div>
    </Wrapper>
  );
};

export default Ruangan;
