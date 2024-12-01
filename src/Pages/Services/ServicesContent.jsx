import Clinical from "../../Assets/Services/services.jpeg";
import Diagnostic from "../../Assets/Services/service2.jpeg"
import Laboratory from "../../Assets/Services/services4.jpeg";
import Pharmacy from "../../Assets/Services/Pharmacy.jpeg";
import Transfusion from "../../Assets/Services/Transfusion.jpeg";
import Professions from "../../Assets/Services/Professions Allied to Medicine.jpeg";



const Servicecards = [
  {
    id: 1,
    imageUrl: Clinical,
    title: "Clinical Services",
    slug: "clinical-services",
    altImg: "Clinical Services",
  },
  {
    id: 2,
    imageUrl: Diagnostic,
    slug: "diagnostic-services",
    title: "Diagnostic Services ",
    altImg: "Diagnostic Services",
  },
  {
    id: 3,
    imageUrl: Laboratory,
    slug: "laboratory-services",
    title: "Laboratory Services",
    altImg: "Laboratory Services",
  },
  {
    id: 4,
    imageUrl: Pharmacy,
    slug: "pharmacy-services",
    title: "Pharmacy ",
    altImg: "Pharmacy",
  },
  {
    id: 5,
    imageUrl: Transfusion,
    slug: "transfusion-services",
    title: "Transfusion",
    altImg: "Transfusion",
  },
  {
    id: 6,
    imageUrl: Professions,
    slug: "professions-services",
    title: "Professions Allied to Medicine ",
    altImg: "Professions Allied to Medicine",
  },

  {
    id: 7,
    imageUrl: Clinical,
    slug: "support-services",
    title: " Support Services",
    altImg: " Support Services",
  },

  // Add more cards as needed
];
export default Servicecards;
