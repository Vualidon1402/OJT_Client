import React from "react";
import "./ContactInfo.scss";

const ContactInfo: React.FC = () => {
  return (
    <div className="contact-info">
      <div className="info-section">
        <div className="icon">📞</div>
        <h3>Call To Us</h3>
        <p>We are available 24/7, 7 days a week.</p>
        <p>Phone: +8801611112222</p>
      </div>
      <hr />
      <div className="info-section">
        <div className="icon">✉️</div>
        <h3>Write To Us</h3>
        <p>Fill out our form and we will contact you within 24 hours.</p>
        <p>Emails: customer@exclusive.com</p>
        <p>Emails: support@exclusive.com</p>
      </div>
    </div>
  );
};

export default ContactInfo;
