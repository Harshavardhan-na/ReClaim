// Sample mock data for ReClaim Campus Lost & Found Platform
// Configured with exact assessment demonstration accounts

export const SAMPLE_USERS = [
  {
    id: "usr_001",
    name: "Aarav Sharma",
    email: "22BCE1042@vitap.ac.in",
    password: "Student@123",
    role: "student",
    groups: ["STUDENT"],
    phone: "+91 98765 43210",
    regNumber: "22BCE1042",
    campus: "VIT-AP University",
    department: "Computer Science & Engineering",
    joinedDate: "August 2022"
  },
  {
    id: "usr_002",
    name: "Sneha Patel",
    email: "22BCE1189@vitap.ac.in",
    password: "Student@123",
    role: "student",
    groups: ["STUDENT"],
    phone: "+91 98451 23456",
    regNumber: "22BCE1189",
    campus: "VIT-AP University",
    department: "Computer Science & Engineering",
    joinedDate: "August 2022"
  },
  {
    id: "usr_003",
    name: "Rohan Verma",
    email: "21BCE0845@vitap.ac.in",
    password: "Student@123",
    role: "student",
    groups: ["STUDENT"],
    phone: "+91 97123 45678",
    regNumber: "21BCE0845",
    campus: "VIT-AP University",
    department: "Electronics & Communication",
    joinedDate: "August 2021"
  },
  {
    id: "usr_admin",
    name: "Harsha Vardhan (Security Admin)",
    email: "admin.harsha@vitap.ac.in",
    password: "Admin@123",
    role: "admin",
    groups: ["ADMIN"],
    phone: "+91 86323 99999",
    regNumber: "STAFF-SEC-01",
    campus: "VIT-AP Campus Security Central Office",
    department: "Campus Safety & Institutional Security",
    joinedDate: "January 2020"
  }
];

export const CATEGORIES = [
  "Electronics & Gadgets",
  "ID Cards & Wallets",
  "Books & Study Material",
  "Keys & Keychains",
  "Bags & Backpacks",
  "Watches & Wearables",
  "Water Bottles & Accessories",
  "Clothing & Apparel",
  "Other Items"
];

export const CAMPUS_LOCATIONS = [
  "Central Library - 2nd Floor Reading Hall",
  "Student Activity Center (SAC) - Ground Floor",
  "Academic Block 1 (AB-1) - Room 204",
  "Academic Block 2 (AB-2) - Computer Lab 4",
  "Central Cafeteria / Food Court",
  "Indoor Sports Complex - Badminton Court",
  "Newton Hall - Ground Floor Lounge",
  "Sarvepalli Radhakrishnan Block",
  "Main University Gate Security Desk",
  "Hostel Block MH-1 Lobby"
];

