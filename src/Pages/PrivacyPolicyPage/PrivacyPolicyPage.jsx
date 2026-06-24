
import React from "react";
import "./PrivacyPolicyPage.css";
import { Helmet } from "react-helmet";

function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Neo Hospital</title>
      </Helmet>

      <section className="policies-section">
        <div className="policies-header">
          <h1 className="policies-title">Privacy Policy – Neo Hospital</h1>
        
          <p className="policies-description">
            At Neo Hospital, we are committed to protecting your personal data
            and ensuring transparency about how your information is collected,
            used, and safeguarded.
          </p>
        
          <div className="ownership-notice">
            <p>
              <strong>
                This website (www.neohospital.com) is owned and operated by
                Muskan Medical Center Private Limited, operating under the brand
                name "Neo Hospital".
              </strong>
            </p>
          </div>
        </div>

        <div className="policy-content">

          <p>
            This Privacy Policy is published in accordance with the Information
            Technology Act, 2000, and the rules made thereunder.
          </p>

         <p>
          Muskan Medical Center Private Limited ("Company"),
          operating under the brand name "Neo Hospital",
          respects your privacy and is dedicated to maintaining
          the confidentiality of your personal information.
          This Policy outlines how we collect, store, use,
          and protect sensitive personal data and information ("SPDI").
        </p>
        
        <p>
          By accessing or using our website, digital platforms, or availing
          healthcare services at Neo Hospital, you consent to the terms of
          this Privacy Policy.
        </p>

          <h2>2. Information We Collect</h2>

          <p>
            We may collect the following types of information from patients,
            visitors, and users:
          </p>

          <ul>
            <li>
              <strong>Personal Information</strong> – such as name, gender,
              age, address, contact details, and identification numbers.
            </li>

            <li>
              <strong>Medical Information</strong> – health records, medical
              history, prescriptions, diagnostic reports, treatment details.
            </li>

            <li>
              <strong>Financial Information</strong> – payment details, billing
              information, insurance details.
            </li>

            <li>
              <strong>Technical Information</strong> – cookies, IP address,
              browser type, and website usage details.
            </li>
          </ul>

          <h2>3. Consent Mechanism</h2>

          <p>
            Before collecting any sensitive personal data or information,
            explicit consent is obtained from patients or their authorised
            representatives.
          </p>

          <p>
            By signing consent forms at the hospital or through digital
            acknowledgement on our website, you agree to provide accurate and
            voluntary information.
          </p>

          <p>
            You may withdraw your consent at any time by writing to us at the
            contact provided in this Policy. However, withdrawal of consent may
            impact our ability to provide certain services.
          </p>

          <h2>4. Purpose of Collection and Use</h2>

          <p>Your information is collected and used only for:</p>

          <ul>
            <li>
              Providing healthcare, diagnostic, and treatment services.
            </li>
            <li>
              Maintaining medical records for continuity of care.
            </li>
            <li>
              Processing payments, insurance claims, and related financial
              activities.
            </li>
            <li>
              Meeting legal and regulatory requirements.
            </li>
            <li>
              Improving hospital services, safety, and patient experience.
            </li>
          </ul>

          <h2>5. Data Protection and Security</h2>

          <p>
            Neo Hospital has implemented appropriate administrative, technical,
            and physical safeguards to protect your personal data against
            unauthorised access, misuse, alteration, or disclosure.
          </p>

          <h2>6. Disclosure of Information / Rights to Erasure and Nomination</h2>

          <p>
            We do not sell, rent, or trade your personal information. Your data
            may only be disclosed:
          </p>

          <ul>
            <li>
              To doctors, medical staff, or laboratories directly involved in
              your treatment.
            </li>
            <li>
              To insurance providers, if authorised by you.
            </li>
            <li>
              To government authorities, if required under law.
            </li>
          </ul>

          <h2>7. Rights of Information Providers</h2>

          <p>As per applicable law, you have the right to:</p>

          <ul>
            <li>Access and review the personal information you have shared.</li>
            <li>Request corrections or updates to your data.</li>
            <li>
              Withdraw consent for data usage (subject to hospital obligations).
            </li>
          </ul>

          <p>
            <strong>Exercising Your Rights:</strong> The mechanism for
            exercising your data rights is available for all Information
            Providers. The details regarding the communication channels for
            submitting such requests are published within the Privacy Policy
            available on the Company’s official website.
          </p>

          <p>
            Information Providers may submit a Data Rights Request Form
            (Annexure-1) through any of the following modes:
          </p>

          <ul>
            <li>
              Official website portal or Data Rights Email ID:
              it@neohospital.com
            </li>
            <li>
              Physical form submission at the HR / Medical Records / Admin
              Counter within the hospital premises.
            </li>
          </ul>

          <h2>8. Grievance Redressal</h2>

          <p>
            Neo Hospital has appointed a Grievance Officer to address any
            concerns related to the processing of personal data.
          </p>

          <div className="contact-box">
          <p><strong>Grievance Officer Name:</strong> Dr. Sachin Arora</p>
          <p><strong>Designation:</strong> Grievance Officer – Neo Hospital</p>
          <p><strong>Email:</strong> ms@neohospital.com</p>
          <p><strong>Phone:</strong> 9953110317</p>
          <p>
            <strong>Address:</strong>
            Muskan Medical Center Private Limited (Neo Hospital),
            D-170, 170A, 170B, Sector-50,
            Noida, Gautam Buddh Nagar,
            Uttar Pradesh - 201301
          </p>
        </div>
          <p>
            The Grievance Officer shall respond to your queries and complaints
            within the statutory timeline prescribed under the Information
            Technology Act and applicable rules.
          </p>

          <h2>9. Updates to This Policy</h2>

          <p>
            Neo Hospital reserves the right to modify or update this Privacy
            Policy at any time, and the same shall be published on our website
            with the date of the last revision.
          </p>

        </div>
      </section>
    </>
  );
}

export default PrivacyPolicyPage;

