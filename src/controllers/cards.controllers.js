const CardService = require("../services/cards.service");
const cardservice = new CardService();

class CardController {
  // 카드 생성
  async createCard(req, res) {
    try {
      await cardservice.createCard(req.body);
      res.status(200).json({ message: "카드 생성에 성공했습니다." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //카드 전체 조회
  async getAllCards(req, res) {
    try {
      const cards = await cardservice.getAllCards();
      res.status(200).json(cards);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //카드 조회
  async getCardById(req, res) {
    try {
      const card = await cardservice.getCardById(req.params.id);
      res.status(200).json(card);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //카드 수정
  async updateCard(req, res) {
    try {
      await cardservice.updateCard(req.params.id, req.body);
      res.status(200).json({ message: "카드 수정에 성공했습니다." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //카드 삭제
  async deleteCard(req, res) {
    try {
      await cardservice.deleteCard(req.params.id);
      res.status(200).json({ message: "카드 삭제에 성공했습니다." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //카드 이동
  async moveCard(req, res) {
    try {
      await cardservice.moveCard(req.params.id, req.body);
      res.status(200).json({ message: "카드 이동에 성공했습니다." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CardController();
