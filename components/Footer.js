import React from 'react'

const Footer = () => {
    let today = new Date();
    const currentYear = today.getFullYear()

  return (
    <footer>
        <p>&copy; {currentYear} , all right reserved</p>
    </footer>
  )
}

export default Footer
