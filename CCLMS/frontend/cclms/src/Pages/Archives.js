// src/components/Library.js
import React, { useState } from 'react';
import ItemCard from './ItemCard';
import styles from './Archives.module.css';
import expelliarmusSound from './Images/SFX/expelliarmus.mp3'; // Ensure the path is correct
import lumosSound from './Images/SFX/LumosMaxima.mp3'; // Ensure the path is correct
import alohomoraSound from './Images/SFX/Alohomora.mp3'; // Ensure the path is correct
import leviosoSound from './Images/SFX/WingardiumLeviosa.mp3'; // Ensure the path is correct
import avadaSound from './Images/SFX/AvadaKedavra.mp3'; // Ensure the path is correct





import polyjuice from './Images/Archives_Images/polyjuice.jpg';
import felix from './Images/Archives_Images/felixfelicis.jpg';
import amortentia from './Images/Archives_Images/amortentia.jpg';
import veritaserum from './Images/Archives_Images/veritaserum.jpg';
import skelegro from './Images/Archives_Images/skelegro.jpg';

import Expelliarmus from './Images/Archives_Images/expelliarmus.png';
import Lumos from './Images/Archives_Images/lumos.png';
import Alohomora from './Images/Archives_Images/alohomora.png';
import Levioso from './Images/Archives_Images/levioso.png';
import Avada from './Images/Archives_Images/avada.png';

import Hippogriff from './Images/Archives_Images/Hippogriff.png';
import Acromantula from './Images/Archives_Images/Acromantula.png';
import Phoenix from './Images/Archives_Images/Phoenix.png';
import Thestral from './Images/Archives_Images/Thestral.png';
import Unicorn from './Images/Archives_Images/Unicorn.png';

import Dumbledore from './Images/Archives_Images/Dumbledore.jpg';
import McGonagall from './Images/Archives_Images/McGonagall.jpg';
import Snape from './Images/Archives_Images/Snape.jpg';
import Remus from './Images/Archives_Images/Remus.jpg';
import Hagrid from './Images/Archives_Images/Hagrid.jpg';

const spellSounds = {
  'Expelliarmus': expelliarmusSound,
  'Lumos': lumosSound,
  'Alohomora': alohomoraSound,
  'Levioso': leviosoSound,
  'Avada Kedavra': avadaSound,
};


const categoriesData = {
  Potions: [
    { 
      name: 'Polyjuice Potion', 
      description: 'Allows the drinker to transform into another person for a limited time. Requires a sample of the person to be transformed into.', 
      functionality: 'Useful for disguise and infiltration.', 
      img: polyjuice 
    },
    { 
      name: 'Felix Felicis', 
      description: 'Grants the drinker extraordinary luck for a short duration, ensuring success in all endeavors during that time.', 
      functionality: 'Best for critical situations where success is essential.', 
      img: felix 
    },
    { 
      name: 'Amortentia', 
      description: 'The most powerful love potion in the wizarding world, causing an intense infatuation or obsession.', 
      functionality: 'Typically used to influence romantic feelings, but can have dangerous consequences.', 
      img: amortentia 
    },
    { 
      name: 'Veritaserum', 
      description: 'A powerful truth serum that forces the drinker to reveal the truth.', 
      functionality: 'Used in interrogations and investigations to uncover secrets.', 
      img: veritaserum 
    },
    { 
      name: 'Skele-Gro', 
      description: 'A potion that regrows bones that have been removed or damaged.', 
      functionality: 'Essential for healing after bone-related injuries or accidents.', 
      img: skelegro 
    },
  ],
  Spells: [
    { 
      name: 'Expelliarmus', 
      description: 'Disarms an opponent by forcing them to release whatever they are holding.', 
      uses: 'Commonly used in duels to disarm opponents without causing harm.', 
      img: Expelliarmus 
    },
    { 
      name: 'Lumos', 
      description: 'Produces a beam of light from the wand tip, illuminating dark areas.', 
      uses: 'Essential for navigating dark places or reading in low light.', 
      img: Lumos 
    },
    { 
      name: 'Alohomora', 
      description: 'Unlocks doors and other objects that are locked.',
      uses: 'Great for accessing locked places or retrieving items secured behind locks.',
      img: Alohomora 
    },
    { 
      name: 'Levioso', 
      description: 'A charm spell that allows the caster to levitate and manipulate objects in the air.', 
      uses: 'Useful for lifting heavy objects or moving them from one place to another.', 
      img: Levioso 
    },
    { 
      name: 'Avada Kedavra', 
      description: 'A curse that causes instant death to the victim; one of the three Unforgivable Curses.', 
      uses: 'Used by dark wizards; its use is punishable by life imprisonment in Azkaban.', 
      img: Avada 
    },
  ],
  Creatures: [
    { 
      name: 'Hippogriff', 
      description: 'A magical creature with the front half of an eagle and the hind half of a horse.', 
      functionality: 'Can be ridden and is known for its pride; requires respect from those who approach it.', 
      img: Hippogriff 
    },
    { 
      name: 'Phoenix', 
      description: 'A magical bird that can regenerate from its ashes after death, symbolizing immortality.', 
      functionality: 'Its tears have healing properties; often associated with hope and rebirth.', 
      img: Phoenix 
    },
    { 
      name: 'Unicorn', 
      description: 'A magical horse-like creature with a spiraled horn, known for its purity and grace.', 
      functionality: 'Their blood and hair have powerful magical properties and are highly sought after.', 
      img: Unicorn 
    },
    { 
      name: 'Thestral', 
      description: 'A skeletal, winged horse that is visible only to those who have witnessed death.', 
      functionality: 'Can be ridden; known for their intelligence and loyalty.', 
      img: Thestral 
    },
    { 
      name: 'Acromantula', 
      description: 'A giant spider with human-like intelligence, capable of human speech.', 
      functionality: 'Known for their aggressive nature and ability to weave strong webs; can be a source of magical ingredients.', 
      img: Acromantula 
    },
  ],
  Professors: [
    { 
      name: 'Albus Dumbledore', 
      description: 'The wise and powerful Headmaster of Hogwarts, known for his exceptional magical abilities and leadership.', 
      expertise: 'Mastery of nearly every magical subject, including Transfiguration and Defense Against the Dark Arts.', 
      teachingStyle: 'Encouraging and compassionate, often using real-world examples to teach valuable life lessons.', 
      img: Dumbledore 
    },
    { 
      name: 'Minerva McGonagall', 
      description: 'Professor of Transfiguration and Deputy Headmistress, known for her strict yet fair demeanor.', 
      expertise: 'Transfiguration and the magical properties of transformations.', 
      teachingStyle: 'Disciplined and structured, but deeply cares for her students\' success.', 
      img: McGonagall 
    },
    { 
      name: 'Severus Snape', 
      description: 'The enigmatic Potions Master with a complex past, known for his expertise in potion-making and dark arts.', 
      expertise: 'Potions and the Dark Arts; skilled in occlumency and legilimency.', 
      teachingStyle: 'Stern and demanding, often challenging students to think critically and deeply about their subjects.', 
      img: Snape 
    },
    { 
      name: 'Rubeus Hagrid', 
      description: 'The Keeper of Keys and Grounds at Hogwarts, as well as Care of Magical Creatures professor, known for his love of magical creatures.', 
      expertise: 'Care of Magical Creatures and Beast Management.', 
      teachingStyle: 'Warm and enthusiastic, often encouraging hands-on experience with creatures.', 
      img: Hagrid 
    },
    { 
      name: 'Remus Lupin', 
      description: 'The Defense Against the Dark Arts professor, known for his knowledge of dark creatures and his own werewolf condition.', 
      expertise: 'Defense Against the Dark Arts and magical creatures.', 
      teachingStyle: 'Approachable and empathetic, promoting understanding over fear.', 
      img: Remus 
    },
  ],
};


