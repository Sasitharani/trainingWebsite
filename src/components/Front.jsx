import 'tailwindcss/tailwind.css';
import Contact from './Contact';
import { useState, useEffect } from 'react';
import Page1 from './Page1';

export default function Front() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleSmoothScroll = (event) => {
      if (event.target.tagName === 'A' && event.target.hash) {
        event.preventDefault();
        const targetId = event.target.hash.slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <>
      <div id="home" className="flex flex-col min-h-screen  bg-cover bg-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40 rounded-2xl mb-3" style={{ backgroundImage: "url('/img/groupHifi.jpg')" }}>
        <Page1 />
      </div>

      <div id="service" className="flex flex-col min-h-screen  bg-cover bg-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40 rounded-2xl mb-3" style={{ backgroundImage: "url('/img/2.jpg')" }}>   
     </div>

     <div id="3" className="flex flex-col min-h-screen  bg-cover bg-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40 rounded-2xl mb-3" style={{ backgroundImage: "url('/img/3.jpg')" }}>   
     </div>

     <div id="4" className="flex flex-col min-h-screen  bg-cover bg-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40 rounded-2xl mb-3" style={{ backgroundImage: "url('/img/4.jpg')" }}>   
     </div>

     <div id="5" className="flex flex-col min-h-screen  bg-cover bg-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40 rounded-2xl mb-3" style={{ backgroundImage: "url('/img/5.jpg')" }}>   
     </div>

     <div id="sectors" className="flex flex-col min-h-screen  bg-cover bg-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40 rounded-2xl mb-3" style={{ backgroundImage: "url('/img/7.jpg')" }}>   
     </div>

     <div id="testimonials" className="flex flex-col min-h-screen  bg-cover bg-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40 rounded-2xl mb-3" style={{ backgroundImage: "url('/img/6.jpg')" }}>   
     </div>


     <div className="flex flex-col min-h-screen  bg-cover bg-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40 rounded-2xl mb-3" style={{ backgroundImage: "url('/img/9.jpg')" }}>   
     </div>

     <div className="flex flex-col min-h-screen  bg-cover bg-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40 rounded-2xl mb-3" style={{ backgroundImage: "url('/img/10.jpg')" }}>   
     </div>
     
     <div id="contact" className="flex flex-col min-h-screen  bg-cover bg-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40 rounded-2xl mb-3 " style={{ backgroundImage: "url('/img/hands.jpg')" }}>  
     <Contact /> 
     </div>


    </>
  );
}
