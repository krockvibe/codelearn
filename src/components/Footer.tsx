import Link from "next/link";

const footerLinks = [
  {
    title: "Learn",
    links: [
      { href: "/lessons", label: "Lessons" },
      { href: "/practice", label: "Practice" },
      { href: "/progress", label: "Progress" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#", label: "Documentation" },
      { href: "#", label: "FAQ" },
      { href: "#", label: "Support" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f0f14] border-t border-[#2d2d3a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#569cd6] to-[#4ec9b0] rounded-lg flex items-center justify-center">
                <span className="text-[#0f0f14] font-bold text-sm">CL</span>
              </div>
              <span className="text-lg font-bold text-[#d4d4d4]">Code<span className="text-[#569cd6]">Learn</span></span>
            </Link>
            <p className="text-[#6a6a6a] max-w-xs mb-5">
              Learn programming with an interactive code editor. 
              Start building real projects today.
            </p>
            <div className="flex gap-4">
              {["GitHub", "Twitter", "Discord"].map((social) => (
                <a key={social} href="#" className="text-[#6a6a6a] hover:text-[#569cd6] transition-colors text-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-[#d4d4d4] font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#6a6a6a] hover:text-[#d4d4d4] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[#2d2d3a] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6a6a6a] text-sm">
            © 2026 CodeLearn. MIT License.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[#6a6a6a] hover:text-[#d4d4d4] transition-colors text-sm">
              Privacy
            </Link>
            <Link href="#" className="text-[#6a6a6a] hover:text-[#d4d4d4] transition-colors text-sm">
              Terms
            </Link>
            <Link href="#" className="text-[#6a6a6a] hover:text-[#d4d4d4] transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}