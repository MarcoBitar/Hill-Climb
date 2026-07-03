class VehicleSpriteData extends Sprite {
    constructor() {
        super();

        this.vehicleBodies = [
            { x: 0, y: 591, width: 636, height: 223 },
            { x: 775, y: 592, width: 601, height: 209 },
            { x: 1621, y: 364, width: 640, height: 400 },
        ];

        this.vehicleHeads = [
            { x: 139, y: 229, width: 320, height: 245 },
            { x: 757, y: 182, width: 425, height: 302 },
            { x: 1756, y: 0, width: 305, height: 260 },
        ];

        this.rearWheels = [
            { x: 63, y: 892, width: 190, height: 178 },
            { x: 848, y: 940, width: 120, height: 118 },
            { x: 1583, y: 812, width: 242, height: 240 },
        ];

        this.frontWheels = [
            { x: 341, y: 893, width: 183, height: 187 },
            { x: 1132, y: 940, width: 120, height: 118 },
            { x: 2017, y: 812, width: 242, height: 240 },
        ];

        this.vehicleSettings = [
            {
                name: "Spike Rider",
                bodyWidth: 130,
                bodyHeight: 55,
                rearWheelOffsetX: -38,
                frontWheelOffsetX: 36,
                wheelOffsetY: 36,
                wheelRadius: 19,
                headOffsetX: -48,
                headOffsetY: -76,
                headWidth: 70,
                headHeight: 55,
                maxSpeed: 5,
                gasForce: 0.20,
                fuelUse: 0.11,
                airControl: 0.028,
                rotationLimit: Math.PI * 0.95,
            },
            {
                name: "Speed Racer",
                bodyWidth: 125,
                bodyHeight: 52,
                rearWheelOffsetX: -32,
                frontWheelOffsetX: 32,
                wheelOffsetY: 31,
                wheelRadius: 16,
                headOffsetX: -54,
                headOffsetY: -72,
                headWidth: 68,
                headHeight: 50,
                maxSpeed: 6.2,
                gasForce: 0.28,
                fuelUse: 0.14,
                airControl: 0.034,
                rotationLimit: Math.PI * 0.90,
            },
            {
                name: "Monster King",
                bodyWidth: 145,
                bodyHeight: 80,
                rearWheelOffsetX: -55,
                frontWheelOffsetX: 58,
                wheelOffsetY: 50,
                wheelRadius: 27,
                headOffsetX: -46,
                headOffsetY: -90,
                headWidth: 68,
                headHeight: 58,
                maxSpeed: 4.3,
                gasForce: 0.18,
                fuelUse: 0.09,
                airControl: 0.022,
                rotationLimit: Math.PI,
            },
        ];
    }

    update() {
        return false;
    }

    draw(ctx) { }
}


class Camera extends Sprite {
    constructor() {
        super();
        this.offsetX = 0;
    }

    follow(targetX) {
        this.offsetX = targetX - 220;

        if (this.offsetX < 0) {
            this.offsetX = 0;
        }
    }

    update() {
        return false;
    }

    draw(ctx) { }
}


class MoonSky extends Sprite {
    constructor() {
        super();

        this.stars = [];

        for (let starIndex = 0; starIndex < 70; starIndex++) {
            this.stars.push({
                x: (starIndex * 97) % 800,
                y: 20 + ((starIndex * 53) % 260),
                size: 1 + (starIndex % 2),
            });
        }
    }

    update() {
        return false;
    }

    draw(ctx) {
        let skyGradient = ctx.createLinearGradient(0, 0, 0, 600);
        skyGradient.addColorStop(0, "#050816");
        skyGradient.addColorStop(0.65, "#111827");
        skyGradient.addColorStop(1, "#374151");

        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, 800, 600);

        ctx.fillStyle = "rgba(255,255,255,0.9)";

        for (let i = 0; i < this.stars.length; i++) {
            ctx.fillRect(
                this.stars[i].x,
                this.stars[i].y,
                this.stars[i].size,
                this.stars[i].size
            );
        }

        ctx.beginPath();
        ctx.arc(690, 85, 42, 0, Math.PI * 2);
        ctx.fillStyle = "#E5E7EB";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(675, 75, 7, 0, Math.PI * 2);
        ctx.arc(704, 92, 6, 0, Math.PI * 2);
        ctx.arc(688, 106, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#9CA3AF";
        ctx.fill();
    }
}


class EarthSky extends Sprite {
    constructor() {
        super();
    }

    update() {
        return false;
    }

    draw(ctx) {
        let skyGradient = ctx.createLinearGradient(0, 0, 0, 600);
        skyGradient.addColorStop(0, "#4FC3F7");
        skyGradient.addColorStop(0.65, "#B3E5FC");
        skyGradient.addColorStop(1, "#E1F5FE");

        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, 800, 600);
    }
}


class EarthTerrain extends Sprite {
    constructor(camera) {
        super();

        this.camera = camera;
        this.pointSpacing = 8;
        this.totalPoints = 5000;
        this.points = [];
        this.sky = new EarthSky();

        for (let pointIndex = 0; pointIndex < this.totalPoints; pointIndex++) {
            let x = pointIndex * this.pointSpacing;
            let y = 450
                - Math.sin(pointIndex * 0.04) * 45
                - Math.sin(pointIndex * 0.015) * 55
                - Math.sin(pointIndex * 0.009) * 22;

            this.points.push({ x: x, y: y });
        }
    }

    getYAtX(worldX) {
        let exactIndex = worldX / this.pointSpacing;
        let leftIndex = Math.floor(exactIndex);
        let amountBetweenPoints = exactIndex - leftIndex;

        if (leftIndex < 0) {
            return this.points[0].y;
        }

        if (leftIndex >= this.points.length - 1) {
            return this.points[this.points.length - 1].y;
        }

        let leftPoint = this.points[leftIndex];
        let rightPoint = this.points[leftIndex + 1];

        return leftPoint.y + (rightPoint.y - leftPoint.y) * amountBetweenPoints;
    }

    getAngleAtX(worldX) {
        let leftY = this.getYAtX(worldX - 8);
        let rightY = this.getYAtX(worldX + 8);

        return Math.atan2(rightY - leftY, 16);
    }

    update() {
        return false;
    }

    draw(ctx) {
        this.sky.draw(ctx);

        ctx.beginPath();
        ctx.moveTo(0, 600);

        for (let pointIndex = 0; pointIndex < this.points.length; pointIndex++) {
            let screenX = this.points[pointIndex].x - this.camera.offsetX;

            if (screenX >= -20 && screenX <= 820) {
                ctx.lineTo(screenX, this.points[pointIndex].y);
            }
        }

        ctx.lineTo(800, 600);
        ctx.closePath();

        let dirtGradient = ctx.createLinearGradient(0, 410, 0, 600);
        dirtGradient.addColorStop(0, "#6D4C1F");
        dirtGradient.addColorStop(1, "#3E2A0A");

        ctx.fillStyle = dirtGradient;
        ctx.fill();

        ctx.strokeStyle = "#4CAF50";
        ctx.lineWidth = 5;
        ctx.stroke();
    }
}


