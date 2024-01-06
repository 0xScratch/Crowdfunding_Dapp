import React from 'react'

const Footer = () => {
    const productList = ["Market", "ERC20 Token", "Donation"]
    const contactList = [
        "support@cryptoking.com",
        "info@example.com",
        "Contact Us"
    ]

    const usefulLink = ["Home", "About Us", "Company Bio"]

    return (
        <footer className='text-center text-white backgroundMain lg:text-left'>
            <div className='mx-6 py-10 text-center md:text-left'>
                <div className='grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
                    <div className=''>
                        <h6 className='mb-4 flex items-center justify-center font-semibold uppercase md:justify-start' style={{fontFamily: 'cursive'}}>
                            Blockchain FundHub
                        </h6>
                        <p>
                            Pioneering the crypto industry with innovative solutions and services, Blockchain FundHub is your partner in empowering individuals and businesses.
                        </p>
                    </div>
                    <div className=''>
                        <h6 className='footer-headings mb-4 flex justify-center font-semibold uppercase md:justify-start'>
                            Products
                        </h6>
                        {productList.map((el, i) => (
                            <p className='mb-4' key={i + 1}>
                                <a href="#!">{el}</a>
                            </p>
                        ))}
                    </div>
                    <div className=''>
                        <h6 className='footer-headings mb-4 flex justify-center font-semibold uppercase md:justify-start'>
                            Useful links
                        </h6>
                        {usefulLink.map((el, i) => (
                            <p className='mb-4' key={i + 1}>
                                <a href="#!">{el}</a>
                            </p>
                        ))}
                    </div>
                    <div className=''>
                        <h6 className='footer-headings mb-4 flex justify-center font-semibold uppercase md:justify-start'>
                            Contact
                        </h6>
                        {contactList.map((el, i) => (
                            <p className='mb-4' key={i + 1}>
                                <a href="#!">{el}</a>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className='backgroundMain p-6 text-center'>
                <span>© 2023 Copyright: </span>
                <a href="https://tailwind-elements.com/" className='font-semibold main-heading link-hover-effect'>
                    Blockchain FundHub
                </a>
            </div>
        </footer>
    )
}

export default Footer