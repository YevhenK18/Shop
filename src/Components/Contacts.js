import React from 'react';

const Contacts = () => {
  return (
    <div>
      <h1>Contacts</h1>
      <p>Here you can find our contact information.</p>
      <ul>
        <li>
          <strong>Email:</strong> <a href="mailto:example@example.com">example@example.com</a>
        </li>
        <li>
          <strong>Phone:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a>
        </li>
        <li>
          <strong>Location:</strong> 123 Example St, City, Country
        </li>
      </ul>

      <h2>Our Location</h2>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4084402.323926081!2d29.661908779536606!3d1.3722013565108075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1771a69f6499f945%3A0x874155ce43014549!2z0KPQs9Cw0L3QtNCw!5e0!3m2!1sru!2spl!4v1729451260904!5m2!1sru!2spl" 
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Contacts;
