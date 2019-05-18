const seedLoans = `
      INSERT INTO loans (
          "useremail",  
          status, 
          repaid, 
          tenor, 
          amount, 
          paymentInstallment, 
          balance, 
          "interest")
        VALUES ('john@yahoo.com', 'approved', 'false', 12, 100000, 17083.33, 100000, 5000),
               ('kenchuks@gmail.com', 'approved', 'true', 12, 100000, 17083.33, 0.00, 5000),
               ('promzy@gmail.com', 'approved', 'true', 12, 50000, 4375.00, 0.00, 2500),
               ('john1@yahoo.com', 'approved', 'false', 6, 120000, 21000, 120000, 6000),
               ('promzy1@gmail.com', 'rejected', 'false', 6, 120000, 21000, 120000, 6000),
               ('kenchuks1@gmail.com', 'approved', 'true', 5, 60000, 12600, 0.00, 3000);`

export default seedLoans;