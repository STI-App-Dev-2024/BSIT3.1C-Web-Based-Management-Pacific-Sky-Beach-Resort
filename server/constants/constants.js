const COMPANY_NAME = `Pacific Sky Beach Resort`
const COMPANY_LOGO = `https://res.cloudinary.com/dcloxx8i4/image/upload/v1731835478/user_avatars/tf22yabsjgvomxjyfylt.jpg`

const LOCAL_HOST = 'http://localhost:3000'
const PROD_HOST = 'https://pacificskybeachresort.com/'

const HOST = process.env.NODE_ENV === `development` ? LOCAL_HOST : PROD_HOST

export {
  COMPANY_NAME,
  COMPANY_LOGO,
  HOST
}