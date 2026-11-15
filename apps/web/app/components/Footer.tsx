import Image from "next/image";

const LINKS = [
  { href: "#", label: "Sobre la página" },
  { href: "#", label: "PF" },
  { href: "#", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Image
            src="/icon.svg"
            alt=""
            width={24}
            height={24}
            className="size-6 rounded-lg"
          />
          <span className="text-sm font-semibold tracking-tight text-text">
            <span className="text-blue-ink">L</span>yno
            <span className="text-purple-ink">.</span>
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-1">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm text-text-3 transition duration-150 hover:bg-surface-2 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
