import starIcon from "../../assets/svg/star_icon.svg"
import { Link } from "react-scroll";
import AnessProfile from "../../assets/png/aness_hassnaoui.png"
import aliAlhamidi from "../../assets/png/ali_alhamid.jpg"
import moathLail from "../../assets/png/moath_lail.png"
import starRate from "../../assets/svg/star_rate.svg"
function Testimonials(){
  return(
    <div id="testimonials" className="flex justify-between mx-[78px]">
      <div className="max-w-[50%] ">
        <div className="grid grid-row-2 gap-4 text-6xl font-extrabold text-[#FFFFFF]">
          <h1 >
          Our Trusted 
          </h1>
          <h1 >
          Client Testimonial
          </h1>
        </div>
        <p className="text-[#FFFFFF] font-medium text-justify text-[23px] tracking-normal my-8 leading-10">
          We take pride in the impact we create for our clients. Their success stories and positive experiences reflect our commitment to excellence. Hear from our satisfied clients and see how Youvative has helped them elevate their content strategy and online presence.
        </p>
        <div className="max-w-41 p-[2px] bg-gradient-to-r from-[#5614D2] to-[#3C4649] hove:from-[#5614D2] hover:to-[#198FAB] transition-transform hover:scale-105 duration-300 rounded-full font-bold">
          <button className="h-12 w-40 flex justify-center items-center bg-gradient-to-t from-[#4A4452] to-[#5F16E9] rounded-full cursor-pointer">
            <img className="max-h-4 mr-3" src={starIcon} alt="Star Icon" />
            <Link to="offre" className="bg-gradient-to-r from-[#FFE2DA] to-[#814F6A] bg-clip-text text-transparent">Explore Offre</Link>           
          </button>
        </div>
      </div>
      <div className="grid grid-rows-3 gap-4 max-w-[40%]">
        <div className="bg-gradient-to-r from-[#5F16E9] to-[#21BFE4] p-[2px] rounded-md ">
          <div className="flex justify-center w-full bg-gradient-to-t from-[#6724e4] to-[#2B0A69] rounded-md">
            <div className="flex flex-between max-w-[95%]">
              <div className="flex min-w-[25%]  flex-col justify-start items-center min-h-full mt-2 leading-5">
              <div className="bg-gradient-to-r from-[#5614D2] to-[#21BFE4] p-[1.5px] rounded-full">
                <img className="w-16 h-16 rounded-full " src={AnessProfile} alt="Aness Hassaoui Photo Profile" />
              </div>
              <span className="text-[#CDB7F8] ">Anes hassnaoui</span>
              <span className="text-[#21BFE4] text-1xl font-bold">929K</span>
              <span className="text-[#CDB7F8] ">Followers</span>
              </div>

              <div className="flex flex-col items-end text-[23px] text-[#FFFFFF]  leading-7 font-bold">
              <div className="self-end bg-gradient-to-r from-[#5614D2] to-[#21BFE4] p-[1px] rounded-xl my-2">
                <div className="bg-[#210852] flex rounded-xl px-2 min-w-16 flex-center">
                  <img className="max-w-4 mr-1" src={starRate} alt="Star Icon" />
                  <span className="text-lg">4.5</span>
                </div>
              </div>
              <p className="text-center">
                fascinating work Youvative's
                you are doing a really good job
              </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#5F16E9] to-[#21BFE4] p-[2px] rounded-md ">
          <div className="flex justify-center w-full bg-gradient-to-t from-[#6724e4] to-[#2B0A69] rounded-md">
            <div className="flex flex-between max-w-[95%]">
              <div className="flex min-w-[25%]  flex-col justify-start items-center min-h-full mt-2 leading-5">
              <div className="bg-gradient-to-r from-[#5614D2] to-[#21BFE4] p-[1.5px] rounded-full">
                <img className="w-16 h-16 rounded-full " src={moathLail} alt="Aness Hassaoui Photo Profile" />
              </div>
              <span className="text-[#CDB7F8] ">moath.lail</span>
              <span className="text-[#21BFE4] text-1xl font-bold">410K</span>
              <span className="text-[#CDB7F8] ">Followers</span>
              </div>

              <div className="flex flex-col items-end text-[23px] text-[#FFFFFF]  leading-7 font-bold">
              <div className="self-end bg-gradient-to-r from-[#5614D2] to-[#21BFE4] p-[1px] rounded-xl my-2">
                <div className="bg-[#210852] flex rounded-xl px-2 min-w-16 justify-center">
                  <img className="max-w-4 mr-1" src={starRate} alt="Star Icon" />
                  <span className="text-lg">5</span>
                </div>
              </div>
              <p className="text-center">
                fascinating work Youvative's
                you are doing a really good job
              </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#5F16E9] to-[#21BFE4] p-[2px] rounded-md ">
          <div className="flex justify-center w-full bg-gradient-to-t from-[#6724e4] to-[#2B0A69] rounded-md">
            <div className="flex flex-between max-w-[95%]">
              <div className="flex min-w-[25%]  flex-col justify-start items-center min-h-full mt-2 leading-5">
              <div className="bg-gradient-to-r from-[#5614D2] to-[#21BFE4] p-[1.5px] rounded-full">
                <img className="w-16 h-16 rounded-full " src={aliAlhamidi} alt="Aness Hassaoui Photo Profile" />
              </div>
              <span className="text-[#CDB7F8] ">ali.alhamed</span>
              <span className="text-[#21BFE4] text-1xl font-bold">225K</span>
              <span className="text-[#CDB7F8] ">Followers</span>
              </div>

              <div className="flex flex-col items-end text-[23px] text-[#FFFFFF]  leading-7 font-bold">
              <div className="self-end bg-gradient-to-r from-[#5614D2] to-[#21BFE4] p-[1px] rounded-xl my-2">
                <div className="bg-[#210852] flex rounded-xl px-2 min-w-16 justify-center">
                  <img className="max-w-4 mr-1" src={starRate} alt="Star Icon" />
                  <span className="text-lg">5</span>
                </div>
              </div>
              <p className="text-center">
                fascinating work Youvative's
                you are doing a really good job
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Testimonials;