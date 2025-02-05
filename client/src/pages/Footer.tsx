const Footer = () => {
    return (
      <footer className="bg-gray-100 mt-16 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-semibold">About Us</h3>
              <p className="text-gray-600 mt-2">
                We provide trusted healthcare services with expert consultations and appointments.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-blue-600 hover:underline">Home</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Find a Doctor</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Consultation</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <p className="text-gray-600 mt-2">Email: support@QuickDoc.com</p>
              <p className="text-gray-600">Phone: +91 123 456 7890</p>
            </div>
          </div>
          <hr className="my-6 border-gray-300" />
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} QuickDoc. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
export default Footer;