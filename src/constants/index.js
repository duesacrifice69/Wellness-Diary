export const medicalTests = [
  { name: "Blood Pressure", path: "/Tests/BloodPressure" },
  { name: "BMI", path: "/Tests/BMI" },
  { name: "Cholesterol", path: "/Tests/Cholesterol" },
  { name: "Blood Sugar", path: "/Tests/BloodSugar" },
  { name: "FBC", path: "/Tests/FBC" },
];
export const navigation = [
  { name: "Home", path: "/" },
  { name: "Articles", path: "/Articles" },
  {
    name: "My Tests",
    path: "/Tests",
    sub: medicalTests,
  },
  { name: "Services", path: "/Services" },
  { name: "About Us", path: "/AboutUs" },
];

export const adminRoles = ["admin"];

export const servicesData = [
  {
    title: "Manual Health Data Entry",
    description:
      "Easily track your vital health metrics, such as blood pressure, heart rate, weight, and daily activities.",
    benefits:
      "Take control of your health journey by monitoring key indicators and tracking progress over time.",
    image: "Manual Health Data Entry.jpg",
  },
  {
    title: "Real-time Monitoring",
    description:
      "Receive instant visual feedback on your health metrics, empowering you to stay informed and proactive about your well-being.",
    benefits:
      "Stay connected to your health in real-time, enabling timely intervention and improved health outcomes.",
    image: "Real-time Monitoring.png",
  },
  {
    title: "Alert System for Unusual Readings",
    description:
      "Our notification system alerts you to any abnormal health readings, providing peace of mind and prompt action when needed.",
    benefits:
      "Enjoy peace of mind knowing that you'll be notified of any concerning health trends, allowing for timely intervention and support.",
    image: "Alert System for Unusual Readings.jpg",
  },
  {
    title: "Educational Content",
    description:
      "Access a curated library of articles and resources on various health topics, empowering you with the knowledge to make informed decisions about your health.",
    benefits:
      "Expand your understanding of health and wellness topics, enabling you to make proactive choices and adopt healthier habits.",
    image: "Educational Content.jpg",
  },
  {
    title: "Medical Test Details",
    description:
      "Gain insights into common medical tests, including their purpose, preparation, and interpretation, helping you better understand your health assessments.",
    benefits:
      "Equip yourself with the knowledge to navigate medical tests with confidence, enabling better communication with healthcare providers and informed decision-making.",
    image: "Medical Test Details.jpg",
  },
];

export const articlesCategories = [
  { text: "Health & Wellness", value: 1 },
  { text: "Nutrition & Diet", value: 2 },
  { text: "Fitness & Exercise", value: 3 },
  { text: "Mental Health", value: 4 },
  { text: "Parenting & Family", value: 5 },
  { text: "Women's Health", value: 6 },
  { text: "Men's Health", value: 7 },
  { text: "Aging & Senior Health", value: 8 },
  { text: "Medical Research & Discoveries", value: 9 },
  { text: "Alternative Medicine", value: 10 },
  { text: "Diseases & Conditions", value: 11 },
  { text: "First Aid & Emergency Preparedness", value: 12 },
  { text: "Healthy Cooking & Recipes", value: 13 },
  { text: "Pregnancy & Childbirth", value: 14 },
  { text: "Sexual Health & Relationships", value: 15 },
];
