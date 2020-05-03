cube(`PkFiles`, {
  sql: `SELECT * FROM public.pk_files`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [filename, id, createdAt, updatedAt, published]
    }
  },
  
  dimensions: {
    json: {
      sql: `json`,
      type: `string`
    },
    
    path: {
      sql: `path`,
      type: `string`
    },
    
    filename: {
      sql: `filename`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },

    published: {
      sql: `json->'attributes'->'published'`,
      type: `boolean`
    },
    
    content: {
      sql: `content`,
      type: `string`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    
    updatedAt: {
      sql: `updated_at`,
      type: `time`
    }
  }
});