class MoonTerrain extends Sprite {
    constructor(camera) {
        super();

        this.camera = camera;
        this.pointSpacing = 8;
        this.totalPoints = 5000;
        this.points = [];
        this.craters = [];
        this.sky = new MoonSky();

        for (let pointIndex = 0; pointIndex < this.totalPoints; pointIndex++) {
            let x = pointIndex * this.pointSpacing;
            let y = 460
                - Math.sin(pointIndex * 0.035) * 28
                - Math.sin(pointIndex * 0.012) * 42
                - Math.sin(pointIndex * 0.007) * 18;

            this.points.push({ x: x, y: y });
        }

        for (let craterIndex = 0; craterIndex < 80; craterIndex++) {
            let craterX = 250 + craterIndex * 520 + (craterIndex % 3) * 130;

            this.craters.push({
                x: craterX,
                y: this.getYAtX(craterX) + 18,
                radiusX: 25 + (craterIndex % 4) * 8,
                radiusY: 7 + (craterIndex % 3) * 3,
            });
        }
    }

    getYAtX(worldX) {
        let exactIndex = worldX / this.pointSpacing;
        let leftIndex = Math.floor(exactIndex);
        let amountBetweenPoints = exactIndex - leftIndex;

        if (leftIndex < 0) {
            return this.points[0].y;
        }

        if (leftIndex >= this.points.length - 1) {
            return this.points[this.points.length - 1].y;
        }

        let leftPoint = this.points[leftIndex];
        let rightPoint = this.points[leftIndex + 1];

        return leftPoint.y + (rightPoint.y - leftPoint.y) * amountBetweenPoints;
    }

    getAngleAtX(worldX) {
        let leftY = this.getYAtX(worldX - 8);
        let rightY = this.getYAtX(worldX + 8);

        return Math.atan2(rightY - leftY, 16);
    }

    update() {
        return false;
    }

    draw(ctx) {
        this.sky.draw(ctx);

        ctx.beginPath();
        ctx.moveTo(0, 600);

        for (let pointIndex = 0; pointIndex < this.points.length; pointIndex++) {
            let screenX = this.points[pointIndex].x - this.camera.offsetX;

            if (screenX >= -20 && screenX <= 820) {
                ctx.lineTo(screenX, this.points[pointIndex].y);
            }
        }

        ctx.lineTo(800, 600);
        ctx.closePath();

        let dirtGradient = ctx.createLinearGradient(0, 410, 0, 600);
        dirtGradient.addColorStop(0, "#9CA3AF");
        dirtGradient.addColorStop(1, "#4B5563");

        ctx.fillStyle = dirtGradient;
        ctx.fill();

        for (let craterIndex = 0; craterIndex < this.craters.length; craterIndex++) {
            let crater = this.craters[craterIndex];
            let screenX = crater.x - this.camera.offsetX;

            if (screenX > -80 && screenX < 880) {
                ctx.beginPath();
                ctx.ellipse(
                    screenX,
                    crater.y,
                    crater.radiusX,
                    crater.radiusY,
                    0,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = "rgba(55,65,81,0.45)";
                ctx.fill();
            }
        }

        ctx.strokeStyle = "#D1D5DB";
        ctx.lineWidth = 5;
        ctx.stroke();
    }
}


class Wheel extends Sprite {
    constructor(playerVehicle, isRearWheel) {
        super();

        this.playerVehicle = playerVehicle;
        this.isRearWheel = isRearWheel;
    }

    update() {
        return false;
    }

    getWheelData() {
        if (this.isRearWheel) {
            return this.playerVehicle.hillClimbGame.vehicleSpriteData.rearWheels[
                this.playerVehicle.vehicleType
            ];
        }

        return this.playerVehicle.hillClimbGame.vehicleSpriteData.frontWheels[
            this.playerVehicle.vehicleType
        ];
    }

    getOffsetX() {
        if (this.isRearWheel) {
            return this.playerVehicle.rearWheelOffsetX;
        }

        return this.playerVehicle.frontWheelOffsetX;
    }

    draw(ctx) {
        let wheelData = this.getWheelData();
        let offsetX = this.getOffsetX();
        let offsetY = this.playerVehicle.wheelOffsetY;
        let radius = this.playerVehicle.wheelRadius;

        ctx.save();

        ctx.translate(offsetX, offsetY);
        ctx.rotate(this.playerVehicle.wheelRotation);

        if (this.playerVehicle.vehicleImageIsReady) {
            ctx.drawImage(
                this.playerVehicle.vehicleImage,
                wheelData.x,
                wheelData.y,
                wheelData.width,
                wheelData.height,
                -radius,
                -radius,
                radius * 2,
                radius * 2
            );
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fillStyle = "#222";
            ctx.fill();
        }

        ctx.restore();
    }
}


class PlayerVehicle extends Sprite {
    constructor(startX, startY, vehicleType, hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;

        this.x = startX;
        this.y = startY;
        this.vehicleType = vehicleType;

        this.vehicleImage = new Image();
        this.vehicleImageIsReady = false;

        this.vehicleImage.onload = () => {
            this.vehicleImageIsReady = true;
        };

        this.vehicleImage.onerror = () => {
            this.vehicleImageIsReady = false;
            console.log("Could not load image:", "assets/images/Car.png");
        };

        this.vehicleImage.src = "assets/images/Car.png";

        switch (this.vehicleType) {
            case 0:
                this.engineSound = new Audio("assets/sounds/Spike_Rider_Motor.mp3");
                break;
            case 1:
                this.engineSound = new Audio("assets/sounds/Speed_Racer_Motor.mp3");
                break;
            case 2:
                this.engineSound = new Audio("assets/sounds/Monster_Truck_Motor.mp3");
                break;
            default:
                this.engineSound = new Audio("assets/sounds/Speed_Racer_Motor.mp3");
                break;
        }

        this.engineSound.loop = true;
        this.engineSound.volume = 0.35;

        this.vehicleSettings = this.hillClimbGame.vehicleSpriteData.vehicleSettings[this.vehicleType];

        this.width = this.vehicleSettings.bodyWidth;
        this.height = this.vehicleSettings.bodyHeight;

        this.velocityX = 0;
        this.velocityY = 0;

        this.gravity = this.hillClimbGame.currentGravity;
        this.maxSpeed = this.vehicleSettings.maxSpeed;
        this.gasForce = this.vehicleSettings.gasForce;
        this.fuelUse = this.vehicleSettings.fuelUse;
        this.airControl = this.vehicleSettings.airControl;

        this.brakeForce = 0.2;
        this.friction = 0.97;

        this.angle = 0;
        this.rotationSpeed = 0;

        this.groundStick = 0.22;
        this.maxGroundAngleChange = 0.08;

        this.isOnGround = false;
        this.isFlipped = false;

        this.fuel = 100;
        this.maxFuel = 100;

        this.distancePixels = 0;
        this.coinsCollected = 0;
        this.score = 0;

        this.rearWheelOffsetX = this.vehicleSettings.rearWheelOffsetX;
        this.frontWheelOffsetX = this.vehicleSettings.frontWheelOffsetX;
        this.wheelOffsetY = this.vehicleSettings.wheelOffsetY;
        this.wheelRadius = this.vehicleSettings.wheelRadius;

        this.bodyLift = this.wheelOffsetY;

        this.suspensionOffset = 0;
        this.suspensionVelocity = 0;

        this.wheelRotation = 0;

        this.rearWheel = new Wheel(this, true);
        this.frontWheel = new Wheel(this, false);
    }

