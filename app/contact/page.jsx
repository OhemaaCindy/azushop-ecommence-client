import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-900 px-6 md:px-16 lg:px-32">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#fdf0f3] via-white to-[#fdf0f3] py-24 px-6 md:px-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Let’s <span className="text-pink-600">Connect</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              We’re always here to assist you. Whether it’s styling advice,
              order inquiries, or brand collaborations reach out and let’s talk
              fashion.
            </p>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-3">
              <Phone className="w-8 h-8 mx-auto md:mx-0 text-pink-600" />
              <h3 className="text-xl font-semibold">Call Us</h3>
              <p className="text-gray-600">+233 059 480 9966</p>
              <p className="text-gray-600">Mon – Sat, 9AM – 7PM</p>
            </div>

            <div className="space-y-3">
              <Mail className="w-8 h-8 mx-auto md:mx-0 text-pink-600" />
              <h3 className="text-xl font-semibold">Email Us</h3>
              <p className="text-gray-600">cindyessuman67@gmail.com</p>
              <p className="text-gray-600">azushop@gmail.com</p>
            </div>

            <div className="space-y-3">
              <MapPin className="w-8 h-8 mx-auto md:mx-0 text-pink-600" />
              <h3 className="text-xl font-semibold">Visit Us</h3>
              <p className="text-gray-600">123 Fashion Avenue</p>
              <p className="text-gray-600">Accra, Ghana</p>
            </div>
          </div>
        </section>

        <section className="bg-[#fdf0f3] py-12 px-6 md:px-20 text-center">
          <h3 className="text-xl font-semibold mb-6">
            Your Style, Our Commitment
          </h3>
          <p className="max-w-2xl mx-auto text-gray-700 leading-relaxed">
            At AzuShop, we believe fashion should feel effortless and
            empowering. From personalized sizing advice to styling tips and
            smooth delivery, our team is here to make every step of your journey
            as refined and seamless as the pieces we create.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
