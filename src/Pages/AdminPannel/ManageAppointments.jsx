import React, { useState, useEffect } from "react";
import List from "./List";
import TopBarAdmin from "./TopBarAdmin";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

function ManageAppointments() {

const [appointmentsData, setAppointmentsData] = useState([]);

const { authorizationToken, API } = useAuth();

// ======================================
// GET APPOINTMENTS
// ======================================

const getAppointmentsData = async () => {

try {

  const response = await fetch(
    `${API}/api/sendmails/appointments`,
    {
      method: "GET",

      headers: {
        Authorization: authorizationToken,
      },
    }
  );

  if (response.ok) {

    const data = await response.json();

    setAppointmentsData(data.appointments);

  } else if (response.status === 404) {

    setAppointmentsData([]);

    toast.info("No Appointments Found");

  } else {

    throw new Error("Failed to fetch appointments");

  }

} catch (error) {

  console.error(error);

  toast.error("Failed to fetch appointments");

}

};

useEffect(() => {

getAppointmentsData();

}, []);

return (

<>

  <TopBarAdmin />

  <main>

    <div className="container-fluid">

      <div className="row">

        <div className="col-md-3 adminleft">

          <List />

        </div>

        <div className="col-md-9 adminright">

          <div className="addblog">

            <div className="addblogform">

              <h2>
                Manage Appointments
              </h2>

              {appointmentsData.length ? (

                <table className="table table-dark">

                  <thead>

                    <tr>

                      <th>ID</th>

                      <th>Name</th>

                      <th>Email</th>

                      <th>Number</th>

                      <th>Doctor</th>

                      <th>Date</th>

                      <th>Time</th>

                      <th>Message</th>

                    </tr>

                  </thead>

                  <tbody>

                    {appointmentsData.map((item, index) => (

                      <tr key={item._id}>

                        <td className="ptd">
                          {index + 1}
                        </td>

                        <td className="ptd">
                          {item.name}
                        </td>

                        <td className="ptd">
                          {item.email}
                        </td>

                        <td className="ptd">
                          {item.number}
                        </td>

                        <td className="ptd">
                          {item.doctorname}
                        </td>

                        <td className="ptd">
                          {item.bookdate}
                        </td>

                        <td className="ptd">
                          {item.booktime}
                        </td>

                        <td className="ptd">
                          {item.message}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              ) : (

                <h3 className="text-danger text-center py-5">
                  No Appointments Found
                </h3>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  </main>

</>

);

}

export default ManageAppointments;
