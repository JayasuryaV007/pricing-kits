const HeroSection = () => {
  return (
    <div className="overflow-x-hidden bg-gray-50">
      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
              Drive Conversions with Feature-Rich Pricing
            </h1>
            <p className="max-w-md mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">
              Is your pricing info too complicated? PricingFlows makes life easy
              for users while driving sales.
            </p>

            <div className="relative inline-flex mt-10 md:mb-20 group">
              <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

              <a
                href="#"
                title=""
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-primary font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Get Free Trial
              </a>
            </div>
          </div>
        </div>

        {/* <div className="mt-16 md:mt-20">
          <img
            className="object-cover object-top w-full h-auto mx-auto scale-150 2xl:max-w-screen-2xl xl:scale-100"
            src="https://d33wubrfki0l68.cloudfront.net/54780decfb9574945bc873b582cdc6156144a2ba/d9fa1/images/hero/4/illustration.png"
            alt=""
          />
        </div> */}
      </section>
    </div>
  );
};

export default HeroSection;
