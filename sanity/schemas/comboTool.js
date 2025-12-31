export default {
  name: 'comboTool',
  title: 'Combo Tool',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'tools',
      title: 'Included Tools',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tool' }]
        }
      ]
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'marketPrice',
      title: 'Market Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0)
    },
    {
      name: 'ourPrice',
      title: 'Our Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0)
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'image'
    }
  }
}
