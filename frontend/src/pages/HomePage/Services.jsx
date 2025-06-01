import services_svg from '../../assets/svg/services.svg'
function Services(id){
  return(
    <div id="our-work" className='mt-70 mx-[78px]'>
      {console.log(id)}
      <img src={services_svg} alt="Our services" />
    </div>
  )
}
export default Services;