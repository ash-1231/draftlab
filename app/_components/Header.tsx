'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-gray-200 dark:bg-gray-900 relative">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        
        <Image src="/logo2.png" className='mix-blend-multiply' alt="logo" width={200} height={200} />

        <div className="flex flex-1 items-center justify-end">
          
          {/* <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {["About", "Careers", "History", "Services", "Projects", "Blog"].map(
                (item) => (
                  <li key={item}>
                    <a
                      className="text-gray-900 transition hover:text-gray-700 dark:text-white dark:hover:text-white/75"
                      href="#"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav> */}

          {/* Buttons */}
          <div className="flex items-centre gap-4">
            <div className="hidden sm:flex sm:gap-4">
              <a id="loginBtn" className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700 cursor-pointer">
                <LoginLink postLoginRedirectURL='/dashboard'>Login</LoginLink>
              </a>
              <a className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white cursor-pointer">
                <RegisterLink>Register</RegisterLink>
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-sm bg-gray-100 p-2.5 dark:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 text-gray-600 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-4 space-y-4">
          {["About", "Careers", "History", "Services", "Projects", "Blog"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="block text-gray-900 dark:text-white"
              >
                {item}
              </a>
            )
          )}
        </div>
      )}
    </header>
  )
}