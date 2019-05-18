import dotenv from 'dotenv';
import Helpers from '../../utils/helpers';

dotenv.config();

const adminPassword = process.env.ADMIN_PASSWORD;
const admin = async () => {
  const hashedAdminPassword = await Helpers.hashPassword(adminPassword);
  return hashedAdminPassword;
} 

const adminSeed = `
    INSERT INTO users (
        firstname, 
        lastname, 
        email, 
        password, 
        address, 
        "isadmin") 
    VALUES ('Anselem', 'Odims', 'anselemodims@gmail.com', '${admin()}', '3 Olaitan Street, Ojota', true);`

export default adminSeed;

