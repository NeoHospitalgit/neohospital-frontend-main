import DentalScienceimg from "../../Assets/Services/Dental Science.png";
import Dermatologyimg from "../../Assets/Services/Dermatology and Venereology.png"; 
import Gynaecologyimg from "../../Assets/Services/Medical Gastroenterology.png";
import Nephrologyimg from "../../Assets/Services/Nephrology including Dialysis.png";
import Dieteticsimg from "../../Assets/Services/X-Ray.png";
import Physiotherapyimg from "../../Assets/Services/Psychiatry (OPD).png";
import Ophthalmologyimg from "../../Assets/Services/Ophthalmology.png";
import Gastroenterologyimg from "../../Assets/Services/Medical Gastroenterology.png";
import Entimg from "../../Assets/Services/EMG EP.png";
import Paediatricsimg from "../../Assets/Departments/ANAESTHESIOLOGY.jpeg";
import Pshycologyimg from "../../Assets/Departments/ANAESTHESIOLOGY.jpeg";
import AnaesthesiologyIncluding from "../../Assets/Services/Anaesthesiology Including Critical Care.png";
import Neuroscienceimg from "../../Assets/Services/Neurosurgery.png";
import Cardiology from "../../Assets/Services/Cardiology.png";
import Urologyimg from "../../Assets/Services/Urology.png"; 
import GeneralSurgery from "../../Assets/Services/General Surgery.png"; 

const departmentcontent = [
  {
    id: 1,
    imageUrl: AnaesthesiologyIncluding,
    title: "ANAESTHESIOLOGY",
    departmentslug: "anaesthesiology",
    alt: "ANAESTHESIOLOGY",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Providing expert anaesthetic care at Neuro Hospital in Noida for safe and pain-free procedures.",
  },
  {
    id: 2,
    imageUrl: Cardiology,
    title: "CARDIOLOGY",
    departmentslug: "cardiology",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Exceptional heart care at the best Cardiologist in Noida, ensuring a healthy cardiovascular system.",
  },
  {
    id: 3,
    imageUrl: Pshycologyimg,
    title: "PSYCHOLOGY",
    departmentslug: "psychology",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Compassionate mental health support for well-being at Good Hospital in Noida.",
  },
  {
    id: 4,
    imageUrl: DentalScienceimg,
    title: "DENTAL",
    departmentslug: "dental",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Premier dental care at the Best Dental Hospital in Noida for a bright and healthy smile.",
  },
  {
    id: 5,
    imageUrl: Dermatologyimg,
    title: "DERMATOLOGY",
    departmentslug: "dermatology",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Leading dermatological care by the Best Dermatologist in Noida for radiant and healthy skin.",
  },
  {
    id: 6,
    imageUrl: Dieteticsimg,
    title: "DIETETICS",
    departmentslug: "dietetics",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Personalized nutrition plans at NEO Hospital in Noida for a healthier lifestyle.",
  },

  {
    id: 7,
    imageUrl: Entimg,
    title: " ENT",
    departmentslug: "ent",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Specialized ear, nose, and throat care by the top ENT Specialist in Noida.",
  },
  {
    id: 8,
    imageUrl: Gastroenterologyimg,
    title: "GASTROENTEROLOGY",
    departmentslug: "gastroenterlogy",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "ecialized gastrointestinal care led by the Best Gastroenterologist in Noida.",
  },
  {
    id: 9,
    imageUrl: Gynaecologyimg,
    title: " GYNAECOLOGY",
    departmentslug: "gynaecology",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Comprehensive women's health services led by the Best Gynaecologist in Noida.",
  },
  {
    id: 10,
    imageUrl: Nephrologyimg,
    title: " NEPHROLOGY",
    departmentslug: "nephrology",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Renal health expertise provided by the top Nephrologist in Noida.",
  },
  {
    id: 11,
    imageUrl: Neuroscienceimg,
    title: "NEUROSCIENCES",
    departmentslug: "neuroscience",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Advanced neurological care with the Best Neurosurgeon in Noida and top Neurologist.",
  },
  {
    id: 12,
    imageUrl: Ophthalmologyimg,
    title: "OPHTHALMOLOGY",
    departmentslug: "ophthalmology",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Comprehensive eye care provided by the top Ophthalmologist in Noida.",
  },
  {
    id: 13,
    imageUrl: Paediatricsimg,
    title: "PAEDIATRICS",
    departmentslug: "paediatrics",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Dedicated pediatric care for little ones at the Best Hospital in Noida.",
  },
  {
    id: 14,
    imageUrl: Physiotherapyimg,
    title: "PHYSIOTHERAPY",
    departmentslug: "physiotherapy",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Tailored physiotherapy services promoting healing and wellness.",
  },
  {
    id: 15,
    imageUrl: Pshycologyimg,
    title: "PULMONOLOGY",
    departmentslug: "pulmonology",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Expert respiratory care with the Best Pulmonologist in Noida.",
  },
  {
    id: 16,
    imageUrl: GeneralSurgery,
    title: "  SURGERY",
    departmentslug: "surgery",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    description:
      "Cutting-edge surgical procedures delivered by skilled surgeons at Super Speciality Hospital Noida.",
  },
  {
    id: 17,
    imageUrl: Urologyimg,
    title: "UROLOGY",
    sortdescription:
      "Anaesthesiology is a critical medical specialty that plays a pivotal role in ensuring patient comfort and safety during surgical procedures. ",
    departmentslug: "urology",

    description: "Leading urological care by the Best Urologist in Noida.",
  },
  // Add more cards as needed
];

export default departmentcontent;
