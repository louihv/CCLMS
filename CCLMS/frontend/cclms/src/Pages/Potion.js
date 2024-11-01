import React, { useState, useEffect } from 'react';
import styles from './Potion.module.css';

import Health from './Images/Potion_Images/Health.png';
import Invisibility from './Images/Potion_Images/Invisibility.png';
import FireResistance from './Images/Potion_Images/FireResistance.png';
import Love from './Images/Potion_Images/Love.png';
import Strength from './Images/Potion_Images/Strength.png';
import Wisdom from './Images/Potion_Images/Wisdom.png';
import Sleep from './Images/Potion_Images/Sleep.png';
import AntiPoison from './Images/Potion_Images/AntiPoison.png';
import Speed from './Images/Potion_Images/Speed.png';
import Clarity from './Images/Potion_Images/Clarity.png';


const potionRecipes = {
  HealingPotion: {
    ingredients: ['UnicornHair', 'MandrakeRoot', 'PhoenixFeather'],
    result: 'Healing Potion',
    description: 'A rejuvenating potion that restores health.',
    image: Health,  // Assign the corresponding image here
  },
  InvisibilityPotion: {
    ingredients: ['GhostPepper', 'BatWing', 'Moonstone'],
    result: 'Invisibility Potion',
    description: 'Grants temporary invisibility to the drinker.',
    image: Invisibility,
  },
  FireResistancePotion: {
    ingredients: ['DragonScale', 'FireFlower', 'LavaRock'],
    result: 'Fire Resistance Potion',
    description: 'Protects against fire damage for a short duration.',
    image: FireResistance,
  },
  LovePotion: {
    ingredients: ['RosePetals', 'Honeydew', 'HeartsBlood'],
    result: 'Love Potion',
    description: 'Inspires feelings of love and affection.',
    image: Love,
  },
  StrengthPotion: {
    ingredients: ['GiantStrengthHerb', 'TrollFat', 'FrostBiteRoot'],
    result: 'Strength Potion',
    description: 'Increases physical strength for a limited time.',
    image: Strength,
  },
  WisdomPotion: {
    ingredients: ['OwlFeather', 'Sage', 'CrystalDust'],
    result: 'Wisdom Potion',
    description: 'Enhances intelligence and wisdom when consumed.',
    image: Wisdom,
  },
  SleepPotion: {
    ingredients: ['DreamMist', 'LavenderSprigs', 'Moonflower'],
    result: 'Sleep Potion',
    description: 'Induces deep sleep and pleasant dreams.',
    image: Sleep,
  },
  AntiPoisonPotion: {
    ingredients: ['SnakeVenom', 'WitchHazel', 'Charcoal'],
    result: 'Anti-Poison Potion',
    description: 'Neutralizes toxins and poisons in the body.',
    image: AntiPoison,
  },
  SpeedPotion: {
    ingredients: ['SwiftGrass', 'LightningBerry', 'SprintRoot'],
    result: 'Speed Potion',
    description: 'Increases speed and agility temporarily.',
    image: Speed,
  },
  ClarityPotion: {
    ingredients: ['ClearSpringWater', 'SageLeaves', 'CrystalPowder'],
    result: 'Clarity Potion',
    description: 'Clears the mind, enhancing focus and concentration.',
    image: Clarity,
  },
};


const ingredientsInfo = {
  UnicornHair: 'A Powerful Rejuvenating Ingredient Used For Healing Potions.',
  MandrakeRoot: 'Effective for potions that influence the mind.',
  PhoenixFeather: 'Enhances the potency of any potion.',
  GhostPepper: 'Adds a spicy kick, essential for invisibility effects.',
  BatWing: 'Gives potions a dark, mysterious quality.',
  Moonstone: 'Amplifies magical properties, especially in night potions.',
  DragonScale: 'Used for fire-related potions; adds durability.',
  FireFlower: 'A rare flower that glows with fire energy, perfect for fire resistance.',
  LavaRock: 'Contains volcanic magic that enhances fire-related effects.',
  RosePetals: 'Symbolizes love, used in potions that stir the heart.',
  Honeydew: 'Sweet nectar that softens the heart and deepens emotions.',
  HeartsBlood: 'A mythical ingredient said to capture the essence of love.',
  GiantStrengthHerb: 'A powerful herb that gives strength to the drinker.',
  TrollFat: 'Adds a robust quality, known to enhance physical power.',
  FrostBiteRoot: 'Grows in cold environments, used in strength potions.',
  OwlFeather: 'Known for its wisdom, used in potions to increase intelligence.',
  Sage: 'A wise herb that enhances cognitive function and mental clarity.',
  CrystalDust: 'Magical dust that enhances the potency of any potion.',
  DreamMist: 'A mystical vapor that induces deep and peaceful sleep.',
  LavenderSprigs: 'Known for their calming properties, perfect for sleep potions.',
  Moonflower: 'Blooms only at night, adds enchantment to sleep potions.',
  SnakeVenom: 'A dangerous substance that, when processed, can neutralize toxins.',
  WitchHazel: 'A magical herb that heals wounds and cleanses toxins.',
  Charcoal: 'Absorbs poisons and toxins, making it vital in antidotes.',
  SwiftGrass: 'Enhances speed, ideal for speed-enhancing potions.',
  LghtningBerry: 'Fruits that crackle with electric energy for agility boosts.',
  SprintRoot: 'A root that invigorates and energizes the drinker.',
  ClearSpringWater: 'Pure water that amplifies the effects of clarity potions.',
  SageLeaves: 'Famous for clearing the mind and enhancing focus.',
  CrystalPowder: 'Fine powder that strengthens mental clarity in potions.',
};