    update(arrayOfSprites, keys) {
        if (this.hillClimbGame.gameState !== "playing") {
            this.stopEngineSound();
            return false;
        }

        let gasPressed = keys["ArrowRight"] || keys["d"] || keys["D"];
        let brakePressed = keys["ArrowLeft"] || keys["a"] || keys["A"];

        if (gasPressed && this.fuel > 0) {
            this.velocityX += this.gasForce;
            this.fuel -= this.fuelUse;
            this.startEngineSound();

            if (this.fuel < 0) {
                this.fuel = 0;
            }
        } else {
            this.stopEngineSound();
        }

        if (brakePressed) {
            this.velocityX -= this.brakeForce;
        }

        this.velocityX *= this.friction;

        if (this.velocityX > this.maxSpeed) {
            this.velocityX = this.maxSpeed;
        }

        if (this.velocityX < -this.maxSpeed * 0.4) {
            this.velocityX = -this.maxSpeed * 0.4;
        }

        this.velocityY += this.gravity;

        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x < 50) {
            this.x = 50;
        }

        let rearWheelWorldX = this.x + this.rearWheelOffsetX;
        let frontWheelWorldX = this.x + this.frontWheelOffsetX;

        let rearWheelGroundY = this.hillClimbGame.terrain.getYAtX(rearWheelWorldX) - this.wheelRadius;
        let frontWheelGroundY = this.hillClimbGame.terrain.getYAtX(frontWheelWorldX) - this.wheelRadius;

        let wheelBase = frontWheelWorldX - rearWheelWorldX;
        let groundAngle = Math.atan2(frontWheelGroundY - rearWheelGroundY, wheelBase);

        let averageWheelY = (rearWheelGroundY + frontWheelGroundY) / 2;
        let targetBodyY = averageWheelY - this.bodyLift;

        this.isOnGround = false;

        if (this.y >= targetBodyY) {
            let hitStrength = this.velocityY;

            this.y = targetBodyY;
            this.velocityY = 0;
            this.isOnGround = true;

            if (hitStrength > 1) {
                this.suspensionVelocity += hitStrength * 0.12;
            }
        }

        if (this.isOnGround) {
            let angleDifference = groundAngle - this.angle;

            if (angleDifference > this.maxGroundAngleChange) {
                angleDifference = this.maxGroundAngleChange;
            }

            if (angleDifference < -this.maxGroundAngleChange) {
                angleDifference = -this.maxGroundAngleChange;
            }

            this.angle += angleDifference;
            this.rotationSpeed = 0;

            this.suspensionVelocity += (0 - this.suspensionOffset) * 0.15;
            this.suspensionVelocity *= 0.70;
            this.suspensionOffset += this.suspensionVelocity;

            if (this.suspensionOffset > 5) {
                this.suspensionOffset = 5;
            }

            if (this.suspensionOffset < -3) {
                this.suspensionOffset = -3;
            }
        } else {
            this.suspensionOffset *= 0.90;

            if (gasPressed) {
                this.rotationSpeed -= this.airControl;
            }

            if (brakePressed) {
                this.rotationSpeed += this.airControl;
            }

            this.angle += this.rotationSpeed;
            this.rotationSpeed *= 0.98;
        }

        this.wheelRotation += this.velocityX / this.wheelRadius;

        if (this.velocityX > 0) {
            this.distancePixels += this.velocityX;
            this.score = Math.floor(this.distancePixels / 16) + this.coinsCollected * 100;
            this.hillClimbGame.totalScore = this.score;
        }

        this.hillClimbGame.camera.follow(this.x);

        let headWorldX = this.x + Math.sin(this.angle) * -this.height;
        let headWorldY = this.y + Math.cos(this.angle) * -this.height;
        let headGroundY = this.hillClimbGame.terrain.getYAtX(headWorldX);

        if (!this.isOnGround && headWorldY >= headGroundY - 5) {
            this.isFlipped = true;
        }

        this.checkWinOrLose();

        return false;
    }

    checkWinOrLose() {
        let distanceMeters = Math.floor(this.distancePixels / 60);

        if (distanceMeters >= this.hillClimbGame.winDistance) {
            this.stopEngineSound();
            this.hillClimbGame.gameState = "win";
            return;
        }

        if (this.fuel <= 0 || this.isFlipped) {
            this.stopEngineSound();
            this.hillClimbGame.lives--;

            if (this.hillClimbGame.lives <= 0) {
                this.hillClimbGame.gameState = "lose";
            } else {
                this.resetAfterLosingLife();
            }
        }
    }

    startEngineSound() {
        if (this.engineSound && this.engineSound.paused) {
            let playResult = this.engineSound.play();

            if (playResult && playResult.catch) {
                playResult.catch(() => { });
            }
        }
    }

    stopEngineSound() {
        if (this.engineSound) {
            this.engineSound.pause();
            this.engineSound.currentTime = 0;
        }
    }

    addFuel(amount) {
        this.fuel += amount;

        if (this.fuel > this.maxFuel) {
            this.fuel = this.maxFuel;
        }
    }

    resetAfterLosingLife() {
        this.stopEngineSound();
        this.x = this.hillClimbGame.camera.offsetX + 150;
        this.y = this.hillClimbGame.terrain.getYAtX(this.x) - this.height - 50;

        this.velocityX = 0;
        this.velocityY = 0;
        this.rotationSpeed = 0;
        this.angle = 0;
        this.suspensionOffset = 0;
        this.suspensionVelocity = 0;

        this.fuel = 100;
        this.isFlipped = false;
    }

    draw(ctx) {
        if (
            this.hillClimbGame.gameState !== "playing" &&
            this.hillClimbGame.gameState !== "paused"
        ) {
            return;
        }

        let screenX = this.x - this.hillClimbGame.camera.offsetX;
        let screenY = this.y + this.suspensionOffset;

        ctx.save();

        ctx.translate(screenX, screenY);
        ctx.rotate(this.angle);

        if (this.vehicleImageIsReady) {
            let bodyData = this.hillClimbGame.vehicleSpriteData.vehicleBodies[this.vehicleType];

            ctx.drawImage(
                this.vehicleImage,
                bodyData.x,
                bodyData.y,
                bodyData.width,
                bodyData.height,
                -this.width / 2,
                -this.height / 2,
                this.width,
                this.height
            );

            let headData = this.hillClimbGame.vehicleSpriteData.vehicleHeads[this.vehicleType];

            if (headData) {
                ctx.drawImage(
                    this.vehicleImage,
                    headData.x,
                    headData.y,
                    headData.width,
                    headData.height,
                    this.vehicleSettings.headOffsetX,
                    this.vehicleSettings.headOffsetY,
                    this.vehicleSettings.headWidth,
                    this.vehicleSettings.headHeight
                );
            }

            this.rearWheel.draw(ctx);
            this.frontWheel.draw(ctx);
        } else {
            let vehicleColors = ["#8B6914", "#E53935", "#1565C0"];

            ctx.fillStyle = vehicleColors[this.vehicleType];
            ctx.beginPath();
            ctx.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, 8);
            ctx.fill();
        }

