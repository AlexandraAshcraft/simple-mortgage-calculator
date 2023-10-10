// class Property {
//   type: string;
//   price: number;
//   constructor(type: string, price: number) {
//     this.type = type;
//     this.price = price;
//   }
// }

// const apiForm = document.querySelector('.listing-search') as HTMLFormElement;

// apiForm.addEventListener('submit', () => {
//     const zipCode = apiForm.children;
//     console.log(zipCode);
// });

// const apiButton = document.querySelector('.search-button') as HTMLButtonElement;
// const fetchFromAPI = async (zipCode: number) => {
//   const controller = new AbortController();
//   try {
//     const response = await fetch(
//       'https://realty-mole-property-api.p.rapidapi.com/saleListings',
//       {
//         method: 'GET',
//         headers: {
//           'X-RapidAPI-Key':
//             'b8a7f4d740msh6f868ffc4f45dfdp1e6998jsn60afddc504b4',
//             'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
//         },
//       },
//     );
//   } catch (error) {}
// };

// //apiButton.addEventListener('click', fetchFromAPI);
