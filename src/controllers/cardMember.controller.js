const CardMemberService = require("../services/cardMember.service");
const cardMemberService = new CardMemberService();

class CardMemberController {
  // 카드 멤버 생성
  async createCardMember(req, res) {
    try {
      const data = req.body; // 입력 데이터는 body에서 추출
      await cardMemberService.createCardMember(data);
      res.status(201).json({ message: "카드 멤버 생성에 성공했습니다." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // 모든 카드 멤버 조회
  async getAllCardMembers(req, res) {
    try {
      const cardMembers = await cardMemberService.getAllCardMembers();
      res.status(200).json(cardMembers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // ID로 카드 멤버 조회
  async getCardMemberById(req, res) {
    try {
      const id = req.params.id;
      const cardMember = await cardMemberService.getCardMemberById(id);
      if (!cardMember) {
        return res
          .status(404)
          .json({ message: "카드 멤버를 찾을 수 없습니다." });
      }
      res.status(200).json(cardMember);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // 카드 멤버 삭제
  async deleteCardMember(req, res) {
    try {
      const id = req.params.id;
      const deleted = await cardMemberService.deleteCardMember(id);
      if (!deleted) {
        return res
          .status(404)
          .json({ message: "삭제할 카드 멤버를 찾을 수 없습니다." });
      }
      res.status(200).json({ message: "카드 멤버 삭제에 성공했습니다." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CardMemberController();
