import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Hindalson Technology",
  description:
    "Privacy Policy for Hindalson Technology — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="14 September 2026">
      <h2>1. Who we are</h2>
      <p>
        This Privacy Policy explains how <strong>Hindalson Technology</strong> (“Hindalson”,
        “we”, “us”, or “our”) collects, uses, and protects personal information when you
        visit our website, submit enquiry forms, contact us on WhatsApp/email/phone, or
        use our services.
      </p>
      <p>
        Contact:{" "}
        <a href="mailto:hello@hindalson.com">hello@hindalson.com</a> · India
      </p>

      <h2>2. Information we collect</h2>
      <p>We may collect the following information:</p>
      <ul>
        <li>
          <strong>Identity & contact details</strong> — name, company name, email address,
          mobile number
        </li>
        <li>
          <strong>Project details</strong> — service interest, brief/description of your
          requirements or issues
        </li>
        <li>
          <strong>Communication data</strong> — messages sent via forms, WhatsApp, email,
          or phone
        </li>
        <li>
          <strong>Technical data</strong> — IP address, browser type, device information,
          pages visited, and approximate location (via analytics tools, if enabled)
        </li>
        <li>
          <strong>Cookies / similar tech</strong> — as described in our cookie section below
        </li>
      </ul>

      <h2>3. How we use your information</h2>
      <p>We use personal information to:</p>
      <ul>
        <li>Respond to enquiries and provide proposals</li>
        <li>Deliver websites, apps, SEO/management, and marketing services</li>
        <li>Communicate project updates, invoices, and support</li>
        <li>Improve our website, services, and user experience</li>
        <li>Comply with legal obligations and protect our rights</li>
      </ul>
      <p>We do not sell your personal information to third parties.</p>

      <h2>4. Legal bases (where applicable)</h2>
      <p>
        Depending on applicable law, we process data based on your consent, performance of
        a contract (or steps before entering one), our legitimate interests (such as
        improving services and responding to enquiries), and legal compliance.
      </p>

      <h2>5. Sharing of information</h2>
      <p>We may share information with:</p>
      <ul>
        <li>
          <strong>Service providers</strong> — hosting, email, analytics, payment, or
          communication tools that help us operate
        </li>
        <li>
          <strong>Professional advisors</strong> — when reasonably required
        </li>
        <li>
          <strong>Authorities</strong> — if required by law or to protect rights and safety
        </li>
      </ul>
      <p>
        Where we use third-party tools, they process data under their own terms and privacy
        policies.
      </p>

      <h2>6. Cookies & analytics</h2>
      <p>
        Our website may use cookies or similar technologies for essential site function,
        performance measurement, and improving content. Analytics tools (such as GA4) or
        advertising pixels may be added as the site grows. You can control cookies through
        your browser settings.
      </p>

      <h2>7. Data retention</h2>
      <p>
        We keep personal information only as long as needed for the purposes above —
        typically while an enquiry or project is active, and thereafter for a reasonable
        period for records, legal, or accounting needs, unless a longer retention is
        required by law.
      </p>

      <h2>8. Data security</h2>
      <p>
        We take reasonable technical and organisational measures to protect personal data
        from unauthorised access, loss, or misuse. No method of transmission or storage is
        100% secure, so we cannot guarantee absolute security.
      </p>

      <h2>9. Your rights</h2>
      <p>Subject to applicable law, you may request to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion, where appropriate</li>
        <li>Withdraw consent where processing is consent-based</li>
        <li>Object to or restrict certain processing</li>
      </ul>
      <p>
        To exercise these rights, email{" "}
        <a href="mailto:hello@hindalson.com">hello@hindalson.com</a>.
      </p>

      <h2>10. Children’s privacy</h2>
      <p>
        Our services are directed to businesses and adults. We do not knowingly collect
        personal information from children under 18.
      </p>

      <h2>11. Third-party links</h2>
      <p>
        Our site may link to external websites. We are not responsible for their privacy
        practices. Please review their policies separately.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The “Last updated” date at the
        top will reflect the latest version. Continued use of the site after changes means
        you acknowledge the updated policy.
      </p>

      <h2>13. Contact</h2>
      <p>
        For privacy questions:{" "}
        <a href="mailto:hello@hindalson.com">hello@hindalson.com</a>.
      </p>
    </LegalPage>
  );
}
