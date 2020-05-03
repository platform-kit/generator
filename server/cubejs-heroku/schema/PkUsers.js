cube(`PkUsers`, {
  sql: `SELECT * FROM public.pk_users`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    email: {
      sql: `email`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    verified: {
      sql: `verified`,
      type: `string`
    },
    
    permissions: {
      sql: `permissions`,
      type: `string`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    
    updatedAt: {
      sql: `updated_at`,
      type: `time`
    },
    
    verifiedAt: {
      sql: `verified_at`,
      type: `time`
    }
  }
});
