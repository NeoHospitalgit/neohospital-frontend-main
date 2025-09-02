import React from "react";

function Complaints() {
  return (
    <div className="complaints-container">
      <h2>Grievance Redressal & Data Privacy Compliance Statement</h2>
      <p>
        At NEO Super Speciality Hospital, we prioritize patient safety, data
        privacy, and ethical healthcare practices. We hereby confirm that the
        Company and its Subsidiary have complied with the following requirements
        under the Information Technology Act, 2000 and associated rules:
      </p>
      <hr />
      <h3>(a) Implementation of a Privacy Policy</h3>
      <p>
        We have implemented a comprehensive Privacy Policy in accordance with the
        Information Technology Act and applicable IT Rules, which outlines how
        sensitive personal data or information (SPDI) is collected, used, stored,
        and secured.
        <br />
        The Privacy Policy is published and accessible on our official website:
        <br />
        <a
          href="[Insert Website Link]"
          target="_blank"
          rel="noopener noreferrer"
        >
          [Insert Website Link]
        </a>
      </p>
      <hr />
      <h3>(b) Consent Mechanism for Data Collection</h3>
      <p>
        A formal mechanism is in place to obtain prior consent from all
        individuals (patients, attendants, or stakeholders) before collecting any
        sensitive personal data or information. This consent is collected either
        in digital or written form and is taken before:
      </p>
      <ul>
        <li>Medical treatment or procedures</li>
        <li>Sharing information with third parties (insurance, labs, etc.)</li>
        <li>Any data retention for administrative or legal purposes</li>
      </ul>
      <hr />
      <h3>(c) Appointment of a Grievance Officer & Online Publication</h3>
      <p>
        We have appointed a dedicated Grievance Officer, whose name and contact
        details are published on our official website and are also provided
        below for your reference.
      </p>
      <h4>Grievance Officer Details</h4>
      <ul>
        <li>Name: Dr. Sachin Arora</li>
        <li>Designation: Grievance Officer – Neo Hospital</li>
        <li>
          Email:{" "}
          <a href="mailto:ms@neohospital.com">ms@neohospital.com</a>
        </li>
        <li>
          Phone: <a href="tel:9953110317">9953110317</a>
        </li>
        <li>
          Address: Neo Hospital, D-170, 170A, 170B, Sector - 50, Noida, Gautam
          Buddha Nagar, Uttar Pradesh – 201301
        </li>
      </ul>
      <hr />
      <h3>How to Raise a Grievance</h3>
      <ul>
        <li>
          Email:{" "}
          <a href="mailto:ms@neohospital.com">ms@neohospital.com</a>
        </li>
        <li>Phone: 9953110317 (Mon–Sat, 9:00 AM – 6:00 PM)</li>
        <li>
          In-Person: Visit the reception and request to meet the Grievance
          Officer
        </li>
      </ul>
      <hr />
      <h3>Grievance Redressal Process</h3>
      <ol>
        <li>Acknowledgement – Within 48 working hours</li>
        <li>Review – Internal evaluation with concerned department</li>
        <li>Resolution – Final reply within 30 working days</li>
        <li>
          Escalation – If unresolved, the issue can be escalated to senior
          hospital management
        </li>
      </ol>
      <hr />
      <h3>Our Commitment</h3>
      <ul>
        <li>
          Respecting your privacy and protecting your personal information
        </li>
        <li>Providing timely and fair grievance redressal</li>
        <li>Following all applicable Indian laws and medical ethics</li>
        <li>Using patient feedback to improve our services continuously</li>
      </ul>
      <p>Your trust and safety are our top priority.</p>
    </div>
  );
}

export default Complaints;