        ctx.restore();
    }
}


class CollectibleCoin extends Sprite {
    constructor(worldX, hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;

        this.coinImage = new Image();
        this.coinImageIsReady = false;

        this.coinImage.onload = () => {
            this.coinImageIsReady = true;
        };

        this.coinImage.onerror = () => {
            this.coinImageIsReady = false;
            console.log("Could not load image:", "assets/images/Coin.png");
        };

        this.coinImage.src = "assets/images/Coin.png";

        this.coinSound = new Audio("assets/sounds/Coin.mp3");
        this.coinSound.loop = false;
        this.coinSound.volume = 0.55;

        this.worldX = worldX;
        this.baseY = this.hillClimbGame.terrain.getYAtX(this.worldX) - 42;
        this.worldY = this.baseY;

        this.radius = 14;
        this.bobTimer = Math.random() * Math.PI * 2;

        this.isCollected = false;
        this.popAnimation = 0;
    }

    update() {
        if (this.hillClimbGame.gameState !== "playing") {
            return false;
        }

        if (this.isCollected) {
            this.popAnimation++;
            return this.popAnimation > 20;
        }

        this.bobTimer += 0.05;
        this.worldY = this.baseY + Math.sin(this.bobTimer) * 6;

        if (this.hillClimbGame.playerVehicle) {
            let distanceX = this.worldX - this.hillClimbGame.playerVehicle.x;
            let distanceY = this.worldY - this.hillClimbGame.playerVehicle.y;
            let distanceFromCar = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distanceFromCar < this.radius + 32) {
                this.isCollected = true;
                this.coinSound.currentTime = 0;

                let playResult = this.coinSound.play();

                if (playResult && playResult.catch) {
                    playResult.catch(() => { });
                }

                this.hillClimbGame.totalCoins++;
                this.hillClimbGame.playerVehicle.coinsCollected++;
            }
        }

        return false;
    }

    draw(ctx) {
        let screenX = this.worldX - this.hillClimbGame.camera.offsetX;
        let screenY = this.worldY;

        if (screenX < -40 || screenX > 840) {
            return;
        }

        ctx.save();

        if (this.isCollected) {
            let scale = 1 + this.popAnimation * 0.08;
            let opacity = 1 - this.popAnimation / 20;

            ctx.globalAlpha = Math.max(0, opacity);
            ctx.translate(screenX, screenY);
            ctx.scale(scale, scale);
            ctx.translate(-screenX, -screenY);

            ctx.fillStyle = "#FFD700";
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.fillText("+100", screenX, screenY);

            ctx.restore();
            return;
        }

        ctx.translate(screenX, screenY);

        if (this.coinImageIsReady) {
            ctx.drawImage(
                this.coinImage,
                -this.radius,
                -this.radius,
                this.radius * 2,
                this.radius * 2
            );
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#FFD700";
            ctx.fill();

            ctx.strokeStyle = "#B8860B";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = "#7D5A00";
            ctx.font = "bold 11px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("C", 0, 1);
        }

        ctx.restore();
    }
}


class FuelTank extends Sprite {
    constructor(worldX, hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;

        this.worldX = worldX;
        this.baseY = this.hillClimbGame.terrain.getYAtX(this.worldX) - 38;
        this.worldY = this.baseY;

        this.width = 22;
        this.height = 30;
        this.isCollected = false;
        this.bobTimer = Math.random() * Math.PI * 2;
    }

    update() {
        if (this.hillClimbGame.gameState !== "playing") {
            return false;
        }

        if (this.isCollected) {
            return true;
        }

        this.bobTimer += 0.04;
        this.worldY = this.baseY + Math.sin(this.bobTimer) * 4;

        if (this.hillClimbGame.playerVehicle) {
            let distanceX = this.worldX - this.hillClimbGame.playerVehicle.x;
            let distanceY = this.worldY - this.hillClimbGame.playerVehicle.y;
            let distanceFromCar = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distanceFromCar < 40) {
                this.isCollected = true;
                this.hillClimbGame.playerVehicle.addFuel(35);
            }
        }

        return false;
    }

    draw(ctx) {
        let screenX = this.worldX - this.hillClimbGame.camera.offsetX;
        let screenY = this.worldY;

        if (screenX < -40 || screenX > 840) {
            return;
        }

        ctx.save();
        ctx.translate(screenX, screenY);

        ctx.fillStyle = "#D32F2F";
        ctx.strokeStyle = "#7F0000";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#333";
        ctx.fillRect(-5, -this.height / 2 - 5, 10, 6);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 10px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("F", 0, 1);

        ctx.restore();
    }
}


class FuelDisplay extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;

        this.x = 70;
        this.y = 18;
        this.width = 155;
        this.height = 18;
    }

    update() {
        return false;
    }

    draw(ctx) {
        if (
            this.hillClimbGame.gameState !== "playing" &&
            this.hillClimbGame.gameState !== "paused"
        ) {
            return;
        }

        ctx.save();

        ctx.font = "bold 13px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("FUEL", 30, 27);

        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 4);
        ctx.fill();
        ctx.stroke();

        let fuelPercent = this.hillClimbGame.playerVehicle.fuel / this.hillClimbGame.playerVehicle.maxFuel;
        let fuelWidth = this.width * fuelPercent;

        if (fuelPercent > 0.5) {
            ctx.fillStyle = "#4CAF50";
        } else if (fuelPercent > 0.25) {
            ctx.fillStyle = "#FFC107";
        } else {
            ctx.fillStyle = "#F44336";
        }

        if (fuelWidth > 4) {
            ctx.beginPath();
            ctx.roundRect(this.x, this.y, fuelWidth, this.height, 4);
            ctx.fill();
        }

        ctx.fillStyle = "#000";
        ctx.font = "bold 11px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
            Math.floor(this.hillClimbGame.playerVehicle.fuel),
            this.x + this.width / 2,
            this.y + this.height / 2
        );

        ctx.restore();
    }
}


class Distance extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;
    }

    update() {
        return false;
    }

    getMeters() {
        return Math.floor(this.hillClimbGame.playerVehicle.distancePixels / 60);
    }

    draw(ctx) {
        if (
            this.hillClimbGame.gameState !== "playing" &&
            this.hillClimbGame.gameState !== "paused"
        ) {
            return;
        }

        let distanceMeters = this.getMeters();

        ctx.save();

        ctx.font = "bold 15px Arial";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "left";
        ctx.fillText("Distance: " + distanceMeters + " m", 10, 65);

        ctx.fillStyle = "#B3E5FC";
        ctx.textAlign = "center";
        ctx.font = "14px Arial";
        ctx.fillText(distanceMeters + " / " + this.hillClimbGame.winDistance + " m", 400, 35);

        let progress = distanceMeters / this.hillClimbGame.winDistance;

        if (progress > 1) {
            progress = 1;
        }

        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillRect(0, 0, 800, 5);

        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(0, 0, 800 * progress, 5);

        ctx.restore();
    }
}


class CoinScore extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;
    }

    update() {
        return false;
    }

    draw(ctx) {
        if (
            this.hillClimbGame.gameState !== "playing" &&
            this.hillClimbGame.gameState !== "paused"
        ) {
            return;
        }

        ctx.save();

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 15px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText("Coins: " + this.hillClimbGame.playerVehicle.coinsCollected, 10, 85);

        ctx.restore();
    }
}


