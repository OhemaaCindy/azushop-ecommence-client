import React from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Icon } from "iconsax-reactjs";

const About = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-900 px-6 md:px-16 lg:px-32">
        {/* Hero Section */}
        <section className="relative bg-[#F9FAFB] py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              About <span className="text-pink-600">AzuShop</span>
            </h1>
            <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed text-lg">
              Redefining modern luxury through timeless fashion pieces that
              inspire confidence and celebrate individuality.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative flex items-center justify-center">
                <div className="bg-pink-500 text-white rounded-2xl flex items-center justify-center w-64 h-64 shadow-xl">
                  <Icon size="120" color="#FFFFFF" />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-6 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed">
                <span className="font-semibold text-pink-600">AzuShop</span> was
                born with a vision: to make luxury fashion accessible while
                maintaining elegance, quality, and modern design. We bring
                together the latest trends with timeless sophistication to
                create pieces that never go out of style.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every collection is carefully curated, blending craftsmanship,
                sustainability, and a touch of boldness so you can express
                yourself with confidence and grace.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-[#F9FAFB] py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To empower individuals to express their unique style with
              high-quality, luxurious fashion that’s both sustainable and
              accessible. We believe fashion should be a reflection of who you
              are not just what you wear.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-6 md:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">✨ Elegance</h3>
              <p className="text-gray-600">
                Every piece is designed to embody timeless beauty and
                sophistication.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">🌱 Sustainability</h3>
              <p className="text-gray-600">
                We are committed to ethical practices and eco-conscious
                materials.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">💎 Quality</h3>
              <p className="text-gray-600">
                From fabric to finish, we ensure luxury you can feel and trust.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
