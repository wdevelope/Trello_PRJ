const { Card } = require("../dataBase/models");
const { Op } = require("sequelize");

class CardRepository {
  // 카드 생성 레포지
  async createCard(data) {
    try {
      return await Card.create(data);
    } catch (error) {
      throw new Error("카드 생성 중 오류가 발생했습니다.");
    }
  }

  // 카드 전체 조회 레포지
  async findAllCards() {
    try {
      return await Card.findAll();
    } catch (error) {
      throw new Error("카드 조회 중 오류가 발생했습니다.");
    }
  }

  // 특정 카드 찾기 레포지
  async findCardById(cardId) {
    try {
      return await Card.findByPk(cardId);
    } catch (error) {
      throw new Error("카드 조회 중 오류가 발생했습니다.");
    }
  }

  // 카드 수정 레포지
  async updateCard(cardId, data) {
    try {
      const result = await Card.update(data, {
        where: { id: cardId },
      });
      if (result[0] === 0) {
        // Check if any rows were affected
        return null;
      }
      return data; // Assuming data is the updated card info
    } catch (error) {
      throw new Error("카드 수정 중 오류가 발생했습니다.");
    }
  }

  //카드 삭제 레포지
  async deleteCard(cardId) {
    try {
      const rowsDeleted = await Card.destroy({
        where: { id: cardId },
      });
      if (rowsDeleted === 0) {
        return null;
      }
      return true;
    } catch (error) {
      throw new Error("카드 삭제 중 오류가 발생했습니다.");
    }
  }
  async PositionsInColumn(columnId, startPosition, increment) {
    const cards = await Card.findAll({
      where: {
        columnId: columnId,
        position: {
          [Op.gte]: startPosition,
        },
      },
    });

    for (let card of cards) {
      card.position += increment;
      await card.save();
    }
  }

  async PositionsBetween(columnId, start, end, direction) {
    const cards = await Card.findAll({
      where: {
        columnId: columnId,
        position: {
          [Op.between]: [start, end],
        },
      },
    });

    for (let card of cards) {
      card.position += direction;
      await card.save();
    }
  }
}

module.exports = CardRepository;
