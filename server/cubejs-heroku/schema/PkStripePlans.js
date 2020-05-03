cube(`PkStripePlans`, {
  sql: `SELECT * FROM public.pk_stripe_plans`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, stripeid, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    json: {
      sql: `json`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    stripeid: {
      sql: `${CUBE}."stripeId"`,
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
