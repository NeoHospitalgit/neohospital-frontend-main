import React, { useState } from "react";
import "./CareerForm.css";
import "./Career.css";

function CareerForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualif] = useState("");
  const [experience, setApply] = useState("");
  const [apply, setResume] = useState("");
  const [resume, setExperience] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    // var nodemailer = require("nodemailer");

    // Validate inputs
    if (!name || !number || !email || !message) {
      window.alert("Please fill out all fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert("Please enter a valid email address.");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(number)) {
      window.alert("Please enter a valid Indian phone number.");
      return;
    }

    // try {
    //   var transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //       user: "smtpmail556@gmail.com",
    //       pass: "lygerpmdlbrqrehi",
    //     },
    //   });

    //   // Compose email message
    //   var mailOptions = {
    //     from: email,
    //     to: "krapter.dev@gmail.com",
    //     subject: "Job Application From Neo Hospital",
    //     html: `
    //       <p>Name: ${name}</p>
    //       <p>Phone Number: ${number}</p>
    //       <p>Email: ${email}</p>
    //       <p>Address: ${address}</p>
    //       <p>Qualification: ${qualification}</p>
    //       <p>Experience: ${experience}</p>
    //       <p>Apply for: ${apply}</p>
    //       <p>Message: ${message}</p>
    //     `,
    //   };

    // Send email

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });

    setName("");
    setNumber("");
    setEmail("");
    setMessage("");
    setAddress("");
    setQualif("");
    setApply("");
    setResume("");
    setExperience("");

    window.alert("Your enquiry has been sent successfully!");
    // } catch (error) {
    //   console.error("Failed to send email:", error);
    //   window.alert("Failed to send enquiry. Please try again later.");
    // }
  };

  return (
    <section id="careerform">
      <div className="container ">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="about-title">
              <span>Career Page</span>
            </h2>

            <p>
              You are welcome to send us your resume by email in soft form at{" "}
              <strong>
                <a className="txtnon" href="mailto:hr@neohospital.com">
                  hr@neohospital.com
                </a>
              </strong>
              .You can also  submit your resume directly on reception of Neo
              Hospital. Kindly include your full information about education,
              experience & Employers, current & Expected Salary.
            </p>

            <p>
              <strong>Note : -</strong> Candidate preferred from hospital
              background.
            </p>
            <h5 className="notetitle">
              Current Opening (Posted On 16-03-2023) –
            </h5>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <table class="table ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Qualification</th>
                    <th scope="col">Experience</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>ICU/HDU Nurse</td>
                    <td>Bsc. / GNM</td>
                    <td>Min 3 Years</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>ICU/HDU Nurse</td>
                    <td>Bsc. / GNM</td>
                    <td>Min 3 Years</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-4  sdfgh">
              <div className="cont  act_field">
                <form onSubmit={sendEmail}>
                  <input
                    type="text"
                    required
                    className="form-control form-group"
                    placeholder="Full Name *"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="number"
                    required
                    className="form-control form-group"
                    placeholder="Phone Number *"
                    name="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <input
                    type="email"
                    className="form-control form-group"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control form-group"
                    placeholder="Address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control form-group"
                    placeholder="Qualification"
                    name="qualification"
                    value={qualification}
                    onChange={(e) => setQualif(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control form-group"
                    placeholder="Experience *"
                    name="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control form-group"
                    placeholder="Apply for *"
                    name="apply"
                    value={apply}
                    onChange={(e) => setApply(e.target.value)}
                  />
                  <input
                    type="file"
                    className="form-control form-group custom-file"
                    placeholder="Upload Your Resume"
                    name="resume"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                  />
                  <textarea
                    className="form-control form-group"
                    placeholder="Message"
                    name="message"
                    value={message}
                    rows={3}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <button type="submit" className="contact_form_submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareerForm;
