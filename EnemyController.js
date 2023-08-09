// EnemyController.js
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController {
  enemyMap = [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  enemyRows = [];

  currentDirection = MovingDirection.right;
  xVelocity = 0;
  yVelocity = 0;
  defaultXVelocity = 50;
  defaultYVelocity = 15;
  moveDownTimerDefault = 100;
  moveDownTimer = this.moveDownTimerDefault;
  fireBulletTimerDefault = 100;
  fireBulletTimer = this.fireBulletTimerDefault;

  constructor(canvas, enemyBulletController, playerBulletController) {
    this.canvas = canvas;
    this.enemyBulletController = enemyBulletController;
    this.playerBulletController = playerBulletController;

    this.enemyDeathSound = new Audio("sounds/invaderkilled.wav");
    this.enemyDeathSound.volume = 0.01;

    this.createEnemies();
  }

  draw(ctx) {
    this.decrementMoveDownTimer();
    this.updateVelocityandDirection();
    this.collisionDetection();
    this.drawEnemies(ctx);
    this.resetMoveDownTimer();
    this.fireBullet();
  }

  collisionDetection() {
    this.enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (this.playerBulletController.collideWith(enemy)) {
          this.enemyDeathSound.currentTime = 0;
          this.enemyDeathSound.play();
          enemyRow.splice(enemyIndex, 1);
        }
      });
    });
    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }

  fireBullet() {
    this.fireBulletTimer--;
    if (this.fireBulletTimer <= 0) {
      this.fireBulletTimer = Math.floor(Math.random() * 100) + 100;
      console.log(this.fireBulletTimer);

      const allEnemies = this.enemyRows.flat();
      const enemy3s = allEnemies.filter((enemy) => enemy.type === 3);
      if (enemy3s.length > 0) {
        const enemyIndex = Math.floor(Math.random() * enemy3s.length);
        const enemy = enemy3s[enemyIndex];
        this.enemyBulletController.shoot(
          enemy.x + enemy.width / 2,
          enemy.y,
          -3
        );
      }
    }
  }

  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  decrementMoveDownTimer() {
    if (
      this.currentDirection == MovingDirection.downLeft ||
      this.currentDirection == MovingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }

  updateVelocityandDirection() {
    for (const enemyRow of this.enemyRows) {
      if (this.currentDirection == MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width - 11) {
          this.currentDirection = MovingDirection.downLeft;
          break;
        }
      } else if (this.currentDirection == MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection == MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if (leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      } else if (this.currentDirection == MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

  moveDown(newDirection) {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;
    if (this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }

  lastUpdateTime = 0;
  movementDelay = 500; // 500 milliseconds
  stepCount = 0;

  drawEnemies(ctx) {
    if (Date.now() - this.lastUpdateTime < this.movementDelay) {
      this.enemyRows.flat().forEach((enemy) => {
        enemy.draw(ctx);
      });
      return;
    }
    this.stepCount++;

    if (this.stepCount % 10 == 0 && this.movementDelay > 250) {
      this.stepCount = 0;
      this.movementDelay -= 25;
    }
    this.lastUpdateTime = Date.now();

    this.enemyRows.flat().forEach((enemy) => {
      enemy.move(this.xVelocity, this.yVelocity);
      enemy.draw(ctx);
    });
  }

  createEnemies() {
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      row.forEach((enemyNumber, enemyIndex) => {
        if (enemyNumber > 0) {
          this.enemyRows[rowIndex].push(
            new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)
          );
        }
      });
    });
  }

  collideWith(sprite) {
    return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }
}
