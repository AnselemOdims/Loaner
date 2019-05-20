import dotenv from 'dotenv';
import Helpers from '../../utils/helpers';

dotenv.config();

const user = Helpers.userPassword();

const userSeed = `
    INSERT INTO users (
        firstname, 
        lastname, 
        email, 
        password, 
        address,
        isadmin) 
    VALUES ('John', 'Bala', 'john@yahoo.com', '${user}', '3 Olaitan Street, Ojota', false),
           ('Ken', 'Chukwu', 'kenchuks@gmail.com', '${user}', '45 Ikorodu Rd. Lagos', false),
           ('Promise', 'Osuji', 'promzy@gmail.com', '${user}', '10, Ago Palace Way, Lagos', false),
           ('John', 'Bala', 'john1@yahoo.com', '${user}', '3 Olaitan Street, Ojota', false),
           ('Promise', 'Osuji', 'promzy1@gmail.com', '${user}', '10, Ago Palace Way, Lagos', false), 
           ('Ken', 'Chukwu', 'kenchuks1@gmail.com', '${user}', '45 Ikorodu Rd. Lagos', false);`;

export default userSeed;
