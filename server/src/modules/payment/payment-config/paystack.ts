// const paystack = (request) => {
//     const MySecretKey = 'Bearer sk_test_xxxx';
//     // sk_test_xxxx to be replaced by your own secret key
//    const initializePayment = (form, mycallback) =>
//    }
//    const verifyPayment = (ref,mycallback) => {
//    }
//    return {initializePayment, verifyPayment};

// export class Paystack {
//   secretKey = 'Bearer sk_test_405beb0c32be8d6df6c91fb3d333785d9b7424a4';

//   public initializePayment(from?: any, mCallback?: any) {
//     const options = {
//       url: 'https://api.paystack.co/transaction/initialize',
//       headers: {
//         authorization: this.secretKey,
//         'content-type': 'application/json',
//         'cache-control': 'no-cache',
//       },
//       form,
//     };

//     const callback = (error: any, response: any, body: any) => {
//       return mCallback(error, body);
//     };

//     request.post(options, callback);
//   }

//   public verifyPayment(ref?: any, mycallback?: any) {}

//   public returnMethods() {
//     const init = this.initializePayment();
//     const verify = this.verifyPayment();

//     return { init, verify };
//   }
// }
