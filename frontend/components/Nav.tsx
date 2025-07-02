import Link from "next/link";

const links = [
  { href: "/auth/login", name: "Login" },
  { href: "/Allquiz", name: "Review" },
  { href: "/quiz", name: "Quiz" },
  {href : "/vid", name: "Notes"}
];

const Nav = () => {
  return (
    <nav className="w-full bg-slate-800 h-16 flex items-center justify-between px-6 md:px-20 shadow-md">
      <p className="text-white font-bold text-3xl font-main">Kwezz</p>
      <div className="flex space-x-6">
        {links.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className="text-white font-semibold text-lg font-main hover:text-slate-500 transition-colors duration-300"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
