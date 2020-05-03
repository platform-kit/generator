cube(`PkStripeCustomers`, {
  sql: `SELECT * FROM public.pk_stripe_customers`,
  
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
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    json: {
      sql: `json`,
      type: `string`
    },
    
    email: {
      sql: `email`,
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
