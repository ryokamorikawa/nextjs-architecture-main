const testEnv = (): void => {
  process.env.NEXT_PUBLIC_API_KEY = 'AIzaSyBJSIFyuqKWF06rjGYwgERXxaaz_fxI2_E';
  process.env.NEXT_PUBLIC_AUTH_DOMAIN = 'kaigofika-poc01.firebaseapp.com';
  process.env.NEXT_PUBLIC_PROJECT_ID = 'kaigofika-poc01';
  process.env.NEXT_PUBLIC_STORAGE_BUCKET = 'kaigofika-poc01.appspot.com';
  process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID = '901508578456';
  process.env.NEXT_PUBLIC_APP_ID = '1:901508578456:web:aa06b827829b91b373e4ed';
  process.env.NEXT_PUBLIC_MEASUREMENT_ID = 'G-SRW62KY2PZ';
  return;
};

export default testEnv;
