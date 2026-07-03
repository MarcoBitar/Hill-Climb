# 🚗 Hill Climb

**Hill Climb** is a browser-based 2D driving game built with **JavaScript** and **HTML5 Canvas**, where the player controls a vehicle across uneven terrain while collecting items, managing fuel, and trying to avoid crashes.

The game combines **terrain-based movement**, **vehicle control**, **physics-inspired gameplay**, **collision handling**, **collectibles**, and **level progression** to recreate the feel of a classic hill climbing arcade game in the browser.

This project demonstrates important game development concepts such as **object-oriented JavaScript**, **real-time rendering**, **keyboard input handling**, **sprite updates**, **collision detection**, and **multi-level game architecture**.

---

## 🧠 About the Project

Hill Climb is inspired by side-scrolling driving games where the player must navigate rough hills and slopes while keeping the vehicle balanced and moving forward.

The main challenge of the game is not just driving fast, but driving **carefully**:

* climbing and descending terrain without flipping the vehicle
* collecting rewards along the way
* preserving fuel / health / progress depending on the game mechanics you implemented
* reaching the finish line or progressing through levels successfully

The project was built to practice and demonstrate:

* **canvas-based game development**
* **terrain and vehicle interaction**
* **real-time update loops**
* **keyboard-controlled gameplay**
* **game object management using sprites**
* **level switching and progression**
* **state management for win / lose conditions**

The result is a playable 2D hill climbing game implemented entirely with front-end web technologies.

---

## 🧱 Project Structure

```bash
Hill-Climb/
├── index.html               # Main game page
├── game.js                  # Core game engine, loop, input, and level system
├── myCode.js                # Hill Climb gameplay logic, terrain, vehicle, items, and UI
├── assets/                  # Images, sounds, backgrounds, and game resources
├── README.md
└── .gitignore
```

> If your filenames are slightly different, keep the same structure idea and adjust them accordingly.

---

## 🎮 Gameplay Overview

In **Hill Climb**, the player drives a vehicle across a side-scrolling hilly terrain while trying to maintain balance and continue progressing forward.

Depending on your implementation, the player may need to:

* accelerate and brake at the right time
* keep the vehicle stable on steep slopes
* collect coins or pickups
* monitor fuel or health
* avoid flipping or crashing
* reach the end of the level

### The game typically includes:

* **vehicle movement across uneven terrain**
* **camera / scrolling progression**
* **collectibles or rewards**
* **level progression**
* **win / lose states**

---

## 🚀 Features

* 🚗 **Vehicle Control System** – accelerate, slow down, and navigate hills using keyboard input
* 🏔️ **Hill / Terrain Gameplay** – movement across uneven ground and slopes
* 🎮 **Real-Time Game Loop** – smooth updates and rendering using HTML5 Canvas
* 🧱 **Sprite-Based Architecture** – game objects managed through reusable classes
* 🧩 **Level System** – support for multiple levels with progression handling
* 💥 **Collision / Crash Logic** – fail states when the vehicle overturns or crashes
* 🪙 **Collectibles / Rewards** – collect in-game items such as coins or pickups if included in the level
* ⛽ **Fuel / Progress Mechanics** – optional resource management depending on your implementation
* 🏁 **Win / Lose States** – finish a level successfully or lose due to crash / failure conditions
* 🎨 **Canvas Rendering** – all gameplay is rendered in the browser using HTML5 Canvas

---

## 🧩 Core Components

The project is built around a reusable game framework and gameplay-specific classes.

### **Sprite**

A base class for game objects. It provides the structure for:

* `update()` behavior
* `draw(ctx)` rendering

All major in-game objects inherit or follow this sprite-style update/draw pattern.

### **Game**

Responsible for the overall game engine, including:

* canvas initialization
* the main game loop
* sprite storage and updates
* keyboard input handling
* mouse input handling
* level management and level switching

It also supports:

* `addSprite(sprite)`
* `addLevel(level)`
* `setLevel(index)`
* `changeLevel(index)`
* `nextLevel()` / `previousLevel()`

### **Level**

Represents an individual game level and defines its initialization logic.

This makes it possible to organize the game into multiple playable stages with separate terrain layouts, obstacles, or objectives.

### **Gameplay Objects**

Depending on your implementation in `myCode.js`, the game may also include classes such as:

* **Car / Vehicle**
* **Terrain / Ground**
* **Coin / Pickup**
* **Fuel item**
* **Obstacle**
* **UI / HUD elements**
* **Finish line / checkpoints**

---

## 🕹️ Controls

If your project uses the standard hill-climb controls, document them like this:

| Key                 | Action                                            |
| ------------------- | ------------------------------------------------- |
| **Arrow Right / D** | Accelerate forward                                |
| **Arrow Left / A**  | Brake / reverse                                   |
| **Arrow Up / W**    | Additional movement / tilt control if implemented |
| **Arrow Down / S**  | Brake / tilt control if implemented               |

> Adjust this section to match your exact controls if they differ.

---

## 🧰 Tech Stack

| Category         | Technology                           |
| ---------------- | ------------------------------------ |
| **Language**     | JavaScript                           |
| **Rendering**    | HTML5 Canvas                         |
| **Architecture** | Object-Oriented JavaScript           |
| **Frontend**     | HTML, CSS, JavaScript                |
| **Game Loop**    | Custom JavaScript update/render loop |

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/MarcoBitar/Hill-Climb.git
cd Hill-Climb
```

### 2️⃣ Make sure the project contains:

* `index.html`
* `game.js`
* the main gameplay script file (`myCode.js` or renamed equivalent)
* any required assets folder for images / sounds

---

## ▶️ Running the Game

Since this is a browser-based JavaScript game, you can run it directly in the browser.

### Option 1: Open directly

Open:

```bash
index.html
```

in your browser.

### Option 2: Run with VS Code Live Server

If you use **VS Code**, running the project with **Live Server** is recommended for smoother testing and asset loading.

---

## 📌 Current Architecture Summary

The current engine structure already supports:

* a **Sprite** base system for update/draw behavior
* a **Game** class with:

  * sprite management
  * keyboard input handling
  * mouse input handling
  * animation loop
  * level registration and switching
* a **Level** abstraction for multi-level game setup

This gives the project a strong foundation for implementing a complete hill-climbing game with multiple stages and gameplay systems layered on top.

---

## 🌟 Possible Future Enhancements

The project can be expanded with more advanced hill-climbing mechanics, such as:

* ⛽ **Fuel system** with fuel pickups
* 🪙 **Coin collection and in-game scoring**
* 🔧 **Vehicle upgrades** such as speed, grip, suspension, or fuel tank improvements
* 🏔️ **Procedural terrain generation**
* 🚙 **Multiple vehicles** with different stats
* 💥 **Improved crash / physics handling**
* 🏁 **Checkpoint and finish-line systems**
* 🎵 **Background music and sound effects**
* 📱 **Responsive scaling for different screen sizes**
* 🧭 **Level select screen or progression menu**

---

## 🤝 Contributing

Contributions are welcome.

To contribute:

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your fork
5. Open a pull request

---

## 👨‍💻 Author

**Marco Bitar**
🎓 Computer Science Student
📧 [bitar.marco21@gmail.com](mailto:bitar.marco21@gmail.com)
🌐 [GitHub](https://github.com/MarcoBitar) | [LinkedIn](https://www.linkedin.com/in/marco-bitar-545046285)
