import { FaqSection } from '../components/FaqSection';
import { faqCategories, faqData } from '../data/faqData';

export default function FaqPage() {
  return <FaqSection faqData={faqData} categories={faqCategories} />;
}
