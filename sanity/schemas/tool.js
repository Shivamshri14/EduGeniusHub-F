export default {
  name: 'tool',
  title: 'Tool',
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
      name: 'officialUrl',
      title: 'Official URL',
      type: 'url'
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Report', value: 'report' },
          { title: 'Account', value: 'account' },
          { title: 'OTT', value: 'ott' }
        ],
        layout: 'radio'
      },
      validation: (Rule) => Rule.required()
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
