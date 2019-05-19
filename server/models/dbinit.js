import db from './db';
import createQuery from './createTables';
import dropQuery from './dropTables';
import seeds from './seeds';

const queryTable = async () => {
  try {
    await db.query(`${dropQuery}${createQuery}`);
    console.log('>>>>>>Recreating tables<<<<<<');
    await seeds();
    console.log('>>>>>>>Seeding Data<<<<<<<');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.stack);
    return err.stack;
  }
};

queryTable();
