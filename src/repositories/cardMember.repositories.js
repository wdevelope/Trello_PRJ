const { cardMember } = require("../dataBase/models/cardMember");

class CardMemberRepository {
  // 카드 멤버 생성 레포지
  async createCardMember(data) {
    try {
      return await cardMember.create(data);
    } catch (error) {
      throw new Error("카드 멤버 생성 중 오류가 발생했습니다.");
    }
  }

  // 카드 멤버 전체 조회 레포지
  async findAllCardMembers() {
    try {
      return await cardMember.findAll();
    } catch (error) {
      throw new Error("카드 멤버 조회 중 오류가 발생했습니다.");
    }
  }

  // 특정 카드 멤버 찾기 레포지
  async findCardMemberById(cardMemberId) {
    try {
      return await cardMember.findByPk(cardMemberId);
    } catch (error) {
      throw new Error("카드 멤버 조회 중 오류가 발생했습니다.");
    }
  }

  // 카드 멤버 삭제 레포지
  async deleteCardMember(cardMemberId) {
    try {
      const rowsDeleted = await cardMember.destroy({
        where: { id: cardMemberId },
      });
      if (rowsDeleted === 0) {
        return null;
      }
      return true;
    } catch (error) {
      throw new Error("카드 멤버 삭제 중 오류가 발생했습니다.");
    }
  }
}

module.exports = CardMemberRepository;
