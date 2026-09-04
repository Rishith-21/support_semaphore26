import { CampusMapSection } from '../components/CampusMapSection';
import { campusData, facilityCategories } from '../data/campusData';

export default function CampusPage() {
  return (
    <CampusMapSection
      campusData={campusData}
      categories={facilityCategories}
    />
  );
}