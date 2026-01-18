export const SELECTED_PROJECTS = [
  {
    id: "01",
    title: "Sea Quest",
    description: "Real-time market analytics engine handling 50k+ websocket events/sec.",
    tags: ["Next.js 14", "Tailwind CSS", "Typescript"],
    repo: "https://github.com/moseschengo29/SeaQuest",
    link: "https://seaquestresources.com/",
    // Replace these with your actual screenshots (16:9 aspect ratio works best)
    gallery: [
      "/SeaQuest/SeaQuest1.png", 
      "/SeaQuest/SeaQuest2.png", 
      "/SeaQuest/SeaQuest3.png", 
      "/SeaQuest/SeaQuest4.png", 
      "/SeaQuest/SeaQuest5.png", 
      "/SeaQuest/SeaQuest6.png", 
      
    ]
  },
  {
    id: "02",
    title: "Neural_Vision",
    description: "AI Diagnostic assistant detecting anomalies in X-Rays with 98% accuracy.",
    tags: ["Python", "TensorFlow", "FastAPI"],
    repo: "https://github.com/moses/vision",
    link: "#",
    gallery: [
      "/projects/med-1.jpg",
      "/projects/med-2.jpg",
      "/projects/med-3.jpg"
    ]
  },
  {
    id: "03",
    title: "Hydrogen_Store",
    description: "Headless commerce architecture with sub-second global page loads.",
    tags: ["Shopify", "GraphQL", "React"],
    repo: "htpps://github.com/moses/store",
    link: "#",
    gallery: [
      "/projects/store-1.jpg",
      "/projects/store-2.jpg"
    ]
  },
];

export const PROJECTS_DB = [
    { id: "sea-quest-resources", name: "Sea Quest", path: "https://seaquestresources.com" },
    { id: "medical", name: "AI Medical Scan", path: "/work/medical" },
    { id: "commerce", name: "Hydrogen Store", path: "/work/commerce" },
  ];