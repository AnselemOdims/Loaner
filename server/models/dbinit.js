import db from './db';
import createQuery from './createTables';
import dropQuery from './dropTables';
import seeds from './seeds';

// console.log(db)
// console.log(dropQuery, createQuery)
const queryTable = async () => {
  try {
    const queries = await db.query(`${dropQuery}${createQuery}`);
    console.log('>>>>>>Recreating tables<<<<<<')
    const createSeed = await seeds();
    console.log('>>>>>>>Seeding Data<<<<<<<', createSeed)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.stack);
    return err.stack;
  }
};

queryTable();
