import dotenv from 'dotenv';
import Helpers from '../../utils/helpers';

dotenv.config();

const userPassword = process.env.USER_PASSWORD;

const user = (async () => {
  const hashedUserPassword = await Helpers.hashPassword(userPassword);
  return hashedUserPassword;
})();

const userSeed = `
    INSERT INTO users (
        firstname, 
        lastname, 
        email, 
        password, 
        address,
        phonenumber, 
        "isadmin") 
    VALUES ('John', 'Bala', 'john@yahoo.com', '${user}', '3 Olaitan Street, Ojota', 08254678943, false),
           ('Ken', 'Chukwu', 'kenchuks@gmail.com', '${user}', '45 Ikorodu Rd. Lagos', 08225378943,  false),
           ('Promise', 'Osuji', 'promzy@gmail.com', '${user}', '10, Ago Palace Way, Lagos', 08967281027,false),
           ('John', 'Bala', 'john1@yahoo.com', '${user}', '3 Olaitan Street, Ojota', 08254678943, false),
           ('Promise', 'Osuji', 'promzy1@gmail.com', '${user}', '10, Ago Palace Way, Lagos', 08967281027,false), 
           ('Ken', 'Chukwu', 'kenchuks1@gmail.com', '${user}', '45 Ikorodu Rd. Lagos', 08225378943,  false);`;

export default userSeed;
