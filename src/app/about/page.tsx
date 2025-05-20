import Head from 'next/head';
import Link from 'next/link';
// import "@src/app/globals.css";
// import '../src/app/globals.css';


export default function Page() {
  return (
    <>
      <Head>
        <title>About Us | InnovateSoft - Building Digital Futures</title>
        <meta name="description" content="Learn about InnovateSoft - a leading software development company creating cutting-edge digital solutions since 2015." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-indigo-900">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                We Build <span className="text-indigo-300">Digital Experiences</span>
              </h1>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
                InnovateSoft transforms ideas into powerful digital solutions that drive business growth and user engagement.
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-indigo-900/50"></div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our <span className="text-indigo-600">Story</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in 2015, InnovateSoft began as a small team of passionate developers in San Francisco. Today, we&apos;re a global team of 150+ experts delivering innovative solutions to Fortune 500 companies and ambitious startups alike.
                </p>
                <p className="text-lg text-gray-600">
                  Our journey has been marked by continuous learning, adapting to new technologies, and most importantly - delivering real value to our clients.
                </p>
              </div>
              <div className="md:w-1/2 bg-indigo-50 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-4xl font-bold text-indigo-600 mb-2">150+</h3>
                    <p className="text-gray-600">Team Members</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-4xl font-bold text-indigo-600 mb-2">8</h3>
                    <p className="text-gray-600">Years Experience</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-4xl font-bold text-indigo-600 mb-2">500+</h3>
                    <p className="text-gray-600">Projects Delivered</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-4xl font-bold text-indigo-600 mb-2">98%</h3>
                    <p className="text-gray-600">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Core <span className="text-indigo-600">Values</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do at InnovateSoft
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description: "We push boundaries and explore new technologies to deliver cutting-edge solutions.",
                  icon: "💡"
                },
                {
                  title: "Excellence",
                  description: "Quality is at the heart of everything we build, from code to customer experience.",
                  icon: "🏆"
                },
                {
                  title: "Collaboration",
                  description: "We believe the best solutions come from diverse teams working together.",
                  icon: "🤝"
                },
                {
                  title: "Transparency",
                  description: "Open communication builds trust with our clients and within our team.",
                  icon: "🔍"
                },
                {
                  title: "Growth",
                  description: "We invest in continuous learning and professional development.",
                  icon: "🌱"
                },
                {
                  title: "Impact",
                  description: "We measure success by the value we create for our clients and communities.",
                  icon: "✨"
                }
              ].map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-600 text-white">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-indigo-100 mb-8">
              Let&apos;s discuss how we can help bring your digital vision to life.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
// export default function About() {
//   return (
//     <div>
//       <h1>About Page</h1>
//       <p>This is the About page.</p>
//     </div>
//   );
// }