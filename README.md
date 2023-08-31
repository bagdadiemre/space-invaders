# Space Invaders Game

Welcome to the Space Invaders game project! This is a classic arcade-style game implemented using HTML, CSS, and JavaScript. The objective of this project is to create an interactive and enjoyable gaming experience following the guidelines provided.

## Getting Started

To play the game, you can access it through a web browser using the hosted link. 

- https://bagdadiemre.github.io/space-invaders/

Simply open the provided link in a web browser to start playing the game.

## How to Play

1. Upon accessing the game, you'll be greeted with a home screen. Click the "Start Game" button to begin playing.
2. Use the following controls to play the game:
   - On desktop browsers: Use the keyboard's left and right arrow keys to move the player, and the **"X"** to fire bullets.
3. Your goal is to shoot down the invading aliens before they reach the bottom of the screen or shoot you.
4. You can pause the game at any time by pressing the "P" on the keyboard. This will bring up an overlay menu with options to "Continue Game" or "Exit Game."

## Gameplay Rules

- At the beginning of the game, there will be 5 lines of invaders, each with 10 invaders of different types.
- Invaders move every 500 milliseconds, and the delay between each move decreases after every 10 moves.
- Invaders will move down a step if they reach the left or right side of the game container.
- Invaders can move from the left side to the right side of the container in 8 - 10 moves.
- If an invader reaches the player's Y position, the game is lost.
- Saucer3 invaders (on the top line) can fire randomly toward the player.
- The player cannot fire more than once within 500 milliseconds.
- If an enemy fire collides with the player, the game is lost.
- If all invaders are defeated, the game is won.

## Ending the Game

- If the player wins or loses, an overlay modal message will appear.
- The modal will display whether the game is won or lost and offer options to restart or exit the game.

## Sound Effects

Sound effects are integrated into the game for a more immersive experience. Sounds play when:
- Invaders move
- The player shoots
- An invader/player is killed

## Technologies Used

- HTML, JavaScript

## Credits

- The game is inspired by the classic Space Invaders arcade game.

---

Enjoy playing Space Invaders and have fun defending Earth from the invading aliens! If you have any questions or feedback, feel free to reach out to me.
