// eslint-disable no-console

import seedAdmin from './seeds/seedAdmin';
import seedUsers from './seeds/seedUser';
import seedLoans from './seeds/seedLoan';
import seedRepayments from './seeds/seedRepayment';
import db from './db';

const seedTable = async () => {
  try {
    const seedQuery = await db.query(seedAdmin);
    console.log(seedQuery);
  } catch (err) {
    console.log(err.stack);
    return err.stack;
  }
};

export default seedTable;
