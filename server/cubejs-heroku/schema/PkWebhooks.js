cube(`PkWebhooks`, {
  sql: `SELECT * FROM public.pk_webhooks`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    headers: {
      sql: `headers`,
      type: `string`
    },
    
    body: {
      sql: `body`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    
    updatedAt: {
      sql: `updated_at`,
      type: `time`
    },
    
    processedAt: {
      sql: `processed_at`,
      type: `time`
    }
  }
});
