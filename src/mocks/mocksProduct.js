import { fakerES as faker } from "@faker-js/faker";

export const generateProduct = () => ({
     _id: faker.database.collation(),
     name: faker.commerce.productName(),
     description: faker.lorem.sentence(),
     price: faker.commerce.price(),
     category: faker.commerce.department(),
   });

   export const generateMockProducts = () => {
     const mockProducts = [];
     for (let i = 0; i < 100; i++) {
       mockProducts.push(generateProduct());
     }
     return mockProducts;
   };
   
  
