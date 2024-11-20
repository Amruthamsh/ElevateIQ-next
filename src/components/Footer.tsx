import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4 text-center">
      <div className="max-w-7xl w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between p-4">
        <div className="flex items-center mb-2 sm:mb-0">
          {/* <Image src="/Image/logo.png" alt="Logo Alt Text" width={50} height={50} className="rounded-full" /> */}
          <span className="ml-3 text-lg">ElevateIQ</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 sm:ml-4 text-center">
          © {new Date().getFullYear()} ElevateIQ —
          <a
            href="https://twitter.com/knyttneve"
            className="text-gray-500 ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            @TEAM BOTS
          </a>
        </p>
        <Link
          href="/aboutus"
          className="flex items-center text-gray-400 hover:text-white"
        >
          <span className="text-xs sm:text-sm">About Us</span>
        </Link>
      </div>
    </footer>
  );
}
