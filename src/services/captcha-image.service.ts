import {BindingScope, injectable} from '@loopback/core';
import {createCanvas} from 'canvas';

export enum CaptchaDifficulty {
  EASY,
  MEDIUM,
  HARD,
}

export interface CaptchaImageService {
  createImage(text: string, difficulty?: CaptchaDifficulty): string;
}

@injectable({scope: BindingScope.SINGLETON})
export class CanvasCaptchaImageService implements CaptchaImageService {
  private randomTextColor(): string {
    const r = 4 + Math.floor(Math.random() * 5),
      g = 4 + Math.floor(Math.random() * 5),
      b = 4 + Math.floor(Math.random() * 5);

    return `#${r}${g}${b}`;
  }

  private warpImage(inputImageData: ImageData) {
    const {width, height, data} = inputImageData;

    const inputData = new Uint8ClampedArray(data);

    // height of the displacement, can't be too high as text will go outside the boundaries
    const waveH = 0.1 + Math.random() * 0.18;
    // Offest at which the sine function will start
    const waveS = Math.random() * Math.PI * 2;
    // The "wiggle" factor, this determines how many "waves" are present
    const wiggle = 2 + Math.random() * 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const displacement = Math.floor(
          height * waveH * Math.sin(waveS + wiggle * Math.PI * (x / width)),
        );

        const inCoord = ((y + displacement) * width + x) * 4;
        const outCoord = (y * width + x) * 4;

        data[outCoord] = inputData[inCoord];
        data[outCoord + 1] = inputData[inCoord + 1];
        data[outCoord + 2] = inputData[inCoord + 2];
        data[outCoord + 3] = inputData[inCoord + 3];
      }
    }
  }

  createImage(text: string, difficulty?: CaptchaDifficulty): string {
    const w = text.length * 25 + 20,
      h = 60;
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');

    if (difficulty === CaptchaDifficulty.EASY) {
      // White background
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, w, h);
    } else {
      // Noisy background
      const pixels = ctx.getImageData(0, 0, w, h);
      const data = pixels.data;
      for (let i = 0; i < data.length; i += 4) {
        // Not too dark as it would be too hard in some cases
        const r = 75 + Math.random() * 180;
        data[i] = data[i + 1] = data[i + 2] = r;
        data[i + 3] = 255;
      }
      ctx.putImageData(pixels, 0, 0);
    }

    // Set the font and style for the captcha text
    ctx.font = 'bold 30px sans-serif';
    ctx.fillStyle = this.randomTextColor();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Draw the text on the canvas
    ctx.fillText(text, w / 2, h / 2);

    if (difficulty === CaptchaDifficulty.HARD) {
      const imageData = ctx.getImageData(0, 0, w, h);
      this.warpImage(imageData);
      ctx.putImageData(imageData, 0, 0);
    }

    return canvas.toDataURL();
  }
}
