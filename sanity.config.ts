'use client'

/**
 * Sanity Studio configuration
 * Mounted on `/app/sanity/[[...tool]]/page.tsx`
 */

import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schemaTypes} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/sanity',
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
  },

  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
