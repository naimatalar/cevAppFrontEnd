export const baseModel = {
  isError: false,
  detail: null,
  ex: null,
  data: null,
  redirect: {
    isRedirect: false,
    redirectDetail: "",
    param: ""
  }
}
export const userModel = {
  userName: "",
  sex: null,
  sexualPreference: null,
  birthdate: null,
  photos: [],
  userQuestionAnsverList: [],
  xlatitude: 0,
  ylatitude: 0,
  distance:0
}
export const questionCategoriesList = [{
  categoriName: "",
  imageUrl: "",
  questions: [],
  ansvers: []
}]

export const questionCategories = {
  categoriName: "",
  imageUrl: "",
  questions: [],
  ansvers: []
}
export const userList = [{
  userQuestionAnsverList: [],
  userName: "",
  birthDate: null,
  photos: [],
  id: "",
  distinceKm: ""
}]
export const cardModel = {
  currnetImageUrl: {},
  user: {},
  allImages: [],
  imagesCount: 0,
};
export const getQuestionAnsverModel = [{
  ansverList: [{
    ansver: "",
    ansverId: ""
  }],
  question: "",
  questionId: ""
}];


export const userQuestionAnsverListResponseModel =
{
  questionBankId: "",
  ansverBankId: ""
}
export const hubPageControl =
{
  Chat: false,
  Message: false,
  Home: false
}
export const messageContactList =
{
  contactUserId: "",
  contactUserImageUrl: "",
  contactUserName: "",
  newMessageCount: 0,
  lastMessage: {
    isRead: null,
    message: "",
    IsMyMessage: null
  }
}
export const ansverResultResponseModel =
{
  photos:[{
    url: "",
    order: 0
  }],
  userName:"",
  distince:"",
  ansverList:[ {
      question: "",
      ansver: "",
      isTrue: false
    }],
}