class Score extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;
    }

    update() {
        return false;
    }

    draw(ctx) {
        if (
            this.hillClimbGame.gameState !== "playing" &&
            this.hillClimbGame.gameState !== "paused"
        ) {
            return;
        }

        ctx.save();

        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16px Arial";
        ctx.fillText("Score: " + this.hillClimbGame.playerVehicle.score, 400, 21);

        ctx.textAlign = "right";
        ctx.font = "bold 16px Arial";
        ctx.fillText("Lives: " + this.hillClimbGame.lives, 735, 30);

        ctx.restore();
    }
}


class Button extends Sprite {
    constructor(x, y, width, height, text) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
    }

    update() {
        return false;
    }

    isClicked(mouse) {
        return (
            mouse.clicked &&
            mouse.x >= this.x &&
            mouse.x <= this.x + this.width &&
            mouse.y >= this.y &&
            mouse.y <= this.y + this.height
        );
    }

    draw(ctx) {
        ctx.save();

        ctx.shadowColor = "rgba(0,0,0,0.4)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 3;

        let gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        gradient.addColorStop(0, "#1976D2");
        gradient.addColorStop(1, "#0D47A1");

        ctx.fillStyle = gradient;
        ctx.strokeStyle = "#90CAF9";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 8);
        ctx.fill();
        ctx.stroke();

        ctx.shadowColor = "transparent";

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);

        ctx.restore();
    }
}


class MessagePanel extends Sprite {
    constructor(x, y, width, height) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() {
        return false;
    }

    draw(ctx) {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 12);
        ctx.fill();
        ctx.stroke();
    }
}


class PauseButton extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;

        this.x = 748;
        this.y = 10;
        this.width = 40;
        this.height = 32;
    }

    update(arrayOfSprites, keys, mouse) {
        if (
            this.hillClimbGame.gameState !== "playing" &&
            this.hillClimbGame.gameState !== "paused"
        ) {
            return false;
        }

        let buttonClicked =
            mouse.clicked &&
            mouse.x >= this.x &&
            mouse.x <= this.x + this.width &&
            mouse.y >= this.y &&
            mouse.y <= this.y + this.height;

        if (buttonClicked) {
            if (this.hillClimbGame.gameState === "playing") {
                this.hillClimbGame.gameState = "paused";
            } else {
                this.hillClimbGame.gameState = "playing";
            }

            mouse.clicked = false;
        }

        return false;
    }

    draw(ctx) {
        if (
            this.hillClimbGame.gameState !== "playing" &&
            this.hillClimbGame.gameState !== "paused"
        ) {
            return;
        }

        ctx.save();

        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 5);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#fff";

        if (this.hillClimbGame.gameState === "playing") {
            ctx.fillRect(this.x + 11, this.y + 7, 6, 16);
            ctx.fillRect(this.x + 23, this.y + 7, 6, 16);
        } else {
            ctx.beginPath();
            ctx.moveTo(this.x + 14, this.y + 7);
            ctx.lineTo(this.x + 14, this.y + 25);
            ctx.lineTo(this.x + 30, this.y + 16);
            ctx.closePath();
            ctx.fill();
        }

        if (this.hillClimbGame.gameState === "paused") {
            ctx.fillStyle = "rgba(0,0,0,0.55)";
            ctx.fillRect(0, 0, 800, 600);

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 56px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("PAUSED", 400, 240);

            ctx.font = "22px Arial";
            ctx.fillStyle = "#B3E5FC";
            ctx.fillText("Press the play button to resume", 400, 305);

            ctx.font = "18px Arial";
            ctx.fillStyle = "#aaa";
            ctx.fillText(
                "Score: " +
                this.hillClimbGame.totalScore +
                "   Coins: " +
                this.hillClimbGame.totalCoins +
                "   Lives: " +
                this.hillClimbGame.lives,
                400,
                350
            );
        }

        ctx.restore();
    }
}


class MenuBackground extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;
        this.animationTimer = 0;
    }

    update() {
        this.animationTimer += 0.03;
        return false;
    }

    draw(ctx) {
        if (
            this.hillClimbGame.gameState === "playing" ||
            this.hillClimbGame.gameState === "paused"
        ) {
            return;
        }

        let skyGradient = ctx.createLinearGradient(0, 0, 0, 600);
        skyGradient.addColorStop(0, "#1565C0");
        skyGradient.addColorStop(0.6, "#42A5F5");
        skyGradient.addColorStop(1, "#B3E5FC");

        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, 800, 600);

        ctx.beginPath();
        ctx.moveTo(0, 600);

        for (let x = 0; x <= 800; x += 4) {
            let y = 440
                - Math.sin((x + this.animationTimer * 30) * 0.015) * 35
                - Math.sin((x + this.animationTimer * 15) * 0.04) * 18;

            ctx.lineTo(x, y);
        }

        ctx.lineTo(800, 600);
        ctx.closePath();

        let dirtGradient = ctx.createLinearGradient(0, 420, 0, 600);
        dirtGradient.addColorStop(0, "#5D4037");
        dirtGradient.addColorStop(1, "#3E2723");

        ctx.fillStyle = dirtGradient;
        ctx.fill();

        ctx.strokeStyle = "#388E3C";
        ctx.lineWidth = 4;
        ctx.stroke();
    }
}


class VehiclePreview extends Sprite {
    constructor(hillClimbGame, vehicleIndex, centerX, centerY, scale) {
        super();

        this.hillClimbGame = hillClimbGame;
        this.vehicleIndex = vehicleIndex;
        this.centerX = centerX;
        this.centerY = centerY;
        this.scale = scale;

        this.vehicleImage = new Image();
        this.vehicleImageIsReady = false;

        this.vehicleImage.onload = () => {
            this.vehicleImageIsReady = true;
        };

        this.vehicleImage.onerror = () => {
            this.vehicleImageIsReady = false;
            console.log("Could not load image:", "assets/images/Car.png");
        };

        this.vehicleImage.src = "assets/images/Car.png";
    }

    update() {
        return false;
    }

    setPosition(centerX, centerY) {
        this.centerX = centerX;
        this.centerY = centerY;
    }

