import React from 'react'
import Link from 'next/link'

function Hero() {
  return (
    <section className="bg-gray-200 lg:grid lg:h-screen lg:place-content-center">
      <div className="mx-auto w-screen max-w-7xl px-3 py-16 sm:px-5 sm:py-24 lg:px-7 lg:py-32">
        <div className="mx-auto max-w-prose text-center">

          <h1 className="text-5xl font-extrabold text-sky-700 sm:text-5xl">
            Documents & diagrams
          </h1>

          <h1 className="text-5xl font-extrabold text-slate-500 sm:text-5xl">
            For Engineering Teams
          </h1>

          <p className="mt-4 text-xl text-pretty text-gray-700 sm:text-lg/relaxed">
            All-in-One markdown editor, collaborative canvas, and diagram-as-code builder
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">

            {/* 🔥 Get Started */}
            <Link
              href="/dashboard"
              className="inline-block rounded-xl border border-teal-600 bg-teal-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
            >
              Get Started
            </Link>

            {/* 📘 Learn More */}
            <Link
              href="/about"
              className="inline-block rounded-xl border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Learn More
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero