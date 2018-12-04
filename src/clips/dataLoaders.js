const DataLoader = require('dataloader');

const clipLoader = new DataLoader(ids => {
  
  return myBatchGetUsers(keys);
});
