import Link from "next/link";

const footerLinks = [
  {
    title: "Platform",
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
    <footer className="bg-[#12121a] border-t border-[#2e2e3a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#f472b6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <span className="text-xl font-bold text-white">CodeLearn</span>
            </Link>
            <p className="text-[#64748b] max-w-sm">
              Learn programming from scratch with interactive lessons,
              hands-on practice, and real-time code execution.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#64748b] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#2e2e3a] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#64748b] text-sm">
            © 2026 CodeLearn. Built for beginners.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[#64748b] hover:text-white transition-colors text-sm">
              Privacy
            </Link>
            <Link href="#" className="text-[#64748b] hover:text-white transition-colors text-sm">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}