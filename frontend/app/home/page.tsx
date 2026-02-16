export default function HomePage() {
    return (
      <main className="min-h-screen bg-gray-100 flex flex-col">
  
        {/* Navbar */}
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">ChatApp</h1>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
              Login
            </button>
            <button className="bg-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-900 transition">
              Register
            </button>
          </div>
        </nav>
  
        {/* Hero Section */}
        <section className="flex flex-1 items-center justify-center px-6">
          <div className="text-center max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Baatein
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Connect. Chat. Collaborate.
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              A simple and fast real-time chat application built with Next.js.
              Stay connected with your friends anytime, anywhere.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-md">
              Get Started
            </button>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-white text-center py-4 text-gray-500 text-sm shadow-inner">
          © 2026 ChatApp. All rights reserved.
        </footer>
  
      </main>
    );
  }
  