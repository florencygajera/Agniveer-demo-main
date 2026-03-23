import W from "../custom/W"

export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-b from-[#222529] to-[#191B1D] text-white">
      <W>
        <div className="flex flex-col gap-10 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-amber-400">
                Agniveer — Agnipath
              </h3>
              <p className="text-sm leading-relaxed text-zinc-300">
                Official portal of the Indian Army for managing Agnipath scheme.
                <span className="text-amber-300">
                  {" "}
                  Ministry of Defence, Govt. of India.
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-amber-300">
                Quick Links
              </h4>
              <FooterLink color="cyan">Home</FooterLink>
              <FooterLink color="cyan">About Agnipath</FooterLink>
              <FooterLink color="cyan">Apply Now</FooterLink>
              <FooterLink color="cyan">Results</FooterLink>
              <FooterLink color="cyan">Exam Centres</FooterLink>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-amber-300">
                Information
              </h4>
              <FooterLink color="lime">Eligibility Criteria</FooterLink>
              <FooterLink color="lime">Physical Standards</FooterLink>
              <FooterLink color="lime">Documents Required</FooterLink>
              <FooterLink color="lime">Salary & Benefits</FooterLink>
              <FooterLink color="lime">FAQ</FooterLink>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-amber-300">Support</h4>
              <FooterLink color="pink">Help Desk</FooterLink>
              <FooterLink color="pink">Contact Us</FooterLink>
              <FooterLink color="pink">Grievance Portal</FooterLink>
              <FooterLink color="pink">RTI</FooterLink>
              <FooterLink color="pink">Privacy Policy</FooterLink>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4 text-center">
            <span className="text-xs text-neutral-400">
              © 2025{" "}
              <span className="text-amber-400">Agniveer — Agnipath Scheme</span>{" "}
              ·{" "}
              <span className="text-amber-300">
                Ministry of Defence, Government of India
              </span>{" "}
              · All Rights Reserved
            </span>
          </div>
        </div>
      </W>
    </footer>
  )
}

function FooterLink({
  children,
  color = "primary",
}: {
  children: React.ReactNode
  color?: "primary" | "cyan" | "lime" | "pink"
}) {
  let hoverColor = ""
  switch (color) {
    case "cyan":
      hoverColor = "hover:text-cyan-400"
      break
    case "lime":
      hoverColor = "hover:text-lime-400"
      break
    case "pink":
      hoverColor = "hover:text-pink-400"
      break
    default:
      hoverColor = "hover:text-primary"
  }
  return (
    <span
      className={`cursor-pointer text-sm text-zinc-300 transition hover:underline ${hoverColor}`}
    >
      {children}
    </span>
  )
}
