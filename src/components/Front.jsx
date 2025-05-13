import React, { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Custom SVG cursor (larger default arrow, blue #4b6cb7)
const defaultCursor = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%234b6cb7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>`;
// Hover SVG cursor (green #89d8a3)
const hoverCursor = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2389d8a3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>`;

const HomePage = () => {
  const sections = [
    {
      title: "Who Are We",
      content: (
        <div>
          <p className="text-gray-600 mt-2">
            We are the Indian Institute for Training and Interactions, dedicated to empowering students with the skills needed to excel in competitive placements. Our mission is to bridge the gap between academic learning and industry demands through innovative training programs.
          </p>
          
          <button
            className="mt-4 bg-blue-700 text-blue-900 font-semibold py-2 px-4 rounded-lg neumorphic-button"
            onClick={() => {
              const phoneNumber = "+917904010382";
              const message = "Hi, I'm interested in your placement training courses at iiti.in!";
              const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              window.open(url, "_blank");
            }}
          >
            Chat with Us
          </button>
        </div>
      ),
      icon: "fa-users",
    },
    {
      title: "What We Offer",
      content: (
        <div className="space-y-12 p-8 sm:p-10">
          {[
            {
              title: "Quantitative Training",
              description: "Master aptitude, logical reasoning, and numerical skills to ace placement tests.",
              icon: "fa-brain",
            },
            {
              title: "Coding Mastery",
              description: "Excel in DSA, competitive programming, and full-stack development.",
              icon: "fa-code",
            },
          ].map((course, index) => (
            <div key={course.title} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <i className={`fas ${course.icon} text-4xl sm:text-5xl text-blue-500 icon-bounce`}></i>
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-green-600">{course.title}</h4>
                <p className="text-gray-600 mt-2">{course.description}</p>
              </div>
            </div>
          ))}
          <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
            <li>Our programs are delivered through interactive online sessions, one-to-one training, hands-on workshops, and personalized mentoring.</li>
            <li>We use cutting-edge platforms to ensure a seamless learning experience, with flexible schedules to suit your needs.</li>
            <li>We teach through Zoom, Google Meet, and other platforms.</li>
            <li>Our courses are designed to be engaging and effective, with a focus on real-world applications.</li>
            <li>We teach in three languages: English, Hindi, and Tamil.</li>
            <li>The recordings of the classes will be available for you to watch later.</li>
          </ul>
        </div>
      ),
      icon: "fa-graduation-cap",
    },
    {
      title: "Advantage of Choosing Us",
      content: (
        <div>
          <ul className="text-gray-600 mt-2 list-disc list-inside">
            <li>Expert instructors with industry experience.</li>
            <li>Comprehensive placement support and mock interviews.</li>
            <li>Live One to One Coaching.</li>
            <li>Freindly teacher.</li>
            <li>Flexible schedules to accommodate your needs.</li>
            <li>Available in three languages English hindi and Tamil.</li>
            <li>Affordable pricing with various payment options.</li>
            <li>Support till placement</li>
          </ul>
          <button
            className="mt-4 bg-blue-700 text-blue-900 font-semibold py-2 px-4 rounded-lg neumorphic-button"
            onClick={() => {
              const phoneNumber = "+917904010382";
              const message = "Hi, I'm interested in your placement training courses at iiti.in!";
              const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              window.open(url, "_blank");
            }}
          >
            Chat with Us
          </button>
        </div>
      ),
      icon: "fa-star",
    },
    {
      title: "Course Fee",
      content: (
        <div>
          <p className="text-gray-600 mt-2">
            Our courses are competitively priced to ensure accessibility. Fees vary based on program duration and format. For detailed pricing, contact us via WhatsApp or visit our website.
          </p>
          <p className="text-gray-600 mt-2 font-semibold">
            Example: Quantitative Training - Starting at Rs 5000/month, Coding Mastery - Starting at Rs 5000/month.
          </p>
          <button
            className="mt-4 bg-blue-700 text-blue-900 font-semibold py-2 px-4 rounded-lg neumorphic-button"
            onClick={() => {
              const phoneNumber = "+917904010382";
              const message = "Hi, I'm interested in your placement training courses at iiti.in!";
              const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              window.open(url, "_blank");
            }}
          >
            Chat with Us
          </button>
        </div>
      ),
      icon: "fa-dollar-sign",
    },
  ];

  const openWhatsApp = () => {
    const phoneNumber = "+917904010382";
    const message = "Hi, I'm interested in your placement training courses at iiti.in!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    // Scroll-Based Visibility
    const rectangles = document.querySelectorAll('.rectangle');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );
    rectangles.forEach(rectangle => observer.observe(rectangle));

    return () => {
      rectangles.forEach(rectangle => observer.unobserve(rectangle));
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <head>
        <meta name="description" content="Empowering students with placement and coding training through one-to-one live sessions in English, Hindi, and Tamil. Join us to excel in competitive placements!" />
        <meta name="keywords" content="placement training, coding training, one-to-one sessions, competitive placements, English, Hindi, Tamil" />
        <meta property="og:title" content="IITI - Your Companion for Your Dream Job" />
        <meta property="og:description" content="Empowering students with placement and coding training through one-to-one live sessions in English, Hindi, and Tamil. Join us to excel in competitive placements!" />
        <meta property="og:image" content="/public/img/logo.jpg" />
        <meta property="og:url" content="https://iiti.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IITI - Your Companion for Your Dream Job" />
        <meta name="twitter:description" content="Empowering students with placement and coding training through one-to-one live sessions in English, Hindi, and Tamil. Join us to excel in competitive placements!" />
        <meta name="twitter:image" content="/public/img/logo.jpg" />
      </head>
      <style jsx>{`
        body {
          cursor: url(${defaultCursor}), auto;
        }
        button, .rectangle {
          cursor: url(${hoverCursor}), auto;
        }
        .text-pastel-blue {
          color: #a3bffa;
        }
        @keyframes colorShift {
          0% { color: #4b6cb7; transform: scale(1); }
          50% { color: #89d8a3; transform: scale(1.03); }
          100% { color: #4b6cb7; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0% { box-shadow: 0 0 5px #4b6cb7, 0 0 10px #4b6cb7; }
          50% { box-shadow: 0 0 10px #89d8a3, 0 0 20px #89d8a3; }
          100% { box-shadow: 0 0 5px #4b6cb7, 0 0 10px #4b6cb7; }
        }
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .color-shift { animation: colorShift 2s infinite; }
        .rectangle {
          background: #f5f5f5;
          border-radius: 10px;
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.7);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
        }
        .rectangle.visible {
          opacity: 1;
          animation: fadeIn 0.8s ease-out forwards;
        }
        .rectangle:hover {
          transform: perspective(1000px) rotateX(3deg) rotateY(3deg) translateZ(20px);
          animation: glow 2s infinite;
        }
        .icon-bounce { animation: iconBounce 1.5s infinite; }
        .parallax-header {
          background: linear-gradient(135deg, #e0e7ff, #f5f5f5);
          background-attachment: fixed;
          background-size: cover;
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        .parallax-section {
          background: linear-gradient(135deg, #f5f5f5, #e0e7ff);
          background-attachment: fixed;
          background-size: cover;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .neumorphic-button {
          background: #f5f5f5;
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.7);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .neumorphic-button:hover {
          transform: perspective(500px) translateZ(10px);
          box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.15), -8px -8px 15px rgba(255, 255, 255, 0.8);
        }
      `}</style>

      <section className="parallax-section" id="session-0">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="rectangle p-6 sm:p-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-600">Indian Institute for Training and Interactions</h2>
              <p className="text-lg sm:text-xl text-gray-600">iiti.in</p>
              <p className="text-xl sm:text-2xl text-blue-900 font-semibold leading-relaxed italic shadow-md p-6">
                Offering <span className="text-red-700 font-semibold">placement and coding training</span> as one-to-one live sessions in 
                <span className="text-green-700 font-extrabold drop-shadow-lg">English</span>, 
                <span className="text-green-700 font-extrabold drop-shadow-lg">Hindi</span>, and 
                <span className="text-green-700 font-extrabold drop-shadow-lg">Tamil</span>.
              </p>
              <p className="text-lg sm:text-xl text-black font-semibold animate-pulse">
                Click the following links to know more:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rectangle p-6 sm:p-8 flex flex-col items-center">
                  <a
                    href="#section-0"
                    className="bg-blue-700 text-blue-900 font-semibold py-3 px-5 rounded-lg neumorphic-button text-lg sm:text-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#section-0').scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    Who Are We
                  </a>
                </div>
                <div className="rectangle p-6 sm:p-8 flex flex-col items-center">
                  <a
                    href="#section-1"
                    className="bg-blue-700 text-blue-900 font-semibold py-3 px-5 rounded-lg neumorphic-button text-lg sm:text-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#section-1').scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    What We Offer
                  </a>
                </div>
                <div className="rectangle p-6 sm:p-8 flex flex-col items-center">
                  <a
                    href="#section-2"
                    className="bg-blue-700 text-blue-900 font-semibold py-3 px-5 rounded-lg neumorphic-button text-lg sm:text-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#section-2').scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    Advantage of Choosing Us
                  </a>
                </div>
                <div className="rectangle p-6 sm:p-8 flex flex-col items-center">
                  <a
                    href="#section-3"
                    className="bg-blue-700 text-blue-900 font-semibold py-3 px-5 rounded-lg neumorphic-button text-lg sm:text-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#section-3').scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    Course Fee
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {sections.map((section, index) => (
        <section
          key={section.title}
          className="parallax-section"
          id={`section-${index}`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="rectangle p-6 sm:p-8 max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <i className={`fas ${section.icon} text-4xl sm:text-5xl text-blue-500 icon-bounce`}></i>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-green-600">{section.title}</h2>
                  {section.content}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <button
        onClick={() => {
          const phoneNumber = "+917904010382";
          const message = "Hi, I'm interested in your placement training courses at iiti.in!";
          const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
          window.open(url, "_blank");
        }}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-green-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full neumorphic-button flex items-center z-50 text-sm sm:text-base"
      >
        <i className="fab fa-whatsapp mr-1 sm:mr-2 text-lg sm:text-xl text-green-500"></i> 
        <span className='text-blue-900'>Enquiry</span>
      </button>
    </div>
  );
};

export default HomePage;