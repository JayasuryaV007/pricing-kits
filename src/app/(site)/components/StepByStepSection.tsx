import { motion, steps } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
// import { OurProcessSteps } from "../MvpContants";

const OurProcessSteps = [
  'Simplify integration',
  'Customize Tooltip Content',
  'Activate Hover-Based Tooltips',
  'Incorporate Interactive Media',
  'Empower Users to "Learn More"',
  'Manage Content Seamlessly',
];

const OurProcessSteps2 = [
  'Min.js or CDN scripts can be directly linked to the HTML of your pricing page for easy setup.',
  'Tooltip details such as text, GIFs, videos, and blog/article links can be easily customized for each feature with a simple configuration file or CMS.',
  'Tooltips fade in when users hover over a feature, displaying the configured content to keep users informed.',
  'Your users can watch videos or view GIFs directly within the tooltip for quick, in-context understanding.',
  'Your users can click the "Learn / Read More" button to be directed to blogs, e-books, etc., in case they need more information.',
  'Your content manager can easily update tooltip details and links, keeping information to be accurate and contextual.',
];

function StepItem({ step, index, isLastStep }: any) {
  const { ref, inView } = useInView({
    threshold: 0.6,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.6, delay: index * 0.3 }}
      className="relative"
    >
      {!isLastStep && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: inView ? '100%' : 0 }}
          transition={{ duration: 0.6, delay: index * 0.3 }}
          className="-ml-0.5 absolute left-8 w-px"
          aria-hidden="true"
        ></motion.div>
      )}
      <div className="flex gap-4">
        <div className="w-[500px]">
          {index % 2 === 0 ? (
            <Image
              src="/assets/images/dummy.png"
              width={500}
              height={500}
              alt=""
            />
          ) : (
            <div className="w-[500px]">
              <p className="ml-6 text-4xl font-bold text-gray-900">{step}</p>
              <p className="mt-2 ml-6 text-xl font-medium text-gray-900">
                {OurProcessSteps2[index]}
              </p>
            </div>
          )}
        </div>
        <div className="relative pb-10 step step-hidden">
          <div className="flex items-start">
            <div className="relative inline-flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white bg-primary w-14 h-14 rounded-xl">
              {index + 1}
              {!isLastStep && (
                <span
                  className="absolute w-1 h-[30vh] -ml-px bg-primary top-14 left-7"
                  aria-hidden="true"
                ></span>
              )}
            </div>
            <div className="w-[500px]">
              {index % 2 === 0 ? (
                <div className="w-[500px]">
                  <p className="ml-6 text-4xl font-bold text-gray-900">
                    {step}
                  </p>
                  <p className="mt-2 ml-6 text-xl font-medium text-gray-900">
                    {OurProcessSteps2[index]}
                  </p>
                </div>
              ) : (
                <Image
                  src="/assets/images/dummy.png"
                  width={500}
                  height={500}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default function SquadWorks() {
  return (
    <ul className="max-w-6xl mx-auto mt-16 space-y-6">
      {OurProcessSteps.map((step, index) => (
        <StepItem
          key={index}
          step={step}
          index={index}
          isLastStep={index === OurProcessSteps.length - 1}
        />
      ))}
    </ul>
  );
}
