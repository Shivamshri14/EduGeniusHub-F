import { createClient } from "@sanity/client";
import { TOOLS, COMBO_TOOLS } from "../lib/tools-data.js";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function migrate() {
  console.log("🚀 Migrating tools...");

  for (const tool of TOOLS) {
    await client.createOrReplace({
      _id: `tool-${tool.id}`,
      _type: "tool",
      title: tool.name,
      slug: { current: tool.id },
      tagline: tool.tagline,
      description: tool.description,
      officialUrl: tool.officialUrl,
      imageUrl: tool.image,
      marketPrice: tool.marketPrice,
      price: tool.ourPrice,
      category: tool.category,
    });
    console.log(`✔ Tool: ${tool.name}`);
  }

  console.log("🚀 Migrating combo tools...");

  for (const combo of COMBO_TOOLS) {
    await client.createOrReplace({
      _id: `combo-${combo.id}`,
      _type: "combo",
      title: combo.name,
      slug: { current: combo.id },
      tagline: combo.tagline,
      description: combo.description,
      imageUrl: combo.image,
      marketPrice: combo.marketPrice,
      price: combo.ourPrice,
    });
    console.log(`✔ Combo: ${combo.name}`);
  }

  console.log("🎉 MIGRATION COMPLETE");
}

migrate().catch(console.error);
