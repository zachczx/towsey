import { Capacitor } from '@capacitor/core';
export async function play(count: number) {
	if (Capacitor.getPlatform() === 'android') {
		return;
	}

	let minuteAudio = '';

	if (count === 1) {
		minuteAudio = '/minute.mp3';
	} else {
		minuteAudio = '/minutes.mp3';
	}

	const audioFiles = [`/${count}.mp3`, minuteAudio, '/remaining.mp3'];

	const audioElements = audioFiles.map((file) => {
		const audio = new Audio(file);
		audio.preload = 'auto';

		return audio;
	});

	const playSequentially = async (audioElements: HTMLAudioElement[]) => {
		for (const audio of audioElements) {
			await new Promise((resolve) => {
				audio.addEventListener('ended', resolve, { once: true });
				audio.addEventListener('error', resolve, { once: true });
				audio.play();
			});
		}
	};

	await playSequentially(audioElements);
}