const randomTips = [
  "Try mixing Mandrake Root with Phoenix Feather!",
  "Dragon Scale is rumored to boost fire-based potions.",
  "Every potion needs a core ingredient like Unicorn Hair.",
  "Adding Sage can improve mental clarity in any brew.",
  "A touch of Lava Rock makes fire potions more powerful.",
  "Use Moonstone for nighttime or invisibility potions.",
  "Honeydew is known to sweeten love potions.",
  "For a speed boost, combine Sprint Root with Lightning Berry.",
  "Crystal Dust can enhance the potency of nearly any potion.",
  "Use Witch Hazel to reduce the effects of any harmful potion.",
  "Swift Grass can increase the drinker's agility.",
  "Clear Spring Water helps amplify focus and clarity effects.",
  "Don't forget to balance strong ingredients like Snake Venom with milder ones.",
  "A pinch of Rose Petals brings out the best in love potions.",
  "Remember, the right combination of three ingredients is key!"
];



const Potion = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [result, setResult] = useState("");
  const [imageUrl, setImageUrl] = useState(null); // New state for image URL
  const [tip, setTip] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    setTip(randomTips[Math.floor(Math.random() * randomTips.length)]);
  }, [selectedIngredients]);

  const handleIngredientChange = (event) => {
    const { value, checked } = event.target;
    if (checked && selectedIngredients.length < 3) {
      setSelectedIngredients(prevIngredients => [...prevIngredients, value]);
    } else if (!checked) {
      setSelectedIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient !== value));
    }
  };

  const brewPotion = () => {
    const potion = Object.values(potionRecipes).find(({ ingredients }) =>
      ingredients.length === selectedIngredients.length &&
      ingredients.every(ing => selectedIngredients.includes(ing))
    );
  
    if (potion) {
      setResult(`${potion.result} - ${potion.description}`);
      setImageUrl(potion.image); // Set the image URL based on the result
    } else {
      setResult("Oops! The potion failed. Try a different combination of ingredients!");
      setImageUrl(null); // Clear the image if brewing fails
    }
  
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000);
  };
  

  const clearSelection = () => {
    setSelectedIngredients([]);
    setResult("");
    setImageUrl(null); // Clear the image when selection is cleared
  };

  return (
    <div className={styles.mainContainer1}>
      <div className={styles.mainContainer}>
        <h1>Potions Masterclass: Brew Your First Potion!</h1>
        <p>Welcome, young witch or wizard! Select ingredients carefully and try to brew a magical potion.</p>
        <div className={styles.tipBox}>💡 Tip: {tip}</div>

        <div className={styles.progress}>
          <div className={styles.progressBar} style={{ width: `${(selectedIngredients.length / 3) * 100}%` }} />
        </div>
        <h2>Ingredients</h2>
        <div className={styles.ingredients}>
          {Object.keys(ingredientsInfo).map((ingredient) => (
            <label key={ingredient} className={styles.ingredientLabel}>
              <input
                type="checkbox"
                value={ingredient}
                checked={selectedIngredients.includes(ingredient)}
                onChange={handleIngredientChange}
              />
              {ingredient.replace(/([A-Z])/g, ' $1')}
              <span className={styles.tooltip}>{ingredientsInfo[ingredient]}</span>
            </label>
          ))}
        </div>

        <button 
          onClick={brewPotion} 
          className={`${styles.brewButton} ${selectedIngredients.length === 0 ? styles.disabled : ''}`}
          disabled={selectedIngredients.length === 0}
        >
          Brew Potion
        </button>
        <button onClick={clearSelection} className={styles.clearButton}>
          Clear Selection
        </button>

        <div className={styles.result}>
          {result}
          {imageUrl && <img src={imageUrl} alt={result} className={styles.potionImage} />} {/* Display image */}
        </div>
      </div>
    </div>
  );
};

export default Potion;