import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Vetbuddy by Scruffx</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 text-blue-600 flex-shrink-0" />
                <span>Ideashacks Coworking, 14/3 Main Mathura Road,<br />Faridabad, Haryana 121003</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="space-y-1">
                  <a href="tel:+6585496423" className="hover:text-blue-600 transition-colors">+65 8549 6423</a>
                  <br />
                  <a href="tel:+918383921247" className="hover:text-blue-600 transition-colors">+91 8383921247</a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 md:text-right">
            <h3 className="text-xl font-semibold text-gray-900">Quick Links</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Vetbuddy. Powered by <span className="text-blue-600">Scruffx</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
