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

export const servicesSampleData = [
  {
    title: "Free Chekup",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.",
    image: "image.png",
  },
  {
    title: "Free Chekup",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.",
    image: "image.png",
  },
  {
    title: "Free Chekup",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.",
    image: "image.png",
  },
  {
    title: "Free Chekup",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.",
    image: "image.png",
  },
  {
    title: "Free Chekup",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.",
    image: "image.png",
  },
  {
    title: "Free Chekup",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor augue. Velit nascetur massa in.",
    image: "image.png",
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
