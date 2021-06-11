// import { Scene } from './scene';
import * as p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import { Graph } from './graph';
import poster from './poster.png';
// import 'p5/lib/addons/p5.dom';
const padNumber = (num: number, fill: number): string => {
  //改自：http://blog.csdn.net/aimingoo/article/details/4492592
  var len = ('' + num).length;
  return Array(fill > len ? fill - len + 1 || 0 : 0).join('0') + num;
};

const download = (content: ImageFile[]): void => {
  const josnData = JSON.stringify(content);
  var a = document.createElement('a');
  var file = new Blob([josnData], { type: 'text/plain' });
  a.href = URL.createObjectURL(file);
  a.download = 'data.json';
  a.click();
};
interface ImageFile {
  img: string;
  id: string;
}
let imgJson: ImageFile[] = [];
const sketch = (p: p5): void => {
  // const scene = new Scene();
  let pos: p5.Vector;
  // const mic = new p5.AudioIn();
  // const fft = new p5.FFT();
  let graph: Graph;
  let img: p5.Image;
  p.preload = (): void => {
    img = p.loadImage(poster);
    // img = p.fft()
  };

  p.setup = (): void => {
    p.createCanvas(1280, 1920);
    pos = p.createVector(p.width / 2, p.height / 2);
    graph = new Graph(p, pos);
    p.noiseDetail(10, 0.2);
    // p.noLoop();
    // mic.start();
    // fft.setInput(fft);
  };

  p.draw = (): void => {
    // const amp = p.constrain(mic.getLevel() * 10, 1, 10);
    p.background(255);
    graph.update();
    graph.draw();
    p.image(img, 0, 0, p.width, p.height);
    if (p.frameCount < 1000 && p.frameCount > 200) {
      const image = window.document.getElementById(
        'defaultCanvas0',
      ) as HTMLCanvasElement;
      const herf = image.toDataURL('image/png');
      const name = `output-${padNumber(p.frameCount, 5)}.png`;
      const imf: ImageFile = {
        img: herf,
        id: name,
      };
      imgJson.push(imf);
      if (imgJson.length >= 100) {
        download(imgJson);
        imgJson = [];
      }
    }
    if (p.frameCount === 1000) {
      download(imgJson);
      imgJson = [];
    }
  };
};

new p5(sketch);
