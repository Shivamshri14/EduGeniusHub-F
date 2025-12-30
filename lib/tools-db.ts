import { supabase } from './supabase-client';
import { Tool, ComboTool } from './types';

export async function getAllTools(): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tools:', error);
    return [];
  }

  return data.map(tool => ({
    id: tool.id,
    name: tool.name,
    tagline: tool.tagline,
    description: tool.description,
    officialUrl: tool.official_url,
    image: tool.image,
    marketPrice: tool.market_price,
    ourPrice: tool.our_price,
    category: tool.category as 'report' | 'account' | 'ott',
  }));
}

export async function getToolById(id: string): Promise<Tool | null> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) {
    console.error('Error fetching tool:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    tagline: data.tagline,
    description: data.description,
    officialUrl: data.official_url,
    image: data.image,
    marketPrice: data.market_price,
    ourPrice: data.our_price,
    category: data.category as 'report' | 'account' | 'ott',
  };
}

export async function addTool(tool: Omit<Tool, 'id'>): Promise<{ success: boolean; error?: string }> {
  const id = tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

  const { error } = await supabase
    .from('tools')
    .insert({
      id,
      name: tool.name,
      tagline: tool.tagline,
      description: tool.description,
      official_url: tool.officialUrl,
      image: tool.image,
      market_price: tool.marketPrice,
      our_price: tool.ourPrice,
      category: tool.category,
    });

  if (error) {
    console.error('Error adding tool:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateTool(id: string, tool: Partial<Tool>): Promise<{ success: boolean; error?: string }> {
  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (tool.name !== undefined) updateData.name = tool.name;
  if (tool.tagline !== undefined) updateData.tagline = tool.tagline;
  if (tool.description !== undefined) updateData.description = tool.description;
  if (tool.officialUrl !== undefined) updateData.official_url = tool.officialUrl;
  if (tool.image !== undefined) updateData.image = tool.image;
  if (tool.marketPrice !== undefined) updateData.market_price = tool.marketPrice;
  if (tool.ourPrice !== undefined) updateData.our_price = tool.ourPrice;
  if (tool.category !== undefined) updateData.category = tool.category;

  const { error } = await supabase
    .from('tools')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating tool:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteTool(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('tools')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting tool:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getAllCombos(): Promise<ComboTool[]> {
  const { data, error } = await supabase
    .from('combos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching combos:', error);
    return [];
  }

  return data.map(combo => ({
    id: combo.id,
    name: combo.name,
    tagline: combo.tagline,
    description: combo.description,
    tools: combo.tools,
    image: combo.image,
    marketPrice: combo.market_price,
    ourPrice: combo.our_price,
  }));
}

export async function addCombo(combo: Omit<ComboTool, 'id'>): Promise<{ success: boolean; error?: string }> {
  const id = combo.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

  const { error } = await supabase
    .from('combos')
    .insert({
      id,
      name: combo.name,
      tagline: combo.tagline,
      description: combo.description,
      tools: combo.tools,
      image: combo.image,
      market_price: combo.marketPrice,
      our_price: combo.ourPrice,
    });

  if (error) {
    console.error('Error adding combo:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateCombo(id: string, combo: Partial<ComboTool>): Promise<{ success: boolean; error?: string }> {
  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (combo.name !== undefined) updateData.name = combo.name;
  if (combo.tagline !== undefined) updateData.tagline = combo.tagline;
  if (combo.description !== undefined) updateData.description = combo.description;
  if (combo.tools !== undefined) updateData.tools = combo.tools;
  if (combo.image !== undefined) updateData.image = combo.image;
  if (combo.marketPrice !== undefined) updateData.market_price = combo.marketPrice;
  if (combo.ourPrice !== undefined) updateData.our_price = combo.ourPrice;

  const { error } = await supabase
    .from('combos')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating combo:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteCombo(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('combos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting combo:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
