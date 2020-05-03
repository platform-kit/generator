console.log(1234567);
console.log('\n\n\n\n\n\n\n');

var generate = function() {
  
};


cube(`PkEvents`, {
  sql: `SELECT * FROM public.pk_events`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt, updatedAt]
    }
  },
  
  segments: {
    guests: {
      sql: `${CUBE}.token IS NULL`
    },
    users: {
      sql: `${CUBE}.token IS NOT NULL`
    }
  },
  
  dimensions: {
    token: {
      sql: `token`,
      type: `string`
    },
    
    event: {
      sql: `event`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    data: {
      sql: `data`,
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

    contentItem: {
      sql: `data->'contentItem'`,
      type: `string`
    },

    topics: {
      sql: `data->'topics'`,
      type: `string`
    },

  
    signed: {      
      type: `string`,
      title: `Signed`,
      case: {
        when: [
          //{ sql: `token IS NULL`, label: `Guests` },                    
          {sql: `${CUBE}.token->'sub'::text IS NULL`, label: `Guests`},          
        ],
        else: { label: `Users` }
      }
    },
  }
});