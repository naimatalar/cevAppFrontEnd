export const questionCreatorRequestModel =
{
    refId:null,
    QuestionBankId: "",
    AnsverBankId: "",
    Question: "",
    Ansver: ""
}
export const giveAnsverRequestModel = {
    ansverFromUserId: "",
    userQuestionAnsverListResponseModel: [
      {
        questionBankId: "",
        ansverBankId: ""
      }
    ]
  }