"use client";

import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5efe6] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            {/* <span className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
              Last Updated: June 2026
            </span> */}

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6">
              Terms & Conditions
            </h1>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our website or
              purchasing any products. By accessing this platform, you agree to
              comply with the terms outlined below.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-8">
                By accessing or using this website, you acknowledge that you
                have read, understood, and agreed to these Terms and Conditions.
                If you do not agree with any part of these terms, please
                discontinue use of the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                2. About Our Services
              </h2>
              <p className="text-gray-600 leading-8">
                Our platform provides customers with the ability to browse,
                select, and purchase premium Aso-Oke fabrics and related
                products online. We reserve the right to modify or discontinue
                services at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                3. Product Information
              </h2>

              <ul className="list-disc pl-6 text-gray-600 leading-8 space-y-2">
                <li>
                  We strive to ensure all product descriptions are accurate.
                </li>
                <li>
                  Product colors may vary slightly due to screen settings and
                  lighting conditions.
                </li>
                <li>
                  Product availability and pricing may change without notice.
                </li>
                <li>
                  We reserve the right to correct any errors or inaccuracies.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                4. Orders & Payments
              </h2>

              <p className="text-gray-600 leading-8">
                By placing an order, you confirm that all information provided
                is accurate and complete. Payments must be completed using our
                approved payment methods before orders are processed.
              </p>

              <ul className="list-disc pl-6 text-gray-600 leading-8 mt-4 space-y-2">
                <li>Orders are subject to product availability.</li>
                <li>Fraudulent transactions will be cancelled.</li>
                <li>
                  We reserve the right to refuse or cancel suspicious orders.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                5. Shipping & Delivery
              </h2>

              <p className="text-gray-600 leading-8">
                We aim to process and dispatch orders promptly. Delivery times
                may vary depending on location, courier services, and unforeseen
                circumstances. We are not responsible for delays caused by
                third-party logistics providers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                6. Returns & Refunds
              </h2>

              <p className="text-gray-600 leading-8">
                Customers should inspect products immediately upon delivery.
                Return requests may be accepted if:
              </p>

              <ul className="list-disc pl-6 text-gray-600 leading-8 mt-4 space-y-2">
                <li>The wrong product was delivered.</li>
                <li>The product arrived damaged.</li>
                <li>
                  The product significantly differs from its description.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                7. User Responsibilities
              </h2>

              <ul className="list-disc pl-6 text-gray-600 leading-8 space-y-2">
                <li>Provide accurate information when placing orders.</li>
                <li>Use the website lawfully and responsibly.</li>
                <li>
                  Avoid attempting unauthorized access to our systems.
                </li>
                <li>
                  Refrain from uploading harmful content or malicious software.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                8. Intellectual Property
              </h2>

              <p className="text-gray-600 leading-8">
                All website content including logos, product images, graphics,
                text, and designs are protected by intellectual property laws
                and remain the property of the website owner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                9. Limitation of Liability
              </h2>

              <p className="text-gray-600 leading-8">
                We shall not be liable for indirect, incidental, or
                consequential damages resulting from the use of our website,
                products, or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Privacy</h2>

              <p className="text-gray-600 leading-8">
                Your personal information is handled according to our Privacy
                Policy. We are committed to protecting customer data and
                maintaining confidentiality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                11. Changes to Terms
              </h2>

              <p className="text-gray-600 leading-8">
                We reserve the right to update these Terms and Conditions at any
                time. Changes become effective immediately upon publication on
                this page.
              </p>
            </section>

            {/* Contact Box */}
            <div className="bg-[#f5efe6] rounded-2xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>

              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> asookestore.com
                </p>
                <p>
                  <strong>Phone:</strong> +234 812 757 8710
                </p>
                <p>
                  <strong>Address:</strong> Ogbomoso, Oyo State, Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}