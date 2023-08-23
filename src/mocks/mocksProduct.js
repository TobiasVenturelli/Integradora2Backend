import { fakerES as faker } from "@faker-js/faker";

export const generateProduct = () => ({
     id: faker.database.mongodbObjectId(),
     name: faker.commerce.productName(),
     description: faker.lorem.sentence(),
     price: faker.commerce.price(),
     stock: faker.random.numeric(1),
     department: faker.commerce.department(),
   });

   export const generateMockProducts = () => {
     const mockProducts = [];
     for (let i = 0; i < 100; i++) {
       mockProducts.push(generateProduct());
     }
     return mockProducts;
   };
   
  
