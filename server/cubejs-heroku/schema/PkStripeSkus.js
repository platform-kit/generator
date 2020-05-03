cube(`PkStripeSkus`, {
  sql: `SELECT * FROM public.pk_stripe_skus`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [stripeid, id, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    stripeid: {
      sql: `${CUBE}."stripeId"`,
      type: `string`
    },
    
    json: {
      sql: `json`,
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
    }
  }
});
