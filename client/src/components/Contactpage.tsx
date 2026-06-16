import React from "react";
import img2 from "../assets/pexels-pixabay-261763.jpg";
import e1 from "../assets/Letter.png";
import e2 from "../assets/FlyingPlane.png";

const Contactpage = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.currentTarget.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <>
      <div
        className="min-h-[35rem]"
        style={{
          background:
            "linear-gradient(135deg, rgba(66,179,245,.35) 0%, rgba(66,179,245,.55) 20%, rgba(51,119,255,.7) 100%)",
          mixBlendMode: "multiply",
        }}
      ></div>

      <div className="relative">aa
        <img
    src={e1}
    alt=""
    aria-hidden
    className="
      hidden md:block pointer-events-none select-none
      absolute right-[0rem] top-[-20rem] w-[400px]
      opacity-100 drop-shadow-xl rotate-[20deg] z-10
    "
  />
  <img
    src={e2}
    alt=""
    aria-hidden
    className="
      hidden md:block pointer-events-none select-none
      absolute left-[0rem] top-[-30rem] w-[500px]
      opacity-100 drop-shadow-xl rotate-[0deg] z-10
    "
  />
        <div className="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <h1 className="yeseva text-[2.4rem] md:text-6xl font-extrabold text-center text-[#0f1f3a] drop-shadow-sm">
            We Are Always Here to Help
          </h1>
          <p className="mt-2 mb-10 text-center text-[#0f1f3a]/80 ">
             Feel free to contact us with any questions.
          </p>
          <div
            className="min-w-[60rem] rounded-2xl flex shadow-xl"
            style={{ backgroundColor: "#fff8e1" }}
          >
            <div className="ml-10 mt-15 contacttext">
              Please Fill Out this Contact Form with Your Information
              <p>
                We will respond to you within a few business days so please be
                patient.
              </p>
              <div className="min-w-[5rem] mt-8 flex justify-center"></div>
            </div>
            <div>
              <form className="ml-20 mt-15 mb-25" onSubmit={onSubmit}>
                <input
                  className="block pl-4 py-3 min-w-[25rem] rounded-md formtext mb-4"
                  style={{ backgroundColor: "#f5eac6" }}
                  type="text"
                  name="first_name"
                  required
                  placeholder="First Name"
                />
                <input
                  className="block pl-4 py-3 min-w-[25rem] rounded-md formtext mb-4"
                  style={{ backgroundColor: "#f5eac6" }}
                  type="text"
                  name="last_name"
                  required
                  placeholder="Last Name"
                />
                <input
                  className="block pl-4 py-3 min-w-[25rem] rounded-md formtext mb-4"
                  style={{ backgroundColor: "#f5eac6" }}
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number"
                />
                <input
                  className="block pl-4 py-3 min-w-[25rem] rounded-md formtext mb-4"
                  style={{ backgroundColor: "#f5eac6" }}
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                />
                <textarea
                  className="block pl-4 py-3 min-w-[25rem] rounded-md formtext mb-4"
                  style={{ backgroundColor: "#f5eac6" }}
                  name="message"
                  required
                  placeholder="Your Message"
                ></textarea>
                <div className="flex justify-center mx-auto min-w-[20rem]">
                  <button
                    className="bg-black text-white px-34 py-3 rounded-md text-center formtextbtn"
                    type="submit"
                  >
                    Submit Form
                  </button>
                </div>
              </form>
              <span>{result}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[30rem]" style={{ backgroundColor: "#ffffff" }} />
      <div className="mb-30 mt-10">
        <div className="max-w-[65rem] flex justify-center mx-auto items-center">
          <div>
            <p className="contacttexth">Other Ways to Contact Us</p>
            <div className="mt-4 ml-2">
              <p>Email: contact@cvgca.org</p>
              <p>Phone: 925-699-9627</p>
              <p>Located: Mountain House California - 95391</p>
              <p>Facebook: CVGCA</p>
            </div>
          </div>
          <img src={img2} width="500" className="rounded-md shadow-lg" />
        </div>
      </div>
    </>
  );
};

export default Contactpage;