    draw(ctx) {
        let spriteData = this.hillClimbGame.vehicleSpriteData;
        let settings = spriteData.vehicleSettings[this.vehicleIndex];

        let bodyX = this.centerX - (settings.bodyWidth * this.scale) / 2;
        let bodyY = this.centerY - (settings.bodyHeight * this.scale) / 2;
        let bodyWidth = settings.bodyWidth * this.scale;
        let bodyHeight = settings.bodyHeight * this.scale;

        if (!this.vehicleImageIsReady) {
            let vehicleColors = ["#8B6914", "#E53935", "#1565C0"];

            ctx.fillStyle = vehicleColors[this.vehicleIndex];
            ctx.beginPath();
            ctx.roundRect(bodyX, bodyY, bodyWidth, bodyHeight, 8);
            ctx.fill();

            return;
        }

        let bodyData = spriteData.vehicleBodies[this.vehicleIndex];
        let headData = spriteData.vehicleHeads[this.vehicleIndex];
        let rearWheelData = spriteData.rearWheels[this.vehicleIndex];
        let frontWheelData = spriteData.frontWheels[this.vehicleIndex];

        ctx.drawImage(
            this.vehicleImage,
            bodyData.x,
            bodyData.y,
            bodyData.width,
            bodyData.height,
            bodyX,
            bodyY,
            bodyWidth,
            bodyHeight
        );

        if (headData) {
            ctx.drawImage(
                this.vehicleImage,
                headData.x,
                headData.y,
                headData.width,
                headData.height,
                this.centerX + settings.headOffsetX * this.scale,
                this.centerY + settings.headOffsetY * this.scale,
                settings.headWidth * this.scale,
                settings.headHeight * this.scale
            );
        }

        ctx.drawImage(
            this.vehicleImage,
            rearWheelData.x,
            rearWheelData.y,
            rearWheelData.width,
            rearWheelData.height,
            this.centerX + (settings.rearWheelOffsetX - settings.wheelRadius) * this.scale,
            this.centerY + (settings.wheelOffsetY - settings.wheelRadius) * this.scale,
            settings.wheelRadius * 2 * this.scale,
            settings.wheelRadius * 2 * this.scale
        );

        ctx.drawImage(
            this.vehicleImage,
            frontWheelData.x,
            frontWheelData.y,
            frontWheelData.width,
            frontWheelData.height,
            this.centerX + (settings.frontWheelOffsetX - settings.wheelRadius) * this.scale,
            this.centerY + (settings.wheelOffsetY - settings.wheelRadius) * this.scale,
            settings.wheelRadius * 2 * this.scale,
            settings.wheelRadius * 2 * this.scale
        );
    }
}


class MainMenuScreen extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;

        this.playButton = new Button(300, 220, 200, 48, "Play Game");
        this.howToButton = new Button(300, 290, 200, 48, "How to Play");
        this.storyButton = new Button(300, 360, 200, 48, "Story");
        this.keysButton = new Button(300, 430, 200, 48, "Keys");
    }

    update(arrayOfSprites, keys, mouse) {
        if (this.hillClimbGame.gameState !== "menu") {
            return false;
        }

        if (!mouse.clicked) {
            return false;
        }

        if (this.playButton.isClicked(mouse)) {
            this.hillClimbGame.gameState = "levelSelect";
            mouse.clicked = false;
            return false;
        }

        if (this.howToButton.isClicked(mouse)) {
            this.hillClimbGame.gameState = "howTo";
            mouse.clicked = false;
            return false;
        }

        if (this.storyButton.isClicked(mouse)) {
            this.hillClimbGame.gameState = "story";
            mouse.clicked = false;
            return false;
        }

        if (this.keysButton.isClicked(mouse)) {
            this.hillClimbGame.gameState = "keys";
            mouse.clicked = false;
            return false;
        }

        mouse.clicked = false;
        return false;
    }

    draw(ctx) {
        if (this.hillClimbGame.gameState !== "menu") {
            return;
        }

        ctx.save();

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 24;
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 62px Arial";
        ctx.fillText("Hill Climb", 400, 90);

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "24px Arial";
        ctx.fillText("Racing", 400, 138);

        this.playButton.draw(ctx);
        this.howToButton.draw(ctx);
        this.storyButton.draw(ctx);
        this.keysButton.draw(ctx);

        ctx.restore();
    }
}


class LevelSelectionScreen extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;

        this.backButton = new Button(10, 10, 80, 32, "Back");
        this.earthButton = new Button(150, 235, 210, 145, "Earth Level");
        this.moonButton = new Button(440, 235, 210, 145, "Moon Level");
    }

    update(arrayOfSprites, keys, mouse) {
        if (this.hillClimbGame.gameState !== "levelSelect") {
            return false;
        }

        if (!mouse.clicked) {
            return false;
        }

        if (this.backButton.isClicked(mouse)) {
            this.hillClimbGame.gameState = "menu";
            mouse.clicked = false;
            return false;
        }

        if (this.earthButton.isClicked(mouse)) {
            this.hillClimbGame.selectedLevel = "earth";
            this.hillClimbGame.gameState = "vehicleSelect";
            mouse.clicked = false;
            return false;
        }

        if (this.moonButton.isClicked(mouse)) {
            this.hillClimbGame.selectedLevel = "moon";
            this.hillClimbGame.gameState = "vehicleSelect";
            mouse.clicked = false;
            return false;
        }

        mouse.clicked = false;
        return false;
    }

    draw(ctx) {
        if (this.hillClimbGame.gameState !== "levelSelect") {
            return;
        }

        this.backButton.draw(ctx);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 42px Arial";
        ctx.fillText("Choose Level", 400, 105);

        this.earthButton.draw(ctx);
        this.moonButton.draw(ctx);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "18px Arial";
        ctx.fillText("Normal gravity", 255, 330);
        ctx.fillText("Lower gravity", 545, 330);

        ctx.fillStyle = "#B3E5FC";
        ctx.font = "15px Arial";
        ctx.fillText("Classic hills and green ground", 255, 405);
        ctx.fillText("Moon hills, stars, craters", 545, 405);
    }
}


class VehicleSelectionScreen extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;

        this.backButton = new Button(10, 10, 80, 32, "Back");
        this.startRaceButton = new Button(300, 520, 200, 48, "Start Race");

        this.vehicleCards = [
            { x: 90, name: "Spike Rider", speed: "★★★☆☆", fuel: "★★☆☆☆" },
            { x: 310, name: "Speed Racer", speed: "★★★★★", fuel: "★★★★☆" },
            { x: 530, name: "Monster King", speed: "★★★☆☆", fuel: "★★★★★" },
        ];

        this.vehiclePreviews = [
            new VehiclePreview(this.hillClimbGame, 0, 180, 310, 0.82),
            new VehiclePreview(this.hillClimbGame, 1, 400, 310, 0.82),
            new VehiclePreview(this.hillClimbGame, 2, 620, 310, 0.82),
        ];
    }

    update(arrayOfSprites, keys, mouse) {
        if (this.hillClimbGame.gameState !== "vehicleSelect") {
            return false;
        }

        if (!mouse.clicked) {
            return false;
        }

        if (this.backButton.isClicked(mouse)) {
            this.hillClimbGame.gameState = "levelSelect";
            mouse.clicked = false;
            return false;
        }

        if (this.startRaceButton.isClicked(mouse)) {
            mouse.clicked = false;
            this.hillClimbGame.startNewRace();
            return false;
        }

        for (let vehicleIndex = 0; vehicleIndex < this.vehicleCards.length; vehicleIndex++) {
            let vehicleCard = this.vehicleCards[vehicleIndex];

            let cardClicked =
                mouse.x >= vehicleCard.x &&
                mouse.x <= vehicleCard.x + 180 &&
                mouse.y >= 190 &&
                mouse.y <= 485;

            if (cardClicked) {
                this.hillClimbGame.selectedVehicle = vehicleIndex;
                mouse.clicked = false;
                return false;
            }
        }

        mouse.clicked = false;
        return false;
    }

    draw(ctx) {
        if (this.hillClimbGame.gameState !== "vehicleSelect") {
            return;
        }

        this.backButton.draw(ctx);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 38px Arial";
        ctx.fillText("Choose Your Vehicle", 400, 90);

        for (let vehicleIndex = 0; vehicleIndex < this.vehicleCards.length; vehicleIndex++) {
            let vehicleCard = this.vehicleCards[vehicleIndex];
            let isSelected = this.hillClimbGame.selectedVehicle === vehicleIndex;

            ctx.fillStyle = isSelected ? "rgba(255,215,0,0.25)" : "rgba(0,0,0,0.5)";
            ctx.strokeStyle = isSelected ? "#FFD700" : "rgba(255,255,255,0.2)";
            ctx.lineWidth = isSelected ? 3 : 1.5;

            ctx.beginPath();
            ctx.roundRect(vehicleCard.x, 190, 180, 295, 10);
            ctx.fill();
            ctx.stroke();

            let vehicleBob = Math.sin(
                this.hillClimbGame.menuBackground.animationTimer * 2 + vehicleIndex * 1.2
            ) * 5;

            this.vehiclePreviews[vehicleIndex].setPosition(
                vehicleCard.x + 90,
                310 + vehicleBob
            );

            this.vehiclePreviews[vehicleIndex].draw(ctx);

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 15px Arial";
            ctx.textAlign = "center";
            ctx.fillText(vehicleCard.name, vehicleCard.x + 90, 365);

            ctx.fillStyle = "#aaa";
            ctx.font = "13px Arial";
            ctx.fillText("Speed: " + vehicleCard.speed, vehicleCard.x + 90, 395);
            ctx.fillText("Fuel: " + vehicleCard.fuel, vehicleCard.x + 90, 415);

            if (isSelected) {
                ctx.fillStyle = "#FFD700";
                ctx.font = "bold 14px Arial";
                ctx.fillText("SELECTED", vehicleCard.x + 90, 445);
            }
        }

        this.startRaceButton.draw(ctx);
    }
}


