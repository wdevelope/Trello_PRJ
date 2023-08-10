const CardMemberRepository = require("../repositories/cardMember.repositories");
const cardMemberRepo = new CardMemberRepository();

class CardMemberService {
  // 카드 멤버 생성
  async createCardMember(data) {
    return await cardMemberRepo.createCardMember(data);
  }

  // 모든 카드 멤버 조회
  async getAllCardMembers() {
    return await cardMemberRepo.findAllCardMembers();
  }

  // ID로 카드 멤버 조회
  async getCardMemberById(id) {
    return await cardMemberRepo.findCardMemberById(id);
  }

  // 카드 멤버 삭제
  async deleteCardMember(id) {
    return await cardMemberRepo.deleteCardMember(id);
  }
}

module.exports = CardMemberService;
