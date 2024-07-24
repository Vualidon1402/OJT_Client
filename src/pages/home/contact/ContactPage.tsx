import React from "react";
import ContactInfo from "./component/ContactInfo";
import ContactForm from "./component/ContactFormProps";
import "./ContactPage.scss";

const ContactPage: React.FC = () => {
  const handleFormSubmit = (formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    console.log("Form data submitted:", formData);
    // Bạn có thể gửi dữ liệu đến server hoặc xử lý dữ liệu ở đây
  };

  return (
    <div className="contact-page">
      <div className="container">
        <ContactInfo />
        <ContactForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default ContactPage;
