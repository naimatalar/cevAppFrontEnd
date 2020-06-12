const baseUrl='http://10.0.2.2:45455';

// const baseUrl='http://bukalemun.kale.com.tr';
const Url={
USERIMAGES:baseUrl+'/StaticF/Users/Images',
CATEGORYIMAGES:baseUrl+'/StaticF/Assets/CategoryImage',

GET_TOKEN:baseUrl+'/api/auth/getToken',
USER_REGISTER:baseUrl+'/api/Auth/userRegister',
USER_LOGIN:baseUrl+'/api/Auth/login',
USER_EDIT:baseUrl+'/api/User/Edit',
GET_CURRENT_USER:baseUrl+'/api/User/getCurrentUser',
POST_USER_IMAGE:baseUrl+'/api/User/imageUpload',
POST_USER_IMAGE_base64:baseUrl+'/api/User/imageUploadBase64',
GET_CURRENT_PROFILE:baseUrl+'/api/User/getCurrentProfile',
DELETE_IMAGE:baseUrl+'/api/User/deleteImage',
IMAGE_ORDER:baseUrl+'/api/User/imageOrder',
GET_CATEGORİES:baseUrl+'/api/QuestionCreator/getCategories',
QUESTION_CREATE:baseUrl+'/api/QuestionCreator/add',
LIST_USER:baseUrl+'/api/PlayPage/listUser',
SWIPE_RECORD:baseUrl+'/api/PlayPage/swipeUser',
GET_UNREADMESSAGE_COUNT:baseUrl+'/api/PlayPage/unreadMEssageCount',

GET_QUESTION_ANSVER:baseUrl+'/api/QuestionCreator/getGiveAnsverQuestions',
GIVE_ANSVER:baseUrl+'/api/QuestionCreator/giveAnsver',
GET_MESSAGE_USER_LIST:baseUrl+'/api/Messages/getMessageUserList',
GET_ALL_MESSAGE:baseUrl+'/api/Messages/getAllMessages',
READ_MESSAGE:baseUrl+'/api/Messages/readMessage',
GET_QUESTIONRESULT:baseUrl+'/api/AnsverResult/getQuestionResult',
GET_QUESTIONRESULT_DETAIL:baseUrl+'/api/AnsverResult/getQuestionResultDetail',

MESSAGE_HUB:baseUrl+'/pagehub',


}

export default Url