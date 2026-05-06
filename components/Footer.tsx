export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-gray-800 text-center">
      <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Wealth Builder — AI Financial Trainer. All rights reserved.</p>
      <p className="mt-1 text-gray-600 text-xs">Secure payments powered by PayPal</p>
    </footer>
  );
}
