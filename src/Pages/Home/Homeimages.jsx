import Healthbanner from "../../Assets/Banners/homebanner.png";
import ANAESTHESIOLOGY from "../../Assets/Departments/ANAESTHESIOLOGY.jpeg";
// import CARDIOLOGY from "../../Assets/Departments/CARDIOLOGY.jpg";
// import drsanjay from "../../Assets/Doctors/dr-sanjay.jpg";
// import drrakesh from "../../Assets/Doctors/dr-rakesh.jpg";
// import drsameer from "../../Assets/Doctors/dr-sameer.webp";
// import drgunjan from "../../Assets/Doctors/dr-gunjan.webp";
import person1 from "../../Assets/manpic.png";
// import Anaesthesiology from "../OurDepartment/Anaesthesiology";
// import Cardiology from "../OurDepartment/Cardiology";

const Banner = {
  Health: "Welcome to Neo Hospital",
  Heading: "Best Hospital Growth in Medical Era",
  paragraph:
    "Neo Hospital is recognized within and beyond Noida people as an advanced diagnostic and treatment facility, staffed with highly qualified professionals. The staff is courteous, considerate and helpful. ",
  Healthbanner: Healthbanner,
  button: " Book Appointment",
  button2: "Read More",
};


const testimonials = [
  {
    id: 1,
    person: person1,
    author: "A Govindan",
    testurl: "https://g.co/kgs/mJN34KX",
    text: "My Mrs Amirthavalli Govindan was suffering from unexpected acute pain due to stroke like complaint and admitted in casualty in Neo hospital during this month as auto immune disorder Admin( Varsha Chauhan) and staff/nurses, physio, dietitian canteen services are excellent  Dr Motwania and his team - dr subrabhat and dr Khurshid- work gives me an hope that I would be relieved from the pain and problems at the earliest. I will recommend if anyone suffering from discease like mine. Regards",

  },
  {
    id: 2,
    person: person1,
    author: "DHANANJAY KUMAR RAI",
    testurl: "https://g.co/kgs/DEkD6Ug",
    text: "The best hospital in NCR not only related to treatment but even all over management staff too. Co-oporation, diligence, sincerity and even punctualty too. Dr. Rajiv Motiani Sir and his team of management have managed this Hospital in all the ways in a very effective manner. Too much patient friendly Hospital is this. My all the best wishes to prosper this Hospital and team of Rajiv motiani sir.",
  },
  {
    id: 3,
    person: person1,
    author: "Rohit Kumar",
    testurl: "https://g.co/kgs/979QaBf",
    text: "Very good and premium dental treatment, at very competitive pricing ,Dr suhrab and his team are very professional, very hygenic and listens to patients very carefully",
  },
  // Add more testimonials as needed
];

export default Banner;
export { testimonials };
