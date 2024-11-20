import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';

const OurProcessSteps = [
  'Customize Tooltip Content',
  'Incorporate Interactive Media',
  'Empower Users to "Learn More"',
  'Simplify integration',
  'Activate Hover-Based Tooltips',
  'Manage Content Seamlessly',
];

const OurProcessSteps2 = [
  'Tooltip details such as text, GIFs, videos, and blog/article links can be easily customized for each feature with a simple configuration file or CMS.',
  'Your users can watch videos or view GIFs directly within the tooltip for quick, in-context understanding.',
  'Your users can click the "Learn / Read More" button to be directed to blogs, e-books, etc., in case they need more information.',
  'Min.js or CDN scripts can be directly linked to the HTML of your pricing page for easy setup.',
  'Tooltips fade in when users hover over a feature, displaying the configured content to keep users informed.',
  'Your content manager can easily update tooltip details and links, keeping information to be accurate and contextual.',
];

function StepItem({ step, index, isLastStep, nextItemPosition }: any) {
  const { ref, inView } = useInView({
    threshold: 0.6,
  });

  const itemRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (!isLastStep && itemRef.current && nextItemPosition) {
      const currentNumberPos = itemRef.current?.getBoundingClientRect();
      const height =
        nextItemPosition - currentNumberPos.top - currentNumberPos.height;
      setLineHeight(Math.max(height, 0));
    }
  }, [isLastStep, nextItemPosition]);

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
      <div
        className={`flex flex-col md:flex-row gap-4 px-4 md:px-0 ${index !== 5 && 'h-[60vh]'}`}
      >
        {/* Left content */}
        <div className="w-full md:w-1/2 order-2 md:order-1">
          {index % 2 === 0 ? (
            <div className="relative w-full aspect-video ml-10 md:ml-0">
              <Image
                src={`/assets/images/featured-img-0${index + 1}.png`}
                fill
                className="object-cover rounded-lg"
                alt=""
              />
            </div>
          ) : (
            <>
              <div className="space-y-4 p-4 ml-10 md:ml-0 hidden md:block">
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900">
                  {step}
                </h3>
                <p className="text-base md:text-xl font-medium text-gray-900">
                  {OurProcessSteps2[index]}
                </p>
              </div>
              <div className="relative w-full aspect-video ml-10 md:ml-0 md:hidden">
                <Image
                  src={`/assets/images/featured-img-0${index + 1}.png`}
                  fill
                  className="object-cover rounded-lg"
                  alt=""
                />
              </div>
            </>
          )}
        </div>

        {/* Right content with number and connecting line */}
        <div className="relative w-full md:w-1/2 order-1 md:order-2">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div
                ref={itemRef}
                className="inline-flex items-center justify-center flex-shrink-0 text-xl md:text-2xl font-bold text-white bg-primary w-10 h-10 md:w-14 md:h-14 rounded-xl"
              >
                {index + 1}
                {!isLastStep && lineHeight > 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: lineHeight }}
                    transition={{ duration: 0.6, delay: index * 0.3 }}
                    className="absolute w-px bg-primary left-1/2 -translate-x-1/2 top-full"
                  />
                )}
              </div>
            </div>

            <div className="flex-1">
              {index % 2 === 0 ? (
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-900">
                    {step}
                  </h3>
                  <p className="text-base md:text-xl font-medium text-gray-900">
                    {OurProcessSteps2[index]}
                  </p>
                </div>
              ) : (
                <>
                  <div className="relative w-full aspect-video hidden md:block">
                    <Image
                      src={`/assets/images/featured-img-0${index + 1}.png`}
                      fill
                      className="object-cover rounded-lg"
                      alt=""
                    />
                  </div>
                  <div className="space-y-4 md:hidden">
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900">
                      {step}
                    </h3>
                    <p className="text-base md:text-xl font-medium text-gray-900">
                      {OurProcessSteps2[index]}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default function SquadWorks() {
  const [numberPositions, setNumberPositions] = useState([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const updatePositions = () => {
      if (listRef.current) {
        const numbers = listRef.current?.querySelectorAll('.inline-flex');
        const positions: any = Array.from(numbers).map(
          (number: any) => number.getBoundingClientRect().top,
        );
        setNumberPositions(positions);
      }
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  return (
    <ul
      ref={listRef}
      className="max-w-6xl mx-auto mt-8 md:mt-16 space-y-16 md:space-y-24"
    >
      {OurProcessSteps.map((step, index) => (
        <>
          {index === 0 && <div className="md:mt-20"></div>}
          <StepItem
            key={index}
            step={step}
            index={index}
            isLastStep={index === OurProcessSteps.length - 1}
            nextItemPosition={numberPositions[index + 1]}
          />
        </>
      ))}
    </ul>
  );
}
