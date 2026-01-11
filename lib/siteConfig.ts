export const siteConfig = {
  brandName: "EduGenius Hub",
  tagline: "Premium Tools. Managed by Professionals.",

  // Contact
  phoneDisplay: "+91 87662 53356",
  phoneE164: "918766253356",

  // Social
  whatsappCommunityLink: "https://chat.whatsapp.com/FtMZUM8Ql41IkUXSmw3pBU",
  whatsappChatLink: "", // optional: if you want to use a custom WhatsApp chat link
  instagramLink: "https://www.instagram.com/turnitin__plagiarism",
} as const;

export type SiteConfig = typeof siteConfig;
