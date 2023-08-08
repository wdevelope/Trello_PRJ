const CardRepository = require("../repositories/cards.repositories");

class CardService {
  constructor() {
    this.cardRepository = new CardRepository();
  }

  // 카드 생성
  async createCard({ title, description, color, position, deadline }) {
    const newCard = await this.cardRepository.createCard({
      title,
      description,
      color,
      position,
      deadline,
    });

    if (!newCard) {
      throw new Error("카드 생성에 실패했습니다.");
    }

    return newCard;
  }

  // 전체 카드 조회
  async getAllCards() {
    const cards = await this.cardRepository.findAllCards();

    if (!cards) {
      throw new Error("카드 전체 조회에 실패했습니다.");
    }

    return cards;
  }

  // 상세 카드 조회
  async getCardById(cardId) {
    const card = await this.cardRepository.findCardById(cardId);

    if (!card) {
      throw new Error("카드를 찾을 수 없습니다.");
    }

    return card;
  }

  // 카드 수정
  async updateCard(cardId, { title, description, color, position, deadline }) {
    const card = await this.cardRepository.updateCard(cardId, {
      title,
      description,
      color,
      position,
      deadline,
    });

    if (!card) {
      throw "카드 수정에 실패했습니다.";
    }

    return card;
  }

  // 카드 삭제
  async deleteCard(cardId) {
    const result = await this.cardRepository.deleteCard(cardId);
    if (!result) {
      throw new Error("카드 삭제에 실패 했습니다.");
    }

    return result;
  }

  // 카드 이동
  async moveCard(cardId, { toColumn }) {
    const card = await this.cardRepository.updateCard(cardId, {
      column: toColumn,
    });

    if (!card) {
      throw new Error("카드를 이동하는데 실패했습니다.");
    }

    return card;
  }
}

module.exports = CardService;
