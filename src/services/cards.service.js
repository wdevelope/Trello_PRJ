const CardRepository = require("../repositories/cards.repositories");

class CardService {
  constructor() {
    this.cardRepository = new CardRepository();
  }

  // 카드 생성
  async createCard({ title, description, color, position, deadline }) {
    if (deadline) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); //  현재 날짜의 시작 시간
      const inputDate = new Date(deadline);

      if (isNaN(inputDate.getTime())) {
        throw new Error("제공된 마감 기한이 올바른 날짜 형식이 아닙니다.");
      }

      if (inputDate < currentDate) {
        throw new Error("마감 기한은 현재 날짜보다 미래여야 합니다.");
      }
    }
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
  async moveCard(cardId, { targetColumnId, position }) {
    const card = await this.cardRepository.findCardById(cardId);

    if (!card) {
      throw new Error("카드를 찾을 수 없습니다.");
    }

    if (card.columnId != targetColumnId) {
      await this.cardRepository.PositionsInColumn(
        card.columnId,
        card.position,
        -1,
      );
      await this.cardRepository.PositionsInColumn(targetColumnId, position, 1);
    } else {
      const direction = card.position < position ? -1 : 1;
      await this.cardRepository.PositionsBetween(
        card.columnId,
        card.position,
        position,
        direction,
      );
    }

    const updateCard = await this.cardRepository.updateCard(cardId, {
      columnId: targetColumId,
      position,
    });

    if (!updateCard) {
      throw new Error("카드를 이동하는데 실패했습니다.");
    }

    return updateCard;
  }
}

module.exports = CardService;