class HowToPlayScreen extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;
        this.backButton = new Button(10, 10, 80, 32, "Back");
        this.panel = new MessagePanel(120, 70, 560, 460);
    }

    update(arrayOfSprites, keys, mouse) {
        if (this.hillClimbGame.gameState !== "howTo") {
            return false;
        }

        if (!mouse.clicked) {
            return false;
        }

        if (this.backButton.isClicked(mouse)) {
            this.hillClimbGame.gameState = "menu";
            mouse.clicked = false;
            return false;
        }

        mouse.clicked = false;
        return false;
    }

    draw(ctx) {
        if (this.hillClimbGame.gameState !== "howTo") {
            return;
        }

        this.backButton.draw(ctx);
        this.panel.draw(ctx);

        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 34px Arial";
        ctx.fillText("How to Play", 400, 90);

        ctx.fillStyle = "#B3E5FC";
        ctx.font = "bold 18px Arial";
        ctx.fillText("Controls", 400, 145);

        ctx.fillStyle = "#fff";
        ctx.font = "16px Arial";
        ctx.fillText("Right Arrow / D = Gas", 400, 180);
        ctx.fillText("Left Arrow / A = Brake / Reverse", 400, 210);
        ctx.fillText("In air: gas rotates backward, brake rotates forward", 400, 240);

        ctx.fillStyle = "#B3E5FC";
        ctx.font = "bold 18px Arial";
        ctx.fillText("Objective", 400, 295);

        ctx.fillStyle = "#fff";
        ctx.font = "16px Arial";
        ctx.fillText("Drive across the hills and reach", 400, 330);
        ctx.fillText(this.hillClimbGame.winDistance + " meters to win.", 400, 360);
        ctx.fillText("Collect coins and fuel tanks.", 400, 405);
        ctx.fillText("You have 3 lives.", 400, 435);
        ctx.fillText("Flip in air or run out of fuel to lose a life.", 400, 465);
    }
}


class StoryScreen extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;
        this.backButton = new Button(10, 10, 80, 32, "Back");
        this.panel = new MessagePanel(120, 70, 560, 460);
    }

    update(arrayOfSprites, keys, mouse) {
        if (this.hillClimbGame.gameState !== "story") {
            return false;
        }

        if (!mouse.clicked) {
            return false;
        }

        if (this.backButton.isClicked(mouse)) {
            this.hillClimbGame.gameState = "menu";
            mouse.clicked = false;
            return false;
        }

        mouse.clicked = false;
        return false;
    }

    draw(ctx) {
        if (this.hillClimbGame.gameState !== "story") {
            return;
        }

        this.backButton.draw(ctx);
        this.panel.draw(ctx);

        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 34px Arial";
        ctx.fillText("Story", 400, 90);

        ctx.fillStyle = "#fff";
        ctx.font = "16px Arial";

        ctx.fillText("In the peaceful valley of Balamand,", 400, 160);
        ctx.fillText("a group of daring racers begins", 400, 190);
        ctx.fillText("the ultimate hill climbing challenge.", 400, 220);

        ctx.fillText("Ancient coins and fuel tanks are scattered", 400, 280);
        ctx.fillText("across the mountains.", 400, 310);

        ctx.fillStyle = "#B3E5FC";
        ctx.fillText("Choose your car, save your fuel,", 400, 380);
        ctx.fillText("and reach the finish line.", 400, 410);
    }
}


class KeysScreen extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;
        this.backButton = new Button(10, 10, 80, 32, "Back");
        this.panel = new MessagePanel(120, 70, 560, 430);
    }

    update(arrayOfSprites, keys, mouse) {
        if (this.hillClimbGame.gameState !== "keys") {
            return false;
        }

        if (!mouse.clicked) {
            return false;
        }

        if (this.backButton.isClicked(mouse)) {
            this.hillClimbGame.gameState = "menu";
            mouse.clicked = false;
            return false;
        }

        mouse.clicked = false;
        return false;
    }

    draw(ctx) {
        if (this.hillClimbGame.gameState !== "keys") {
            return;
        }

        this.backButton.draw(ctx);
        this.panel.draw(ctx);

        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 34px Arial";
        ctx.fillText("Key Bindings", 400, 90);

        ctx.fillStyle = "#fff";
        ctx.font = "18px Arial";

        ctx.fillText("Right Arrow / D  -  Gas / Air Rotate Backward", 400, 170);
        ctx.fillText("Left Arrow / A  -  Brake / Air Rotate Forward", 400, 230);
        ctx.fillText("Pause Button  -  Pause / Resume", 400, 290);
        ctx.fillText("Refresh Page  -  Restart everything", 400, 350);
    }
}


