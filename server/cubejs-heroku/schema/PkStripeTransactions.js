cube(`PkStripeTransactions`, {
  sql: `SELECT * FROM public.pk_stripe_transactions`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [stripeid, id, createdAt, updatedAt, transactionDate]
    },
    
    

    sum: {
      sql: `amount * .01`,
      type: `sum`
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

    amount: {
      sql: `amount * .01`,
      type: `number`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    
    updatedAt: {
      sql: `updated_at`,
      type: `time`
    },
    
    transactionDate: {
      sql: `${CUBE}."transactionDate"`,
      type: `time`
    }
  }
});