const Archives = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCardClick = (item) => setSelectedItem(item);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filterItems = (category) =>
    categoriesData[category].filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const renderCategorySections = () => (
    <div className={styles.itemsGrid}>
      {Object.keys(categoriesData).map((category) => (
        <div key={category} className={styles.categorySection}>
          <h2 
            className={styles.categoryTitle}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
          > 
          </h2>
          <div
            className={`${styles.itemGrid} ${selectedCategory === category ? styles.expanded : ''}`}
          >
            {filterItems(category).map((item, index) => (
              <ItemCard key={index} item={item} onCardClick={handleCardClick} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderFilteredCategory = () => (
    <div className={styles.categorySection}>
      <div className={styles.itemGrid}>
        {filterItems(selectedCategory).map((item, index) => (
          <ItemCard key={index} item={item} onCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );

 

  const renderModal = () => {
    const isSpell = selectedItem && selectedItem.hasOwnProperty('uses'); // Assuming spells have 'uses' property

    const playSpellSound = () => {
      const audio = new Audio(spellSounds[selectedItem.name]);
      audio.play();
    };

    return (
      <div className={`${styles.modalOverlay} ${styles.fadeIn}`} onClick={() => setSelectedItem(null)}>
        <div className={`${styles.modalContent} ${styles.modalAnimation}`} onClick={(e) => e.stopPropagation()}>
          <h3>{selectedItem.name}</h3>
          <img src={selectedItem.img} alt={selectedItem.name} className={styles.modalImage} width={"220px"} height={"250px"} />
          <p>{selectedItem.description}</p>
          {selectedItem.functionality && <p><strong>Uses:</strong> {selectedItem.functionality}</p>}
          {selectedItem.uses && <p><strong>Uses:</strong> {selectedItem.uses}</p>}
          {selectedItem.expertise && <p><strong>Expertise:</strong> {selectedItem.expertise}</p>}
          {selectedItem.teachingStyle && <p><strong>Teaching Style:</strong> {selectedItem.teachingStyle}</p>}
          
          {isSpell && (
            <>
              <button onClick={playSpellSound} className={styles.playSpellButton}>Cast Spell!</button>
            </>
          )}

          <button className={styles.closeModal} onClick={() => setSelectedItem(null)}>Close</button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Spellbounds Archives</h1>
        <nav className={styles.navbar}>
          <button className={`${styles.navButton} ${!selectedCategory ? styles.active : ''}`} onClick={() => setSelectedCategory(null)}>All</button>
          {Object.keys(categoriesData).map((category) => (
            <button
              key={category}
              className={`${styles.navButton} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              {category}
            </button>
          ))}
        </nav>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </header>
      <div className={styles.cardcontainer}>
      <main className={styles.mainContent}>
        {selectedCategory ? renderFilteredCategory() : renderCategorySections()}
        {selectedItem && renderModal()}
      </main>
      </div>
    </div>
  );
};

export default Archives;
