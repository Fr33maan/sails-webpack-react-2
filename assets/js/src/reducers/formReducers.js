import { combineForms, createForms, modelReducer } from 'react-redux-form';



// --------------
// ---- AUTH ----
// --------------

const editProfile = {
  birthDate       : '',
  gender          : '',
  city            : '',
  region          : '',
  description     : '',
  password        : '',
  confirmPassword : '',
  profilePicture  : '',
  acceptPrivate   : ''
}


const signUp = {
  username        : 'jeronimo',
  email           : 'jero@nimo.com',
  password        : '123123',
  confirmPassword : '123123',
  recaptchaKey    : null
}

const signIn = {
  email           : 'jero@nimo.com',
  password        : '123123',
}


// ---------------
// --- CHANNEL ---
// ---------------


export default createForms({
  editProfile,
  signUp,
  signIn,
})
