import React, { useState } from "react";

const Contact = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    email: "",
    message: "",
  });

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // connect with firebase
  const submitData = async (event) => {
    event.preventDefault();
    const { firstName, email, message } = userData;

    if (firstName && email && message) {
      const res = fetch(
        "https://contactform-30c3e-default-rtdb.asia-southeast1.firebasedatabase.app/userdatarecords.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            email,
            message,
          }),
        }
      );

      if (res) {
        setUserData({
          firstName: "",
          email: "",
          message: "",
        });
        alert("Data Stored");
      } else {
        alert("Please Fill Full Form");
      }
    } else {
      alert("Please Fill Full Form");
    }
  };

  return (
    <>
    <div class="card">
      <h5 class="card-header">Get in Touch</h5>
        <div class="card-body">
            <form method="POST">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Name</label>
                <input
                          type="text"
                          name="firstName"
                          id=""
                          className="form-control"
                          placeholder="First Name"
                          value={userData.firstName}
                          onChange={postUserData}
                          required
                        />
                </div>
                <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label">Email address</label>
                <input
                          type="text"
                          name="email"
                          id=""
                          className="form-control"
                          placeholder="Email ID"
                          value={userData.email}
                          onChange={postUserData}
                          required
                        />
                </div>
                <div class="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">Message</label>
                <input
                          type="text"
                          name="message"
                          id=""
                          className="form-control"
                          placeholder="Enter Your Message"
                          value={userData.message}
                          onChange={postUserData}
                          required
                        />
                </div>
              </form>
              <button type="button" class="btn btn-success" onClick={submitData}>Submit</button>
        </div>
    </div>
    </>
  );
};

export default Contact;