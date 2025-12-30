"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { WhatsAppBar } from "@/components/marketing/WhatsAppBar";
import { ComboCard } from "@/components/marketing/ComboCard";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/config";
import { getTools, getCombos } from "@/lib/storage";
import { Tool, ComboTool } from "@/lib/tools";
import { waDirectLink } from "@/lib/whatsapp";
import { FeaturedTools } from "@/components/marketing/FeaturedTools";
import { MessageCircle, CheckCircle, Zap, Users, Package, Star, Instagram, Shield, HeartHandshake, Sparkles, Code, FileText, Pencil, AlertCircle, icons } from "lucide-react";

export default function HomePage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [combos, setCombos] = useState<ComboTool[]>([]);
  const [featuredTools, setFeaturedTools] = useState<Tool[]>([]);

  useEffect(() => {
    const allTools = getTools();
    const allCombos = getCombos();
    setTools(allTools);
    setCombos(allCombos);
    setFeaturedTools(allTools.slice(0, 5));
  }, []);

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8 flex justify-center">
                <Image
                  src="/file.jpg"
                  alt={SITE.brand}
                  width={120}
                  height={120}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 rounded-full text-sm font-bold animate-pulse shadow-lg">
                <Sparkles className="inline mr-1" size={16} /> LIMITED TIME OFFER - UP TO 80% OFF!
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-blue-400">{SITE.brand}</span><br />
                <span className="text-2xl sm:text-3xl lg:text-4xl text-slate-300">Complete Solution for Assignments & Tools</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-4 leading-relaxed px-4">
                Premium Tools. Academic Services. Development Projects.
              </p>
              <p className="text-base sm:text-lg text-blue-200 mb-8 px-4">
                Get instant access to premium subscription tools. Trusted by thousands of students and professionals across India.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 mb-8">
                <a
                  href={waDirectLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-green-700 transition-all font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  <MessageCircle size={24} />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={SITE.whatsappCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-slate-100 transition-all font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  <Users size={24} />
                  <span>Join Community</span>
                </a>
              </div>

              {SITE.instagramUrl && (
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors text-sm sm:text-base"
                >
                  <Instagram size={20} />
                  <span>Follow us on Instagram</span>
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-blue-600 dark:text-blue-400" size={28} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Trusted Service</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Verified accounts with guaranteed access
                </p>
              </div>
              <div className="text-center bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-green-600 dark:text-green-400" size={28} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Instant Delivery</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Get credentials within minutes
                </p>
              </div>
              <div className="text-center bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-purple-600 dark:text-purple-400" size={28} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Secure & Safe</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Your data is always protected
                </p>
              </div>
              <div className="text-center bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-4">
                  <HeartHandshake className="text-orange-600 dark:text-orange-400" size={28} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">24/7 Support</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Always here to help you
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Featured Tools
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400">
                Popular tools our customers love
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg max-w-4xl mx-auto">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
                <strong>Note:</strong> Prices are subject to change and may vary from time to time. Please contact us on WhatsApp for current pricing.
              </p>
            </div>

            {featuredTools.length > 0 && <FeaturedTools tools={featuredTools} />}
            <div className="text-center mt-10 sm:mt-12">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors font-semibold text-base sm:text-lg shadow-lg"
              >
                <Package size={24} />
                <span>View All {tools.length} Tools</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-block px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-bold mb-4">
                🎁 COMBO DEALS - SAVE MORE!
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Combo Packages
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400">
                Get multiple tools together and save big on your favorite subscriptions
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg max-w-4xl mx-auto">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
                <strong>Note:</strong> Prices are subject to change and may vary from time to time. Please contact us on WhatsApp for current pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {combos.slice(0, 4).map((combo) => (
                <ComboCard key={combo.id} combo={combo} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Our Services
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400">
                Beyond tools - Complete academic and development solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <FileText className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Academic Writing Services</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Professional assistance for all your academic writing needs with guaranteed quality and timely delivery.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>Thesis Writing</strong> - Complete thesis from scratch or chapter-wise assistance</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>Dissertation Help</strong> - Research, writing, and formatting support</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>Chapter-wise Writing</strong> - Individual chapters or complete projects</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>PPT Creation</strong> - Professional presentations for your projects</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>Plagiarism Removal</strong> - Make your content 100% original</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>AI Detection Removal</strong> - Humanize AI-generated content</span>
                  </li>
                </ul>
                <a
                  href={waDirectLink("Academic Writing Services Inquiry")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                >
                  <MessageCircle size={20} />
                  <span>Inquire About Academic Services</span>
                </a>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Code className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Development Services</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Custom website and app development solutions tailored to your specific business needs.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>Website Development</strong> - Modern, responsive websites for your business</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>E-commerce Solutions</strong> - Online stores with payment integration</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>Mobile Apps</strong> - iOS and Android app development</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>Custom Portals</strong> - Student/employee management systems</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>API Integration</strong> - Connect your systems seamlessly</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span><strong>Maintenance & Support</strong> - Ongoing technical support</span>
                  </li>
                </ul>
                <a
                  href={waDirectLink("Website/App Development Inquiry")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
                >
                  <MessageCircle size={20} />
                  <span>Inquire About Development</span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-8 text-center">
              <AlertCircle className="mx-auto mb-4 text-orange-600 dark:text-orange-400" size={48} />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Custom Requirements?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                Have a specific project in mind? Whether it's a unique tool subscription, custom academic work, or a special development project - we've got you covered. Contact us to discuss your requirements!
              </p>
              <a
                href={waDirectLink("Custom Requirement Inquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold shadow-md"
              >
                <MessageCircle size={20} />
                <span>Discuss Your Project</span>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="text-yellow-500 fill-yellow-500" size={32} />
                <Star className="text-yellow-500 fill-yellow-500" size={32} />
                <Star className="text-yellow-500 fill-yellow-500" size={32} />
                <Star className="text-yellow-500 fill-yellow-500" size={32} />
                <Star className="text-yellow-500 fill-yellow-500" size={32} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400">
                See what our customers say about us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-yellow-500" size={18} />
                  ))}
                </div>
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <div className="text-center p-4">
                    <Image
                      src="/reviews/review1.jpg"
                      alt="Review screenshot 1"
                      width={640}
                      height={660}
                      className="mx-auto mb-2 rounded-lg object-cover"
                    />
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic mb-4">
                  "Fast delivery and excellent support! Got my ChatGPT subscription within 5 minutes."
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">- Student from Delhi</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-yellow-500" size={18} />
                  ))}
                </div>
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <div className="text-center p-4">
                    <Image
                      src="/reviews/review2.jpg"
                      alt="Review screenshot 2"
                      width={640}
                      height={660}
                      className="mx-auto mb-2 rounded-lg object-cover"
                    />
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic mb-4">
                  "Very reliable service. Using Turnitin and Grammarly for my thesis. Highly recommended!"
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">- PhD Scholar, Mumbai</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-yellow-500" size={18} />
                  ))}
                </div>
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <div className="text-center p-4">
                    <Image
                      src="/reviews/review3.jpg"
                      alt="Review screenshot 3"
                      width={640}
                      height={660}
                      className="mx-auto mb-2 rounded-lg object-cover"
                    />
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic mb-4">
                  "Amazing prices and instant response on WhatsApp. Best place for student subscriptions!"
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">- Working Professional</p>
              </div>
            </div>

            <div className="text-center mt-10 sm:mt-12">
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mb-4">
                Join thousands of satisfied customers
              </p>
              <a
                href={waDirectLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-lg"
              >
                <MessageCircle size={20} />
                <span>Start Your Order</span>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Users size={56} className="mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              Connect with other users, get exclusive offers, and stay updated with the latest tools and deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={SITE.whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-50 transition-colors font-semibold text-base sm:text-lg shadow-lg"
              >
                <MessageCircle size={24} />
                <span>Join WhatsApp Community</span>
              </a>
              {SITE.instagramUrl && (
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white/10 transition-colors font-semibold text-base sm:text-lg"
                >
                  <Instagram size={24} />
                  <span>Follow on Instagram</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <WhatsAppBar />
    </>
  );
}
