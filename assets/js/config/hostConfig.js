export const hostConfig = {
  host            : 'http://localhost:1337',
  prefix          : null,
  pluralizeModels : true,
  socket          : true,
  localStorageName: 'JWT',
  headerContent   : 'Bearer {{JWT}}',
  headerFormat    : 'authorization',
  apiSpecs : {

  },
  recaptchaSiteKey : 'thepublickey',
  cloudinaryUploadPreset : 'cloudinaryKey',
  cloudinaryUploadUrl : 'https://api.cloudinary.com/v1_1/dcopekq6o/upload'
}
