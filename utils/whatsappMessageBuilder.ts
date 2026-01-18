import { SITE } from "@/lib/catalog";

export function buildWhatsAppLink(message?: string, phone?: string): string {
  const phoneNumber = phone || SITE.phoneE164;
  const encodedMessage = message
    ? encodeURIComponent(message)
    : encodeURIComponent("Hi EduGenius, I have a query.");
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function buildToolMessage(
  toolName: string,
  price?: number
): string {
  let message = `Hi EduGenius, I want ${toolName}`;
  if (price && price > 0) {
    message += ` (Price: ₹${price})`;
  }
  message += ". Please share details.";
  return message;
}

export function buildServiceMessage(serviceName: string): string {
  return `Hi EduGenius, I want to inquire about ${serviceName}. Please share details.`;
}

export function buildOrderMessage(
  toolName: string,
  price?: number
): string {
  let message = `Hi EduGenius, I want to order ${toolName}`;
  if (price && price > 0) {
    message += ` (Price: ₹${price})`;
  }
  message += ". Please share details.";
  return message;
}

export function buildResellerMessage(): string {
  return "Hi EduGenius, I'm interested in getting a similar website for my reselling business. Please share details.";
}