export const INITIAL_ITEMS = [
  {
    id: "item_101",
    name: "Apple AirPods Pro (2nd Gen) in White Case",
    category: "Electronics & Gadgets",
    description: "Found wireless AirPods in a glossy white charging case with a faint blue silicone protector. Found on table #14 near the silent study wing.",
    location: "Central Library - 2nd Floor Reading Hall",
    foundDate: "2026-11-05",
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
    contactName: "Aarav Sharma",
    contactPhone: "+91 98765 43210",
    contactEmail: "22BCE1042@vitap.ac.in",
    postedBy: "usr_001",
    createdAt: "2026-11-05T10:30:00Z"
  },
  {
    id: "item_102",
    name: "VIT-AP Student ID Card & Lanyard",
    category: "ID Cards & Wallets",
    description: "Official University student ID card in a blue fabric lanyard. Belongs to a 3rd year CSE student. Handed over to security desk.",
    location: "Central Cafeteria / Food Court",
    foundDate: "2026-11-06",
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    contactName: "Sneha Patel",
    contactPhone: "+91 98451 23456",
    contactEmail: "22BCE1189@vitap.ac.in",
    postedBy: "usr_002",
    createdAt: "2026-11-06T13:15:00Z"
  },
  {
    id: "item_103",
    name: "Casio fx-991EX Scientific Calculator",
    category: "Electronics & Gadgets",
    description: "Casio ClassWiz scientific calculator with black sliding cover. Has a small yellow sticker on the back battery slot.",
    location: "Academic Block 1 (AB-1) - Room 204",
    foundDate: "2026-11-04",
    status: "CLAIMED",
    imageUrl: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80",
    contactName: "Aarav Sharma",
    contactPhone: "+91 98765 43210",
    contactEmail: "22BCE1042@vitap.ac.in",
    postedBy: "usr_001",
    createdAt: "2026-11-04T16:00:00Z"
  },
  {
    id: "item_104",
    name: "Set of 3 Bike & Hostel Room Keys",
    category: "Keys & Keychains",
    description: "Three keys on a metallic ring with a miniature black Batman keychain and a small leather tag.",
    location: "Student Activity Center (SAC) - Ground Floor",
    foundDate: "2026-11-06",
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80",
    contactName: "Rohan Verma",
    contactPhone: "+91 97123 45678",
    contactEmail: "21BCE0845@vitap.ac.in",
    postedBy: "usr_003",
    createdAt: "2026-11-06T18:45:00Z"
  },
  {
    id: "item_105",
    name: "Hydro Flask Insulated Steel Water Bottle",
    category: "Water Bottles & Accessories",
    description: "32oz Cobalt Blue Hydro Flask with wide mouth flex cap. Has several coding stickers including GitHub Octocat and React logo.",
    location: "Indoor Sports Complex - Badminton Court",
    foundDate: "2026-11-03",
    status: "RETURNED",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    contactName: "Harsha Vardhan (Security Admin)",
    contactPhone: "+91 86323 99999",
    contactEmail: "admin.harsha@vitap.ac.in",
    postedBy: "usr_admin",
    createdAt: "2026-11-03T09:20:00Z"
  },
  {
    id: "item_106",
    name: "Titan Octane Chronograph Wristwatch",
    category: "Watches & Wearables",
    description: "Silver stainless steel strap with dark blue dial and tachymeter bezel. Found on bench outside Newton Hall.",
    location: "Newton Hall - Ground Floor Lounge",
    foundDate: "2026-11-05",
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    contactName: "Aarav Sharma",
    contactPhone: "+91 98765 43210",
    contactEmail: "22BCE1042@vitap.ac.in",
    postedBy: "usr_001",
    createdAt: "2026-11-05T14:10:00Z"
  },
  {
    id: "item_107",
    name: "Wildcraft Grey Water-Resistant Laptop Backpack",
    category: "Bags & Backpacks",
    description: "Grey Wildcraft 30L college backpack containing a spiral notebook, a blue pen pouch, and an umbrella in side pocket.",
    location: "Academic Block 2 (AB-2) - Computer Lab 4",
    foundDate: "2026-11-07",
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    contactName: "Sneha Patel",
    contactPhone: "+91 98451 23456",
    contactEmail: "22BCE1189@vitap.ac.in",
    postedBy: "usr_002",
    createdAt: "2026-11-07T09:00:00Z"
  },
  {
    id: "item_108",
    name: "Linear Algebra & Probability Textbook (Gilbert Strang)",
    category: "Books & Study Material",
    description: "Hardcover 5th edition mathematics textbook with highlighted notes in Chapter 4 on Eigenvalues. Left on desk row 3.",
    location: "Central Library - 2nd Floor Reading Hall",
    foundDate: "2026-11-02",
    status: "RETURNED",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    contactName: "Harsha Vardhan (Security Admin)",
    contactPhone: "+91 86323 99999",
    contactEmail: "admin.harsha@vitap.ac.in",
    postedBy: "usr_admin",
    createdAt: "2026-11-02T11:40:00Z"
  }
];
