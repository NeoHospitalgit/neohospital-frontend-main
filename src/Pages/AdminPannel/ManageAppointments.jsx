import React, { useState, useEffect } from "react";
import List from "./List";
import "./ManageAppointments.css";
import TopBarAdmin from "./TopBarAdmin";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

import JSZip from "jszip";

window.JSZip = JSZip;

function ManageAppointments() {
const [appointmentsData, setAppointmentsData] = useState([]);

const { authorizationToken, API } = useAuth();

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

```
  if (response.ok) {
    const data = await response.json();
    setAppointmentsData(data.appointments || []);
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
```

};

useEffect(() => {
getAppointmentsData();
}, []);

useEffect(() => {
if (appointmentsData.length > 0) {
const table = $("#appointmentTable").DataTable({
destroy: true,
pageLength: 25,

```
    dom: '<"top-section d-flex justify-content-between align-items-center mb-3"Bf>rtip',

    buttons: [
      {
        extend: "excelHtml5",
        title: "Appointments",
        className: "btn btn-success",
      },
      {
        extend: "csvHtml5",
        title: "Appointments",
        className: "btn btn-primary",
      },
      {
        extend: "print",
        title: "Appointments",
        className: "btn btn-dark",
      },
    ],
  });

  return () => {
    table.destroy();
  };
}
```

}, [appointmentsData]);

return (
<> <TopBarAdmin />

```
  <main>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 adminleft">
          <List />
        </div>

        <div className="col-md-9 adminright">
          <div className="addblog">
            <div className="addblogform">

              <h2>Manage Appointments</h2>

              {appointmentsData.length > 0 ? (
                <table
                  id="appointmentTable"
                  className="table table-bordered table-striped table-hover"
                >
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
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.number}</td>
                        <td>{item.doctorname}</td>
                        <td>{item.bookdate}</td>
                        <td>{item.booktime}</td>
                        <td>{item.message}</td>
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
```

);
}

export default ManageAppointments;
