import React, { useState } from "react";

// Bilder-Import
import Image00 from "../images/Image_Main.png";
import Image01 from "../images/Image_1.png";
import Image02 from "../images/Image_2.png";
import Image03 from "../images/Image_3.png";
import Image04 from "../images/Image_4.png";
import Image05 from "../images/Image_5.png";
import Image06 from "../images/Image_6.png";
import Image07 from "../images/Image_7.png";
import Image08 from "../images/Image_8.png";
import Image09 from "../images/Image_9.png";
import Image10 from "../images/Image_10.png";
import Image11 from "../images/Image_11.png";
import Image12 from "../images/Image_12.png";
import Image13 from "../images/Image_13.png";
import Image14 from "../images/Image_14.png";
import Image15 from "../images/Image_15.png";
import Image16 from "../images/Image_16.png";
import Image17 from "../images/Image_17.png";
import Image18 from "../images/Image_18.png";

const Images = [
  Image00,
  Image01,
  Image02,
  Image03,
  Image04,
  Image05,
  Image06,
  Image07,
  Image08,
  Image09,
  Image10,
  Image11,
  Image12,
  Image13,
  Image14,
  Image15,
  Image16,
  Image17,
  Image18,
];

// Fisher-Yates Shuffle
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Neues Karten-Array erstellen, Rückgabe auch des zufälligen „richtigen“ Bildes
function createArray(): { array: string[]; correct: string } {
  const randomNumber = Math.floor(Math.random() * Images.length);
  const randomImage = Images[randomNumber];

  const randomArray = [
    randomImage, // dieses Bild ist das zu findende
    Image00,
    Image00,
    Image00,
    Image00,
    Image00,
    Image00,
    Image00,
    Image00,
  ];

  return { array: shuffleArray(randomArray), correct: randomImage };
}

export default function CreateZebra() {
  const [{ array: randomArray, correct }, setRandomArray] = useState<{
    array: string[];
    correct: string;
  }>(createArray());
  const [isPlaying, setIsPlaying] = useState(true);

  // Mobile Double-Tap
  const [lastTap, setLastTap] = useState<number>(0);
  const DOUBLE_TAP_DELAY = 300; // ms
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Mobile Double-Tap Handler
  const handleTap = (item: string) => {
    if (!isMobile) return;
    const now = Date.now();
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      if (item === correct) setIsPlaying(false); // nur das zufällige Bild gewinnt
    }
    setLastTap(now);
  };

  const handleNewGame = () => {
    const newData = createArray();
    setRandomArray(newData);
    setIsPlaying(true);
    setLastTap(0);
  };

  const Playfield = () => (
    <div className="playfield">
      {randomArray.map((item, index) => (
        <div className="cards" key={index}>
          <button
            className="cards-btn"
            onClick={() => handleTap(item)}
            onDoubleClick={() => !isMobile && item === correct && setIsPlaying(false)}
            type="button"
          >
            <img src={item} alt={`Zebra ${index}`} width="200" />
          </button>
        </div>
      ))}
    </div>
  );

  const YouWin = () => (
    <div className="win">
      <h2>Du hast gewonnen! 🎉</h2>
      <button onClick={handleNewGame} className="nochmalSpielen-btn">
        Noch mal spielen
      </button>
    </div>
  );

  return <>{isPlaying ? <Playfield /> : <YouWin />}</>;
}