class Win extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;

        this.playAgainButton = new Button(250, 430, 120, 46, "Play Again");
        this.menuButton = new Button(430, 430, 120, 46, "Menu");
        this.panel = new MessagePanel(200, 260, 400, 145);
    }

    update(arrayOfSprites, keys, mouse) {
        if (this.hillClimbGame.gameState !== "win") {
            return false;
        }

        if (!mouse.clicked) {
            return false;
        }

        if (this.playAgainButton.isClicked(mouse)) {
            mouse.clicked = false;
            this.hillClimbGame.startNewRace();
            return false;
        }

        if (this.menuButton.isClicked(mouse)) {
            mouse.clicked = false;
            this.hillClimbGame.goToMenu();
            return false;
        }

        mouse.clicked = false;
        return false;
    }

    draw(ctx) {
        if (this.hillClimbGame.gameState !== "win") {
            return;
        }

        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, 800, 600);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.save();
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 30;
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 64px Arial";
        ctx.fillText("YOU WIN!", 400, 210);
        ctx.restore();

        this.panel.draw(ctx);

        ctx.fillStyle = "#fff";
        ctx.font = "19px Arial";
        ctx.fillText("Score: " + this.hillClimbGame.totalScore, 400, 295);
        ctx.fillText("Distance: " + this.hillClimbGame.winDistance + " m reached", 400, 325);
        ctx.fillText(
            "Coins: " + this.hillClimbGame.totalCoins + " | Lives left: " + this.hillClimbGame.lives,
            400,
            355
        );

        this.playAgainButton.draw(ctx);
        this.menuButton.draw(ctx);
    }
}


class Lose extends Sprite {
    constructor(hillClimbGame) {
        super();

        this.hillClimbGame = hillClimbGame;

        this.playAgainButton = new Button(250, 430, 120, 46, "Play Again");
        this.menuButton = new Button(430, 430, 120, 46, "Menu");
        this.panel = new MessagePanel(200, 260, 400, 145);
    }

    update(arrayOfSprites, keys, mouse) {
        if (this.hillClimbGame.gameState !== "lose") {
            return false;
        }

        if (!mouse.clicked) {
            return false;
        }

        if (this.playAgainButton.isClicked(mouse)) {
            mouse.clicked = false;
            this.hillClimbGame.startNewRace();
            return false;
        }

        if (this.menuButton.isClicked(mouse)) {
            mouse.clicked = false;
            this.hillClimbGame.goToMenu();
            return false;
        }

        mouse.clicked = false;
        return false;
    }

    draw(ctx) {
        if (this.hillClimbGame.gameState !== "lose") {
            return;
        }

        ctx.fillStyle = "rgba(0,0,0,0.68)";
        ctx.fillRect(0, 0, 800, 600);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "#F44336";
        ctx.font = "bold 60px Arial";
        ctx.fillText("GAME OVER", 400, 210);

        this.panel.draw(ctx);

        let distanceMeters = 0;

        if (this.hillClimbGame.playerVehicle) {
            distanceMeters = Math.floor(this.hillClimbGame.playerVehicle.distancePixels / 60);
        }

        ctx.fillStyle = "#fff";
        ctx.font = "19px Arial";
        ctx.fillText("You ran out of fuel or flipped.", 400, 290);
        ctx.fillText("Distance: " + distanceMeters + " m", 400, 320);
        ctx.fillText("Score: " + this.hillClimbGame.totalScore, 400, 348);
        ctx.fillText("Coins: " + this.hillClimbGame.totalCoins, 400, 376);

        this.playAgainButton.draw(ctx);
        this.menuButton.draw(ctx);
    }
}


class MenuLevel extends Level {
    constructor(game, hillClimbGame) {
        super(game);

        this.hillClimbGame = hillClimbGame;
    }

    initialize() {
        this.hillClimbGame.initializeMenuLevel();
    }
}


class RaceLevel extends Level {
    constructor(game, hillClimbGame) {
        super(game);

        this.hillClimbGame = hillClimbGame;
    }

    initialize() {
        this.hillClimbGame.initializeRaceLevel();
    }
}


class HillClimbGame {
    constructor() {
        this.game = new Game();
        this.game.pendingLevelIndex = null;

        this.gameState = "menu";
        this.winDistance = 5000;

        this.totalCoins = 0;
        this.totalScore = 0;
        this.lives = 3;

        this.selectedVehicle = 1;
        this.selectedLevel = "earth";
        this.currentGravity = 0.40;

        this.vehicleSpriteData = new VehicleSpriteData();

        this.camera = new Camera();
        this.terrain = new EarthTerrain(this.camera);
        this.playerVehicle = null;

        this.menuBackground = new MenuBackground(this);

        this.mainMenuScreen = new MainMenuScreen(this);
        this.levelSelectionScreen = new LevelSelectionScreen(this);
        this.vehicleSelectionScreen = new VehicleSelectionScreen(this);
        this.howToPlayScreen = new HowToPlayScreen(this);
        this.storyScreen = new StoryScreen(this);
        this.keysScreen = new KeysScreen(this);
        this.winScreen = new Win(this);
        this.loseScreen = new Lose(this);

        this.menuLevel = new MenuLevel(this.game, this);
        this.raceLevel = new RaceLevel(this.game, this);

        this.game.addLevel(this.menuLevel);
        this.game.addLevel(this.raceLevel);
    }

    addMenuSprites() {
        this.game.addSprite(this.menuBackground);
        this.game.addSprite(this.mainMenuScreen);
        this.game.addSprite(this.levelSelectionScreen);
        this.game.addSprite(this.vehicleSelectionScreen);
        this.game.addSprite(this.howToPlayScreen);
        this.game.addSprite(this.storyScreen);
        this.game.addSprite(this.keysScreen);
        this.game.addSprite(this.winScreen);
        this.game.addSprite(this.loseScreen);
    }

    start() {
        this.game.loop();
    }

    initializeMenuLevel() {
        this.gameState = "menu";
        this.addMenuSprites();
    }

    createSelectedTerrain() {
        switch (this.selectedLevel) {
            case "moon":
                this.currentGravity = 0.22;
                this.terrain = new MoonTerrain(this.camera);
                break;

            case "earth":
                this.currentGravity = 0.40;
                this.terrain = new EarthTerrain(this.camera);
                break;

            default:
                this.currentGravity = 0.40;
                this.terrain = new EarthTerrain(this.camera);
                break;
        }
    }

    startNewRace() {
        this.game.changeLevel(1);
    }

    goToMenu() {
        this.game.changeLevel(0);
    }

    initializeRaceLevel() {
        this.totalCoins = 0;
        this.totalScore = 0;
        this.lives = 3;

        this.camera = new Camera();
        this.createSelectedTerrain();

        this.playerVehicle = new PlayerVehicle(150, 200, this.selectedVehicle, this);

        this.game.addSprite(this.terrain);

        for (let coinWorldX = 500; coinWorldX < 40000; coinWorldX += 350) {
            this.game.addSprite(new CollectibleCoin(coinWorldX, this));
        }

        let fuelTankPositions = [
            100,
            300,
            700,
            1200,
            1900,
            2800,
            3900,
            5200,
            6800,
            8700,
            10900,
            13400,
            16200,
            19400,
            23000,
            27000,
            31500,
            36500,
        ];

        for (let i = 0; i < fuelTankPositions.length; i++) {
            this.game.addSprite(new FuelTank(fuelTankPositions[i], this));
        }

        this.game.addSprite(this.playerVehicle);
        this.game.addSprite(this.camera);
        this.game.addSprite(new FuelDisplay(this));
        this.game.addSprite(new Distance(this));
        this.game.addSprite(new CoinScore(this));
        this.game.addSprite(new Score(this));
        this.game.addSprite(new PauseButton(this));

        this.addMenuSprites();

        this.gameState = "playing";
    }
}


let hillClimbGame = new HillClimbGame();
hillClimbGame.start();