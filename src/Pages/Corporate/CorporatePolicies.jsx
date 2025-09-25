import React from "react";
import "./CorporatePolicies.css";

function CorporatePolicies() {
  const policies = [
    {
      id: 1,
      title: "CORPORATE SOCIAL RESPONSIBILITY POLICY",
      description: "Our commitment to maintaining the highest standards of healthcare",
      pdfUrl: "/pdfs/corporate.pdf"
    },
     {
      id: 2,
      title: "VIGIL MECHANISM POLICY",
      description: "A mechanism to report unethical behavior.",
      pdfUrl: "/pdfs/vigil.pdf"
    },
     {
      id: 3,
      title: "ETHICS AT THE CODE",
      description: "Our commitment to ethical practices in all aspects of our operations.",
      pdfUrl: "/pdfs/Li.pdf"
    },
    {
      id: 4,
      title: "TRANSPARENT GOVERNANCE, CLEAR OWNERSHIP",
      description: "Our commitment to transparent governance and clear ownership structures.",
      pdfUrl: "pdfs/Transparent Governance.pdf"
    },
     {
      id: 5,
      title: "COMPLIANCE YOU CAN TRUST",
      description: "Our commitment to compliance and ethical practices.",
      pdfUrl: "pdfs/Compliance.pdf"
    },
    {
      id: 6,
      title: "Privacy Policy",
      description: "Our commitment to protecting your privacy and data security.",
      pdfUrl: "pdfs/privacypolicy.pdf"
    }
    
    // Add more policies as needed
  ];

  return (
    <section className="policies-section">
      <div className="policies-header">
        <h2 className="policies-title">Corporate Policies</h2>
        <div className="title-underline"></div>
        <p className="policies-description">
          Our corporate policies reflect our commitment to excellence, transparency, and patient care.
        </p>
      </div>

      <div className="policies-grid">
        {policies.map((policy) => (
          <div key={policy.id} className="policy-card" onClick={() => window.open(policy.pdfUrl, '_blank')}>
            <div className="card-content">
              <div className="card-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="card-title">{policy.title}</h3>
              <p className="card-description">{policy.description}</p>
              <div className="card-button">
                <span>View Policy</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CorporatePolicies;
