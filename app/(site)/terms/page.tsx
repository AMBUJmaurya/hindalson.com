import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Hindalson Technology",
  description:
    "Terms of Service for Hindalson Technology — website use and service engagement terms.",
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service" updated="14 September 2026">
      <h2>1. Agreement</h2>
      <p>
        These Terms of Service (“Terms”) govern your use of the Hindalson Technology
        website and, where applicable, engagement with our services. By accessing our
        website or requesting a proposal, you agree to these Terms.
      </p>
      <p>
        Company contact:{" "}
        <a href="mailto:hello@hindalson.com">hello@hindalson.com</a> · India
      </p>

      <h2>2. Services</h2>
      <p>
        Hindalson Technology provides digital services that may include website
        development, app development, monthly website/app management (including SEO), and
        performance marketing. Exact scope, deliverables, timelines, and fees are defined
        in a proposal, quotation, statement of work, or written agreement for each project.
      </p>

      <h2>3. Website use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Misuse the site or attempt unauthorised access to systems or data</li>
        <li>Submit false, misleading, or unlawful information through forms</li>
        <li>Scrape, copy, or reuse site content for commercial purposes without permission</li>
        <li>Interfere with the site’s security or performance</li>
      </ul>

      <h2>4. Enquiries & proposals</h2>
      <p>
        Submitting a form or contacting us does not create a binding project contract.
        Proposals and estimates are informational until both parties agree in writing
        (including email confirmation) on scope and commercial terms.
      </p>

      <h2>5. Client responsibilities</h2>
      <p>When you engage our services, you agree to:</p>
      <ul>
        <li>Provide accurate requirements, content, access, and feedback in good time</li>
        <li>Ensure you have rights to materials you supply (logos, copy, images, data)</li>
        <li>Make payments as agreed in the proposal or invoice schedule</li>
        <li>Designate a point of contact for approvals and decisions</li>
      </ul>
      <p>
        Delays in providing assets or approvals may extend timelines. Hindalson is not
        liable for delays caused by late client input.
      </p>

      <h2>6. Fees & payment</h2>
      <p>
        Fees are as stated in the agreed proposal/invoice. Unless otherwise written,
        advance payments (if any) may be required before work begins. Late payments may
        pause delivery. Taxes (such as GST), if applicable, will be charged as required by
        law.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        Upon full payment, ownership of final deliverables created specifically for you
        transfers as agreed in writing, excluding third-party tools, fonts, libraries,
        stock assets, and Hindalson’s pre-existing methods, frameworks, or generic
        components. We may showcase completed work in our portfolio unless you request
        otherwise in writing before launch.
      </p>

      <h2>8. Third-party services</h2>
      <p>
        Projects may rely on third-party platforms (hosting, domains, CMS, ad networks,
        analytics, app stores). Those services have their own terms. Hindalson is not
        responsible for outages, policy changes, or costs charged by third parties unless
        expressly included in our agreement.
      </p>

      <h2>9. Marketing & advertising services</h2>
      <p>
        For performance marketing, results depend on many factors (budget, market,
        creative, competition, platform rules). We do not guarantee specific lead volumes,
        rankings, or ROAS unless explicitly stated in writing.
      </p>

      <h2>10. SEO & monthly management</h2>
      <p>
        SEO and management retainers involve ongoing work. Search rankings and traffic can
        fluctuate due to algorithm changes and competition. We commit to professional
        effort and transparent reporting as scoped — not guaranteed #1 rankings.
      </p>

      <h2>11. Confidentiality</h2>
      <p>
        Both parties agree to keep confidential business information received during a
        project reasonably protected, except where disclosure is required by law or already
        public.
      </p>

      <h2>12. Warranties & limitation of liability</h2>
      <p>
        Services are provided with reasonable skill and care. To the maximum extent
        permitted by law, Hindalson is not liable for indirect, incidental, or
        consequential losses (including lost profits or data). Our total liability for a
        project is limited to fees paid for that project in the three months preceding the
        claim, unless a different limit is agreed in writing.
      </p>

      <h2>13. Termination</h2>
      <p>
        Either party may end an engagement as described in the project agreement. On
        termination, you remain responsible for fees for work completed and non-cancellable
        third-party costs already incurred.
      </p>

      <h2>14. Refunds</h2>
      <p>
        Because digital services are custom and time-based, fees for completed work and
        started milestones are generally non-refundable, unless otherwise agreed in writing
        or required by applicable law.
      </p>

      <h2>15. Governing law</h2>
      <p>
        These Terms are governed by the laws of India. Courts in India
        shall have jurisdiction, subject to applicable law.
      </p>

      <h2>16. Changes</h2>
      <p>
        We may update these Terms periodically. The “Last updated” date shows the current
        version. Continued use of the website after updates constitutes acceptance of the
        revised Terms for website use. Active project contracts remain governed by their
        signed/agreed documents unless amended.
      </p>

      <h2>17. Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a href="mailto:hello@hindalson.com">hello@hindalson.com</a>.
      </p>
    </LegalPage>
  );
}
