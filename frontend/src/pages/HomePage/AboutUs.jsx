import second3D from "../../assets/svg/second_3D.svg";
import camera3D from "../../assets/svg/camera_3D.svg";
function AboutUs() {
  return (
    <div id="about" className="mx-[78px] my-60">
      <div className="flex ">
        <img className="max-w-40" src={second3D} alt="3D Image" />
        <div className="flex items-center mx-8">
          <h1 className="text-white text-6xl font-extrabold">About Us</h1>
        </div>
      </div>
      <div className="flex mx-5 ml-10">
        <div className="text-white font-medium font-inter text-[23px] tracking-normal leading-10 max-w-[97%] text-justify">
          <p>
            Youvative is a content creation and strategy platform designed to
            help professionals,
          </p>
          <p>
            especially content creators, build a powerful online presence. We
            specialize in strategic content planning, storytelling, scripting,
            and high-quality video editing, ensuring your brand communicates
            effectively and engages the right audience. By combining creativity
            with data-driven insights, we craft content that is both compelling
            and results-driven. With future innovations in AI, automation, and
            advanced analytics, Youvative is redefining how professionals
            create, optimize, and scale their digital presence
          </p>
        </div>
        <div className="flex flex-col justify-end p-0 min-h-[100%]">
          <img
            className="max-w-22  ml-5 "
            src={camera3D}
            alt="3D Camera Image"
          />
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
