import { createClient } from '@sanity/client';
import { TOOLS, COMBO_TOOLS } from './tools-data';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const isSanityConfigured = projectId !== 'placeholder' && projectId !== 'your_project_id_here' && projectId !== '';

export const sanityClient = isSanityConfigured ? createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
}) : null;


export async function getTools() {
  if (!sanityClient) {
    console.warn('Sanity is not configured. Using local fallback data.');
    return TOOLS;
  }
  return sanityClient.fetch(`
    *[_type == "tool" && active == true] | order(_createdAt desc) {
      _id,
      "id": slug.current,
      name,
      tagline,
      description,
      officialUrl,
      "image": imageUrl,
      marketPrice,
      ourPrice,
      category,
      active
    }
  `);
}

export async function getToolById(id: string) {
  if (!sanityClient) {
    console.warn('Sanity is not configured. Using local fallback data.');
    return TOOLS.find(tool => tool.id === id) || null;
  }
  return sanityClient.fetch(`
    *[_type == "tool" && slug.current == $id][0] {
      _id,
      "id": slug.current,
      name,
      tagline,
      description,
      officialUrl,
      "image": imageUrl,
      marketPrice,
      ourPrice,
      category,
      active
    }
  `, { id });
}

export async function getCombos() {
  if (!sanityClient) {
    console.warn('Sanity is not configured. Using local fallback data.');
    return COMBO_TOOLS;
  }
  return sanityClient.fetch(`
    *[_type == "combo" && active == true] | order(_createdAt desc) {
      _id,
      "id": slug.current,
      name,
      tagline,
      description,
      tools,
      "image": imageUrl,
      marketPrice,
      ourPrice,
      active
    }
  `);
}

export async function getComboById(id: string) {
  if (!sanityClient) {
    console.warn('Sanity is not configured. Using local fallback data.');
    return COMBO_TOOLS.find(combo => combo.id === id) || null;
  }
  return sanityClient.fetch(`
    *[_type == "combo" && slug.current == $id][0] {
      _id,
      "id": slug.current,
      name,
      tagline,
      description,
      tools,
      "image": imageUrl,
      marketPrice,
      ourPrice,
      active
    }
  `, { id });
}

export async function createTool(tool: any) {
  if (!sanityClient) throw new Error('Sanity is not configured');
  return sanityClient.create({
    _type: 'tool',
    ...tool,
  });
}

export async function updateTool(id: string, updates: any) {
  if (!sanityClient) throw new Error('Sanity is not configured');
  return sanityClient.patch(id).set(updates).commit();
}

export async function deleteTool(id: string) {
  if (!sanityClient) throw new Error('Sanity is not configured');
  return sanityClient.delete(id);
}

export async function createCombo(combo: any) {
  if (!sanityClient) throw new Error('Sanity is not configured');
  return sanityClient.create({
    _type: 'combo',
    ...combo,
  });
}

export async function updateCombo(id: string, updates: any) {
  if (!sanityClient) throw new Error('Sanity is not configured');
  return sanityClient.patch(id).set(updates).commit();
}

export async function deleteCombo(id: string) {
  if (!sanityClient) throw new Error('Sanity is not configured');
  return sanityClient.delete(id);
}
