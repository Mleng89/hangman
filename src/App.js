import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Figure from './Components/Figure.js';
import WrongLetters from './Components/WrongLetters';
import Word from './Components/Word';
import Popup from './Components/Popup';
import Notifications from './Components/Notification';
import { showNotification as show } from './Helpers/Helpers';

const words = [ 'application', 'programming', 'interface', 'wizard' ];
let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

function App() {
	const [ playable, setPlayable ] = useState(true);
	const [ correctLetters, setCorrectLetters ] = useState([]);
	const [ wrongLetters, setWrongLetters ] = useState([]);
	const [ showNotification, setShowNotification ] = useState(false);
	useEffect(
		() => {
			const handleKeydown = (event) => {
				const { key, keyCode } = event;

				if (playable && keyCode >= 65 && keyCode <= 90) {
					const letter = key.toLowerCase();

					if (selectedWord.includes(letter)) {
						if (!correctLetters.includes(letter)) {
							setCorrectLetters((currentLetters) => [ ...currentLetters, letter ]);
						} else {
							show(setShowNotification);
						}
					} else {
						if (!wrongLetters.includes(letter)) {
							setWrongLetters((wrongLetters) => [ ...wrongLetters, letter ]);
						} else {
							show(setShowNotification);
						}
					}
				}
			};

			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		},
		[ correctLetters, wrongLetters, playable ]
	);
	function playAgain() {
		setPlayable(true);
		//empty arrays
		setCorrectLetters([]);
		setWrongLetters([]);

		const random = Math.floor(Math.random() * words.length);
		selectedWord = words[random];
	}
	return (
		<Fragment>
			<Header />
			<div className="game-container">
				<Figure wrongLetters={wrongLetters} />
				<WrongLetters wrongLetters={wrongLetters} />
				<Word selectedWord={selectedWord} correctLetters={correctLetters} />
			</div>
			<Popup
				correctLetters={correctLetters}
				wrongLetters={wrongLetters}
				selectedWord={selectedWord}
				setPlayable={setPlayable}
				playAgain={playAgain}
			/>
			<Notifications showNotification={showNotification} />
		</Fragment>
	);
}

export default App;
