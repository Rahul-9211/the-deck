import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import { useState } from "react";
const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;
  const [name,SetName] = useState('');
  const [email,SetEmail] = useState('');
  const [subject,SetSubject] = useState('');
  const [content ,SetContent] = useState('');
    return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row pb-0">
          <div className="col-12 md:col-6 lg:col-7">
            <form
              // className="contact-form"
              // method="POST"
              // action='/api'
              onSubmit={async (e)=>{
                // console.log("working");
                  e.preventDefault();
                  const data = await fetch('/api',{
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      name: name,
                      email : email,
                      subject : subject,
                      content : content
                    }),
                  });
                  const res = await data.json();
                  console.log(res);
              }}
            >
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="name"
                  type="text"
                  placeholder="Name"
                  onChange={(e)=>{
                    SetName(e.target.value)
                    console.log(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  onChange={(e)=>{
                    SetEmail(e.target.value)
                    console.log(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  onChange={(e)=>{
                    SetSubject(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-textarea w-full rounded-md"
                  rows="7"
                  name="message"
                  onChange={(e)=>{
                    SetContent(e.target.value)
                    console.log(content);
                  }}
                  placeholder="Your message"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Send Now
              </button>
            </form>
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
