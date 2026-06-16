import React from "react";
import e1 from "../assets/Checklist.png";
import e2 from "../assets/Time.png";

const Volunteeringpage = () => {
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

      <section className="relative overflow-hidden pt-[8rem] pb-20">

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(66,179,245,.35) 0%, rgba(66,179,245,.55) 20%, rgba(51,119,255,.7) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.06) 0 1px, transparent 1.5px), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.06) 0 1px, transparent 1.5px)",
            backgroundSize: "24px 24px, 30px 30px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h1 className="yeseva text-[2.4rem] md:text-6xl font-extrabold text-[#0f1f3a] drop-shadow-sm">
            Volunteer With Us
          </h1>
          <p className="mt-3 text-[#0f1f3a]/80 text-lg max-w-2xl mx-auto">
            Help build a stronger, more connected community.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 100%)",
          }}
        />
      </section>

      <section className="bg-white py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-semibold crimson text-[#0f1f3a] mb-4">Why Volunteer?</h2>
          <p className="text-[#0f1f3a]/80 text-lg pl-2 leading-relaxed">
            Volunteering with CVGCA offers you the opportunity to give back to your community, learn new skills, and make lasting connections with others who share your values. Whether you’re helping out at local events, assisting with logistics, or simply offering your time, every contribution counts. Your involvement helps preserve our cultural traditions, support youth education, and bring joy to hundreds of families in the Mountain House area.
          </p>
        </div>
      </section>

      <section className="py-5 px-6 bg-whtite">
        <img
          src={e1}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute left-[3rem] top-[0rem] w-[300px]
      opacity-100 drop-shadow-xl rotate-[-20deg] z-10
    "
        />
         <img
          src={e2}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute right-[2rem] top-[10rem] w-[350px]
      opacity-100 drop-shadow-xl rotate-[10deg] z-0
    "
        />
        <div className="max-w-6xl mx-auto rounded-[2rem] shadow-xl bg-[#704e43] flex flex-col md:flex-row overflow-hidden">

          <div className="flex-1 p-12 text-white">
            <h3 className="text-4xl contacttexth mb-2">Volunteer Interest Form</h3>
            <p className="contacttext2 mt-4 text-[0.95rem] text-white/80 leading-relaxed">
              Let us know you're interested in volunteering! Just fill out the form and we’ll follow up with next steps.
            </p>
          </div>

          <div className="flex-1 bg-[#5d4037] p-10">
            <form onSubmit={onSubmit} className="space-y-5 text-white">
              <input
                className="w-full px-4 py-3 rounded-md bg-[#6d4c41] placeholder-white/70 formtext"
                type="text"
                name="first_name"
                required
                placeholder="First Name"
              />
              <input
                className="w-full px-4 py-3 rounded-md bg-[#6d4c41] placeholder-white/70 formtext"
                type="text"
                name="last_name"
                required
                placeholder="Last Name"
              />
              <input
                className="w-full px-4 py-3 rounded-md bg-[#6d4c41] placeholder-white/70 formtext"
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
              />
              <input
                className="w-full px-4 py-3 rounded-md bg-[#6d4c41] placeholder-white/70 formtext"
                type="email"
                name="email"
                required
                placeholder="Email"
              />
              <input
                className="w-full px-4 py-3 rounded-md bg-[#6d4c41] placeholder-white/70 formtext"
                type="number"
                name="age"
                required
                placeholder="Age"
              />
              <input
                className="w-full px-4 py-3 rounded-md bg-[#6d4c41] placeholder-white/70 formtext"
                type="text"
                name="availability"
                required
                placeholder="Availability (e.g. weekends)"
              />
              <textarea
                className="w-full px-4 py-3 rounded-md bg-[#6d4c41] placeholder-white/70 formtext"
                name="message"
                rows={4}
                placeholder="Tell us anything else you'd like us to know!"
              ></textarea>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="bg-black text-white px-10 py-3 rounded-md hover:bg-gray-900 transition formtextbtn"
                >
                  Submit Form
                </button>
                <p className="mt-2 text-sm text-white/80">{result}</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-5 mb-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-semibold crimson text-[#0f1f3a] mb-4">Cant Volunteer Right Now? No Problem.</h2>
          <p className="text-[#0f1f3a]/80 text-lg pl-2 leading-relaxed">
            You can still support us by making a donation. Every contribution helps us continue our mission of serving the community and preserving our cultural heritage. Your generosity makes a difference!
          </p>
        </div>
        <div className="mx-auto text-center mt-10">
          <a
            href="/donations"
            className=" bg-[#000] text-white px-8 py-3 rounded-md text-lg hover:bg-gray-900 transition"
          >
            Donate Now
          </a>
        </div>
      </section>

    </>
  );
};

export default Volunteeringpage;
