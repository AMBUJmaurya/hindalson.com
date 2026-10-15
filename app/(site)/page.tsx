import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesSnapshot } from "@/components/home/ServicesSnapshot";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProcessPreview } from "@/components/home/ProcessPreview";
import { PortfolioHighlight } from "@/components/home/PortfolioHighlight";
import { Testimonials } from "@/components/home/Testimonials";
import { LeadCapture } from "@/components/home/LeadCapture";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSnapshot />
      <WhyChooseUs />
      <ProcessPreview />
      <PortfolioHighlight />
      <Testimonials />
      <LeadCapture />
    </>
  );
}
