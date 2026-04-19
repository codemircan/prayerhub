import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="container mx-auto max-w-4xl flex-grow px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
